'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { states, packages } from '../lib/data';
import ImageWithFallback from './ImageWithFallback';

export default function StateCardsGrid() {
    const router = useRouter();

    // Get all states and count packages for each
    const statesWithPackageCount = states.map(state => ({
        ...state,
        packageCount: packages.filter(pkg => pkg.stateId === state.id).length
    }));

    const handleCardClick = (stateId) => {
        router.push(`/states/${stateId}`);
    };

    return (
        <section className="state-cards-section" style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                        Explore by State
                    </h2>
                    <p className="section-subtitle" style={{ color: '#6b7280', fontSize: '1rem' }}>
                        Discover curated government tourism packages across India
                    </p>
                </div>

                <div className="state-cards-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Widened to 280px to force single column on mobile
                    gap: '1.25rem',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {statesWithPackageCount.map(state => (
                        <div
                            key={state.id}
                            onClick={() => handleCardClick(state.id)}
                            className="hover-lift"
                            style={{
                                position: 'relative',
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-sm)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                height: '200px', // COMPACT HEIGHT (Reduced from 280px)
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)'; // Reduced lift
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            {/* Background Image with Smart Fallback */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 0
                            }}>
                                <ImageWithFallback
                                    src={state.image}
                                    alt={state.name}
                                    fallbackType="icon" // KEY CHANGE: Use Icon for missing images
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                            </div>

                            {/* Gradient Overlay Gradient - Stronger at bottom for text readability */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)',
                                zIndex: 1
                            }} />

                            {/* Package Count Badge - Compact Top Right */}
                            {state.packageCount > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '0.75rem',
                                    right: '0.75rem',
                                    background: 'rgba(255, 122, 24, 0.9)', // Orange Brand color
                                    color: 'white',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '1rem',
                                    fontWeight: 700,
                                    fontSize: '0.7rem',
                                    zIndex: 2,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    backdropFilter: 'blur(4px)'
                                }}>
                                    {state.packageCount} Tours
                                </div>
                            )}

                            {/* Content - Compact Bottom Layout */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '1rem',
                                color: 'white',
                                zIndex: 2
                            }}>
                                <h3 style={{
                                    fontSize: '1.1rem', // Slightly smaller
                                    fontWeight: 700,
                                    marginBottom: '0.2rem',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    lineHeight: 1.2
                                }}>
                                    {state.name}
                                </h3>

                                {/* Truncated Description or Tagline */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: 'rgba(255,255,255,0.9)',
                                        maxWidth: '70%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {state.description || 'Explore Official Packages'}
                                    </p>

                                    <span style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: '#FF7A18', // Brand Orange
                                        background: 'white',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                                    }}>
                                        →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .state-cards-section {
                        padding: 3rem 0 !important;
                    }
                    .state-cards-grid {
                        grid-template-columns: repeat(2, 1fr) !important; // 2 cols on mobile
                        gap: 0.75rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .state-cards-grid {
                        grid-template-columns: 1fr !important; // 1 col on small mobile
                    }
                }
            `}</style>
        </section>
    );
}
