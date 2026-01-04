'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import ImageWithFallback from '../ImageWithFallback';

export default function HeroV2() {
    return (
        <div style={{
            position: 'relative',
            height: '55vh',
            minHeight: '400px',
            maxHeight: '600px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            marginTop: '120px' // Account for fixed header + category strip
        }}>
            {/* Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
            }}>
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=3570&auto=format&fit=crop"
                    alt="Incredible India"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%)'
                }} />
            </div>

            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '0 2rem',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '3rem',
                alignItems: 'center'
            }}>
                {/* Left: Hero Copy */}
                <div>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        color: 'white',
                        textShadow: '0 4px 6px rgba(0,0,0,0.5)',
                        lineHeight: 1.2
                    }}>
                        Discover the Magic<br />
                        of <span style={{ color: '#FF9933' }}>Incredible India</span>
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                        color: '#e5e7eb',
                        marginBottom: '2rem',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        lineHeight: 1.6
                    }}>
                        From the Himalayas in the north to the backwaters in the south, find your perfect getaway.
                    </p>
                </div>

                {/* Right: Search & CTA */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: '#131921'
                    }}>
                        Start Your Journey
                    </h3>

                    {/* Search Input */}
                    <div style={{
                        display: 'flex',
                        marginBottom: '1.5rem'
                    }}>
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
                        href="/v2/packages"
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: '#131921',
                            color: 'white',
                            textAlign: 'center',
                            borderRadius: '0.375rem',
                            fontWeight: 600,
                            fontSize: '1rem',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#232F3E'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#131921'}
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
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    div[style*="gridTemplateColumns"] {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }

                @media (max-width: 768px) {
                    div[style*="marginTop: 120px"] {
                        height: 50vh !important;
                        min-height: 350px !important;
                    }
                }
            `}</style>
        </div>
    );
}
