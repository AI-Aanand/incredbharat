'use client';

import { useState } from 'react';
import StateCardV2 from './StateCardV2';
import { states, packages } from '../../lib/data';
import { ChevronRight } from 'lucide-react';

export default function ExploreByRegion() {
    const [expandedRegion, setExpandedRegion] = useState(null);

    // Regional groupings
    const regions = {
        north: {
            name: 'North India',
            states: ['himachal-pradesh', 'jammu-kashmir', 'ladakh', 'punjab', 'haryana', 'uttarakhand', 'chandigarh', 'delhi']
        },
        south: {
            name: 'South India',
            states: ['kerala', 'tamil-nadu', 'karnataka', 'andhra-pradesh', 'telangana', 'puducherry']
        },
        east: {
            name: 'East India',
            states: ['west-bengal', 'odisha', 'bihar', 'jharkhand']
        },
        west: {
            name: 'West India',
            states: ['rajasthan', 'gujarat', 'maharashtra', 'goa', 'dadra-nagar-haveli-daman-diu']
        },
        northeast: {
            name: 'North-East India',
            states: ['assam', 'meghalaya', 'sikkim', 'arunachal-pradesh', 'nagaland', 'mizoram', 'tripura', 'manipur']
        },
        islands: {
            name: 'Islands & Union Territories',
            states: ['andaman-nicobar', 'lakshadweep']
        }
    };

    const getRegionStates = (regionId) => {
        return regions[regionId].states
            .map(stateId => {
                const state = states.find(s => s.id === stateId);
                const count = packages.filter(p => p.stateId === stateId).length;
                return { state, count };
            })
            .filter(item => item.state);
    };

    return (
        <section style={{
            maxWidth: '1600px',
            margin: '3rem auto',
            padding: '0 2rem'
        }}>
            <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#131921',
                marginBottom: '1rem'
            }}>
                Explore by Region
            </h2>
            <p style={{
                color: '#6b7280',
                marginBottom: '2rem',
                fontSize: '0.95rem'
            }}>
                Discover destinations grouped by geographical regions
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {Object.entries(regions).map(([regionId, region]) => {
                    const regionStates = getRegionStates(regionId);
                    const displayStates = regionStates.slice(0, 4);
                    const hasMore = regionStates.length > 4;

                    return (
                        <div key={regionId} style={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.5rem',
                            padding: '1.25rem',
                            transition: 'box-shadow 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                            <h3 style={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                color: '#131921',
                                marginBottom: '0.375rem'
                            }}>
                                {region.name}
                            </h3>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                marginBottom: '1rem'
                            }}>
                                {regionStates.length} state{regionStates.length !== 1 ? 's' : ''}
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '0.75rem',
                                marginBottom: '1rem'
                            }}>
                                {displayStates.map(({ state, count }) => (
                                    <a
                                        key={state.id}
                                        href={`/states/${state.id}`}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '0.75rem',
                                            backgroundColor: '#f9fafb',
                                            borderRadius: '0.375rem',
                                            textDecoration: 'none',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                    >
                                        <span style={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: '#131921',
                                            marginBottom: '0.25rem'
                                        }}>
                                            {state.name}
                                        </span>
                                        {count > 0 && (
                                            <span style={{
                                                fontSize: '0.75rem',
                                                color: '#007185'
                                            }}>
                                                {count} package{count !== 1 ? 's' : ''}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>

                            {hasMore && (
                                <button
                                    onClick={() => setExpandedRegion(expandedRegion === regionId ? null : regionId)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.375rem',
                                        padding: '0.625rem',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.375rem',
                                        color: '#007185',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        e.currentTarget.style.borderColor = '#007185';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                    }}
                                >
                                    View all {regionStates.length} states
                                    <ChevronRight size={14} />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
