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
        // Normalize checking
        const hasPackages = activeStatesSet.has(state.name);

        regionData[state.name] = {
            value: hasPackages ? 100 : 10,
            // If it has packages, use the brand Orange. If not, use a visible but softer gray/blue.
            color: hasPackages ? '#FF7A18' : '#cbd5e1',
            stateId: state.id
        };
    });

    const currentHoveredState = useRef(null);

    // Update map click handler to use the tracked hover state
    useEffect(() => {
        if (!mapContainerRef.current) return;

        const handleContainerClick = () => {
            const stateName = currentHoveredState.current;

            if (!stateName) {
                console.log('⚠️ No state currently hovered');
                return;
            }

            console.log('🗺️ MAP CLICKED! State:', stateName);

            // Look up the state in our data (using a loose name match)
            const normalize = (str) => str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
            const normalizedTarget = normalize(stateName);

            const activeState = states.find(s => normalize(s.name) === normalizedTarget);

            if (activeState) {
                console.log('✅ NAVIGATING TO:', `/states/${activeState.id}`);
                router.push(`/states/${activeState.id}`);
            } else {
                console.log('ℹ️ State clicked but not in our data:', stateName);
            }
        };

        const container = mapContainerRef.current;
        container.addEventListener('click', handleContainerClick);
        console.log('📍 Event delegation listener attached to map container');

        // Cleanup
        return () => {
            container.removeEventListener('click', handleContainerClick);
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
                        height: '600px',
                        cursor: 'pointer' // Make the whole container clickable-looking
                    }}
                >
                    {/* Styles to ensure pointer events work */}
                    <style jsx>{`
                        :global(svg path) {
                             cursor: pointer !important;
                             pointer-events: all !important;
                        }
                    `}</style>

                    <ReactDatamaps
                        regionData={regionData}
                        mapLayout={{
                            startColor: '#94a3b8', // Slate-400 (Default for non-active)
                            endColor: '#FF7A18',   // Orange (Active)
                            hoverTitle: 'Count',
                            noDataColor: '#94a3b8', // Fallback color
                            borderColor: '#ffffff',
                            hoverBorderColor: '#0F4C75',
                            hoverColor: '#FF9F55', // Lighter orange on hover
                        }}
                        hoverComponent={({ value }) => {
                            // Update ref whenever hover component renders (which implies hover)
                            currentHoveredState.current = value.name;

                            // We can't clear the ref easily on unmount of this specific component 
                            // because it unmounts and remounts rapidly.
                            // But click handler only fires when *clicking*, so it should be fine.

                            const activeState = allStatesMap[value.name];
                            const hasPackages = activeStatesSet.has(value.name);

                            return (
                                <div
                                    style={{
                                        padding: '0.75rem',
                                        background: 'white',
                                        border: `2px solid ${hasPackages ? '#FF7A18' : '#94a3b8'}`,
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                                        pointerEvents: 'none',
                                        zIndex: 100,
                                        minWidth: '150px'
                                    }}
                                >
                                    <strong style={{ fontSize: '1rem', color: '#1f2937', display: 'block' }}>{value.name}</strong>
                                    {hasPackages ? (
                                        <span style={{ color: '#FF7A18', fontSize: '0.875rem', fontWeight: 600 }}>
                                            ✨ View Packages
                                        </span>
                                    ) : (
                                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                            Explore State
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
