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

            let stateName = null;

            //  Method 1: Try data-state-name attribute (we'll add this to paths)
            stateName = path.getAttribute('data-state-name');

            // Method 2: Try to get from the HoverInfo tooltip
            if (!stateName) {
                const hoverInfo = document.querySelector('.HoverInfo');
                if (hoverInfo) {
                    // Extract state name from the <strong> tag inside the tooltip
                    const strongElement = hoverInfo.querySelector('strong');
                    if (strongElement) {
                        stateName = strongElement.textContent.trim();
                    }
                }
            }

            // Method 3: Try to extract from aria-label or title attributes
            if (!stateName) {
                stateName = path.getAttribute('aria-label') || path.getAttribute('title');
            }

            // Method 4: Try to get from path's id or class
            if (!stateName) {
                const pathId = path.getAttribute('id') || path.getAttribute('class');
                if (pathId) {
                    // The library may store state names in path IDs
                    stateName = pathId.replace(/-/g, ' ').replace(/_/g, ' ');
                }
            }

            if (!stateName) {
                console.log('⚠️ Could not determine state name from click. Path:', path);
                // Log all available attributes for debugging
                console.log('Path attributes:', {
                    id: path.id,
                    className: path.className,
                    fill: path.style.fill,
                    'data-*': Array.from(path.attributes).filter(attr => attr.name.startsWith('data-'))
                });
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

        // Add cursor pointer style and data attributes to all paths (retry until paths are available)
        const styleTimer = setInterval(() => {
            const paths = container.querySelectorAll('svg path');
            if (paths.length > 0) {
                console.log('✨ Styling', paths.length, 'map paths with pointer cursor');
                paths.forEach((path, index) => {
                    path.style.cursor = 'pointer';

                    // Try to extract state name from the path and add as data attribute
                    // The react-datamaps-india library may store state info in the path's siblings or parent
                    const svgParent = path.closest('svg');
                    if (svgParent) {
                        // Look for title elements near this path that might contain the state name
                        const titleElements = svgParent.querySelectorAll('title');
                        if (titleElements[index]) {
                            const titleText = titleElements[index].textContent;
                            if (titleText && allStatesMap[titleText]) {
                                path.setAttribute('data-state-name', titleText);
                            }
                        }
                    }
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
