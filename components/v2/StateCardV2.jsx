'use client';

import Link from 'next/link';
import ImageWithFallback from '../ImageWithFallback';
import { MapPin, ArrowRight } from 'lucide-react';

export default function StateCardV2({ state, packageCount, compact = false }) {
    return (
        <Link href={`/states/${state.id}`} className="v2-state-card-link">
            <div className="v2-state-card">
                {/* Image */}
                <div className="v2-card-image">
                    <ImageWithFallback
                        src={state.image}
                        alt={state.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <div className="v2-card-gradient" />
                </div>

                {/* Content */}
                <div className="v2-card-content">
                    <h3 className="v2-card-title">{state.name}</h3>
                    <p className="v2-card-tagline">{state.description}</p>

                    {packageCount > 0 && (
                        <div className="v2-card-meta">
                            <MapPin size={14} />
                            <span>{packageCount} Package{packageCount !== 1 ? 's' : ''}</span>
                        </div>
                    )}

                    <div className="v2-card-cta">
                        <span>Explore</span>
                        <ArrowRight size={14} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .v2-state-card-link {
                    text-decoration: none;
                    display: block;
                }

                .v2-state-card {
                    background-color: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    transition: all 0.2s;
                    cursor: pointer;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .v2-state-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
                    border-color: #FF7A18;
                }

                .v2-card-image {
                    height: 160px;
                    position: relative;
                    overflow: hidden;
                }

                .v2-card-gradient {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 50%;
                    background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
                }

                .v2-card-content {
                    padding: 0.875rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .v2-card-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #2E2E2E;
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                }

                .v2-card-tagline {
                    font-size: 0.8rem;
                    color: #6b7280;
                    margin-bottom: 0.5rem;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .v2-card-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #007185;
                    font-size: 0.75rem;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }

                .v2-card-cta {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #FF7A18;
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin-top: auto;
                }

                /* Mobile - Horizontal card layout */
                @media (max-width: 768px) {
                    .v2-state-card {
                        flex-direction: row;
                        height: 100px;
                    }

                    .v2-card-image {
                        width: 100px;
                        height: 100%;
                        flex-shrink: 0;
                    }

                    .v2-card-content {
                        padding: 0.75rem;
                        justify-content: center;
                    }

                    .v2-card-title {
                        font-size: 0.95rem;
                        margin-bottom: 0.125rem;
                    }

                    .v2-card-tagline {
                        font-size: 0.75rem;
                        margin-bottom: 0.25rem;
                        -webkit-line-clamp: 1;
                    }

                    .v2-card-meta {
                        font-size: 0.7rem;
                        margin-bottom: 0.25rem;
                    }

                    .v2-card-cta {
                        font-size: 0.75rem;
                    }
                }

                /* Small Mobile */
                @media (max-width: 480px) {
                    .v2-state-card {
                        height: 90px;
                    }

                    .v2-card-image {
                        width: 90px;
                    }

                    .v2-card-content {
                        padding: 0.625rem;
                    }

                    .v2-card-title {
                        font-size: 0.875rem;
                    }
                }
            `}</style>
        </Link>
    );
}
