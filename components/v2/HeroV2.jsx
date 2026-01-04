'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import ImageWithFallback from '../ImageWithFallback';

export default function HeroV2() {
    return (
        <div className="v2-hero-wrapper">
            {/* Background Image */}
            <div className="v2-hero-bg">
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=3570&auto=format&fit=crop"
                    alt="Incredible India"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <div className="v2-hero-overlay" />
            </div>

            <div className="v2-hero-container">
                {/* Left: Hero Copy */}
                <div className="v2-hero-copy">
                    <h1 className="v2-hero-title">
                        Discover the Magic<br />
                        of <span style={{ color: '#FF9933' }}>Incredible India</span>
                    </h1>
                    <p className="v2-hero-subtitle">
                        From the Himalayas in the north to the backwaters in the south, find your perfect getaway.
                    </p>
                </div>

                {/* Right: Search & CTA - Hidden on Mobile */}
                <div className="v2-hero-search-box v2-hide-on-mobile">
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: '#131921'
                    }}>
                        Start Your Journey
                    </h3>

                    {/* Search Input */}
                    <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            style={{
                                flex: 1,
                                padding: '0.875rem 1rem',
                                fontSize: '1rem',
                                border: '2px solid #e5e7eb',
                                borderRight: 'none',
                                borderRadius: '0.375rem 0 0 0.375rem',
                                outline: 'none'
                            }}
                        />
                        <button style={{
                            padding: '0 1.5rem',
                            backgroundColor: '#FF9933',
                            border: 'none',
                            borderRadius: '0 0.375rem 0.375rem 0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Search size={20} color="white" />
                        </button>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/packages"
                        className="v2-hero-cta-btn"
                    >
                        Browse All Packages
                    </Link>

                    <p style={{
                        marginTop: '1rem',
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        textAlign: 'center'
                    }}>
                        Explore 100+ official government packages
                    </p>
                </div>

                {/* Mobile CTA - Only shown on mobile */}
                <div className="v2-hero-mobile-cta v2-show-on-mobile">
                    <Link
                        href="/packages"
                        className="v2-hero-cta-btn-mobile"
                    >
                        Explore Packages →
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .v2-hero-wrapper {
                    position: relative;
                    min-height: 450px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    margin-top: 112px;
                }

                .v2-hero-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: -1;
                }

                .v2-hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%);
                }

                .v2-hero-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 2rem;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                    align-items: center;
                }

                .v2-hero-copy {
                    color: white;
                }

                .v2-hero-title {
                    font-size: clamp(1.75rem, 4vw, 3rem);
                    font-weight: 800;
                    margin-bottom: 1rem;
                    text-shadow: 0 4px 6px rgba(0,0,0,0.5);
                    line-height: 1.2;
                }

                .v2-hero-subtitle {
                    font-size: clamp(0.9rem, 1.5vw, 1.125rem);
                    color: #e5e7eb;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                    line-height: 1.5;
                }

                .v2-hero-search-box {
                    background-color: rgba(255,255,255,0.95);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                }

                .v2-hero-cta-btn {
                    display: block;
                    width: 100%;
                    padding: 0.875rem;
                    background-color: #131921;
                    color: white;
                    text-align: center;
                    border-radius: 0.375rem;
                    font-weight: 600;
                    font-size: 1rem;
                    text-decoration: none;
                }

                .v2-hero-cta-btn:hover {
                    background-color: #232F3E;
                }

                .v2-hero-mobile-cta {
                    margin-top: 1.5rem;
                }

                .v2-hero-cta-btn-mobile {
                    display: inline-block;
                    padding: 0.875rem 1.5rem;
                    background-color: #FF9933;
                    color: white;
                    border-radius: 0.375rem;
                    font-weight: 600;
                    font-size: 0.95rem;
                    text-decoration: none;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }

                .v2-hide-on-mobile {
                    display: block;
                }

                .v2-show-on-mobile {
                    display: none;
                }

                /* Tablet */
                @media (max-width: 1024px) {
                    .v2-hero-container {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }

                /* Mobile */
                @media (max-width: 768px) {
                    .v2-hero-wrapper {
                        margin-top: 104px;
                        min-height: 280px;
                    }

                    .v2-hero-container {
                        padding: 1.5rem 1rem;
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .v2-hero-overlay {
                        background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 100%);
                    }

                    .v2-hero-title {
                        font-size: 1.5rem;
                        margin-bottom: 0.75rem;
                    }

                    .v2-hero-subtitle {
                        font-size: 0.875rem;
                        line-height: 1.4;
                    }

                    .v2-hide-on-mobile {
                        display: none !important;
                    }

                    .v2-show-on-mobile {
                        display: block !important;
                    }
                }

                /* Small Mobile */
                @media (max-width: 480px) {
                    .v2-hero-wrapper {
                        min-height: 240px;
                    }

                    .v2-hero-container {
                        padding: 1.25rem 0.75rem;
                    }

                    .v2-hero-title {
                        font-size: 1.35rem;
                    }

                    .v2-hero-subtitle {
                        font-size: 0.8rem;
                    }

                    .v2-hero-cta-btn-mobile {
                        font-size: 0.875rem;
                        padding: 0.75rem 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
}
