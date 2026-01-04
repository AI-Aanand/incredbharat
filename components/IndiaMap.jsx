'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { states, packages } from '../lib/data';

// Dynamically import the map component
const ReactDatamaps = dynamic(() => import('react-datamaps-india'), { ssr: false });

export default function IndiaMap() {
    const router = useRouter();
    const mapContainerRef = useRef(null);

    // Create a map of all state names for O(1) lookup
    const allStatesMap = states.reduce((acc, state) => {
        acc[state.name] = state;
        return acc;
    }, {});

    const statesWithPackages = states.filter(state =>
        packages.some(pkg => pkg.stateId === state.id)
    );

    const activeStatesSet = new Set(statesWithPackages.map(s => s.name));
    const regionData = {};

    states.forEach(state => {
        if (activeStatesSet.has(state.name)) {
            regionData[state.name] = {
                value: 100,
                color: '#FF7A18',
                stateId: state.id
            };
        } else {
            regionData[state.name] = {
                value: 10,
                color: '#e5e7eb'
            };
        }
    });

    // Use EVENT DELEGATION to handle clicks on map states
    // This is a workaround since react-datamaps-india doesn't support onClick prop
    // Event delegation is more robust because it survives library re-renders of the SVG
    useEffect(() => {
        if (!mapContainerRef.current) return;

        const handleContainerClick = (event) => {
            // Find the path element - could be the target itself or need to traverse up
            let path = null;

            // Check if direct target is a path
            if (event.target.tagName === 'path' || event.target.nodeName === 'path') {
                path = event.target;
            }
            // Try using closest if available
            else if (event.target.closest) {
                path = event.target.closest('path');
            }

            if (!path) {
                return; // Not a path click, ignore
            }

            // react-datamaps-india doesn't include title tags in paths
            // Instead, we need to find the state name from the hover tooltip
            // The library creates a tooltip with class 'HoverInfo'
            const hoverInfo = document.querySelector('.HoverInfo');
            let stateName = null;

            if (hoverInfo && hoverInfo.textContent) {
                // Extract state name from the <strong> tag inside the tooltip
                // This avoids pollution from "👆 Click to explore" and injected CSS
                const strongElement = hoverInfo.querySelector('strong');
                stateName = strongElement ? strongElement.textContent.trim() : null;

                // Fallback: try first child if strong tag not found
                if (!stateName) {
                    stateName = hoverInfo.firstChild?.textContent?.trim();
                }
            }

            // Fallback: Try to match the path's fill color to our regionData
            if (!stateName) {
                const pathFill = path.style.fill || path.getAttribute('fill');
                // Try to find which state has this path by matching colors
                for (const [name, data] of Object.entries(regionData)) {
                    if (data.color && pathFill && pathFill.includes(data.color.substring(1))) {
                        stateName = name;
                        break;
                    }
                }
            }

            if (!stateName) {
                console.log('⚠️ Could not determine state name from click');
                return;
            }

            console.log('🗺️ MAP CLICKED! State:', stateName);

            // Look up the state in our data
            const activeState = allStatesMap[stateName];
            if (activeState) {
                console.log('✅ NAVIGATING TO:', `/states/${activeState.id}`);
                router.push(`/states/${activeState.id}`);
            } else {
                console.log('ℹ️ State clicked but not in our data:', stateName);
            }
        };

        // Attach single listener to container (event delegation)
        const container = mapContainerRef.current;
        container.addEventListener('click', handleContainerClick);
        console.log('📍 Event delegation listener attached to map container');

        // Add cursor pointer style to all paths (retry until paths are available)
        const styleTimer = setInterval(() => {
            const paths = container.querySelectorAll('svg path');
            if (paths.length > 0) {
                console.log('✨ Styling', paths.length, 'map paths with pointer cursor');
                paths.forEach(path => {
                    path.style.cursor = 'pointer';
                });
                clearInterval(styleTimer);
            }
        }, 100); // Check every 100ms until paths are available

        // Cleanup
        return () => {
            container.removeEventListener('click', handleContainerClick);
            clearInterval(styleTimer);
        };
    }, []); // Run once on mount

    return (
        <section style={{ padding: '5rem 0', background: '#ffffff' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Explore by Map</h2>
                    <p style={{ color: '#6b7280' }}>Click on any highlighted state to explore tour packages.</p>
                </div>

                <div
                    ref={mapContainerRef}
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '800px',
                        margin: '0 auto',
                        height: '600px'
                    }}
                >
                    <style jsx>{`
                        /* Force pointer-events on SVG paths for Chrome */
                        svg path {
                            pointer-events: all !important;
                            cursor: pointer !important;
                        }
                        /* Disable pointer-events on any overlays */
                        svg > :not(path):not(g) {
                            pointer-events: none !important;
                        }
                    `}</style>

                    <ReactDatamaps
                        regionData={regionData}
                        mapLayout={{
                            startColor: '#e5e7eb',
                            endColor: '#FF7A18',
                            hoverTitle: 'Count',
                            noDataColor: '#e5e7eb',
                            borderColor: '#ffffff',
                            hoverBorderColor: '#000080',
                            hoverColor: '#138808',
                        }}
                        hoverComponent={({ value }) => {
                            const activeState = allStatesMap[value.name];
                            const isClickable = !!activeState;

                            return (
                                <div
                                    style={{
                                        padding: '0.75rem',
                                        background: 'white',
                                        border: '2px solid #FF7A18',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                                        pointerEvents: 'none',
                                        zIndex: 100,
                                        userSelect: 'none'
                                    }}
                                >
                                    <strong style={{ fontSize: '1rem', color: '#1f2937' }}>{value.name}</strong>
                                    {isClickable && (
                                        <span style={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            color: '#FF7A18',
                                            fontWeight: 600,
                                            marginTop: '0.5rem'
                                        }}>
                                            👆 Click to explore
                                        </span>
                                    )}
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
