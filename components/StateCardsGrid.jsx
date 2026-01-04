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
        <section className="state-cards-section" style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>
                        Explore by State
                    </h2>
                    <p className="section-subtitle" style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                        Choose your destination and discover amazing travel packages
                    </p>
                </div>

                <div className="state-cards-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {statesWithPackageCount.map(state => (
                        <div
                            key={state.id}
                            onClick={() => handleCardClick(state.id)}
                            style={{
                                position: 'relative',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: '2px solid transparent',
                                height: '280px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = '#FF7A18';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            {/* Background Image */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                overflow: 'hidden'
                            }}>
                                <ImageWithFallback
                                    src={state.image}
                                    alt={state.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)'
                            }} />

                            {/* Package Count Badge */}
                            {state.packageCount > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '0.75rem',
                                    right: '0.75rem',
                                    background: 'rgba(255, 153, 51, 0.95)',
                                    color: 'white',
                                    padding: '0.4rem 0.85rem',
                                    borderRadius: '2rem',
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    {state.packageCount} {state.packageCount === 1 ? 'Package' : 'Packages'}
                                </div>
                            )}

                            {/* Content */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '1.25rem',
                                color: 'white',
                                zIndex: 1
                            }}>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 700,
                                    marginBottom: '0.35rem',
                                    textShadow: '0 3px 6px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)',
                                    color: 'white'
                                }}>
                                    {state.name}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: '#ffffff',
                                    marginBottom: '0.75rem',
                                    fontStyle: 'italic',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.9)'
                                }}>
                                    {state.description}
                                </p>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#FF7A18',
                                    background: 'rgba(255,255,255,0.95)',
                                    padding: '0.4rem 0.85rem',
                                    borderRadius: '0.5rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                                }}>
                                    Explore Packages
                                    <span style={{ fontSize: '1rem' }}>→</span>
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
                    .section-title {
                        font-size: 2rem !important;
                    }
                    .section-subtitle {
                        font-size: 1rem !important;
                    }
                    .state-cards-grid {
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
                        gap: 1.25rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .state-cards-section {
                        padding: 2.5rem 0 !important;
                    }
                    .section-title {
                        font-size: 1.75rem !important;
                    }
                    .section-subtitle {
                        font-size: 0.95rem !important;
                    }
                    .state-cards-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
            `}</style>
        </section>
    );
}
