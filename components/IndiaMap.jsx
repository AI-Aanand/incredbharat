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

    // Helper: Normalize state names for consistent matching
    const normalizeName = (name) => {
        if (!name) return '';
        return name.toLowerCase()
            .replace(/&/g, 'and')
            .replace(/island(s)?/g, '')
            .replace(/[^a-z0-9]/g, '')
            .trim();
    };

    // Create a robust lookup map
    const stateLookup = states.reduce((acc, state) => {
        acc[normalizeName(state.name)] = state;
        // Add specific overrides if needed
        if (state.id === 'andaman-nicobar') acc['andamanandnicobar'] = state;
        if (state.id === 'dadra-nagar-haveli-daman-diu') acc['dadraandnagarhaveli'] = state; // Map often shortens this
        return acc;
    }, {});

    const activeStatesSet = new Set(Object.values(stateLookup).filter(s =>
        packages.some(pkg => pkg.stateId === s.id)
    ).map(s => s.id));

    const regionData = {};
    states.forEach(state => {
        const hasPackages = activeStatesSet.has(state.id);
        regionData[state.name] = {
            value: hasPackages ? 100 : 10,
            color: hasPackages ? '#FF7A18' : '#e2e8f0', // Lighter grey for inactive
        };
    });

    const handleStateClick = (stateName) => {
        if (!stateName) return;

        console.log('📍 Clicked State:', stateName);
        const normalized = normalizeName(stateName);
        const state = stateLookup[normalized];

        if (state) {
            console.log('✅ Navigating to:', state.name);
            router.push(`/states/${state.id}`);
        } else {
            console.warn('⚠️ State not found in data:', stateName);
        }
    };

    return (
        <section style={{ padding: '3rem 0', background: '#ffffff', minHeight: '600px' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        fontWeight: 700,
                        color: '#1a202c',
                        marginBottom: '0.5rem'
                    }}>
                        Explore by Map
                    </h2>
                    <p style={{ color: '#64748b' }}>
                        Click on any highlighted state to view {packages.length}+ official packages
                    </p>
                </div>

                <div
                    ref={mapContainerRef}
                    className="india-map-container"
                    onClick={(e) => {
                        // Global click handler for the map container
                        const target = e.target;

                        // Check if clicked on a path (State)
                        if (target.tagName === 'path') {
                            const name = target.getAttribute('name') || target.getAttribute('title');
                            handleStateClick(name);
                        }
                    }}
                >
                    <ReactDatamaps
                        regionData={regionData}
                        mapLayout={{
                            startColor: '#e2e8f0',
                            endColor: '#FF7A18',
                            hoverTitle: 'Count',
                            noDataColor: '#e2e8f0',
                            borderColor: '#ffffff',
                            hoverBorderColor: '#0F4C75',
                            hoverColor: '#ff9f55',
                        }}
                        hoverComponent={({ value }) => {
                            const normalized = normalizeName(value.name);
                            const state = stateLookup[normalized];
                            const hasPackages = state && activeStatesSet.has(state.id);

                            return (
                                <div
                                    className="map-tooltip"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent double firing
                                        handleStateClick(value.name);
                                    }}
                                >
                                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{value.name}</div>
                                    {hasPackages ? (
                                        <div style={{
                                            color: '#FF7A18',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        }}>
                                            <span>View Packages</span>
                                            <span style={{ fontSize: '1rem' }}>→</span>
                                        </div>
                                    ) : (
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Comparing...</div>
                                    )}
                                </div>
                            )
                        }}
                    />
                </div>

                <style jsx global>{`
                    .india-map-container {
                        position: relative;
                        width: 100%;
                        max-width: 800px;
                        margin: 0 auto;
                        /* Ensure SVG paths are clickable */
                        & path {
                            cursor: pointer;
                            transition: fill 0.2s;
                        }
                    }

                    /* Custom Tooltip Styling */
                    .map-tooltip {
                        padding: 0.75rem 1rem;
                        background: white;
                        border-radius: 0.5rem;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                        border: 1px solid #e2e8f0;
                        pointer-events: auto !important; /* Enable clicks on tooltip */
                        cursor: pointer;
                        min-width: 140px;
                        z-index: 50;
                    }
                `}</style>
            </div>
        </section>
    );
}
