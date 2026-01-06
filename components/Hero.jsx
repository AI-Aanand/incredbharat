'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export default function Hero() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/packages?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="hero-container" style={{
            position: 'relative',
            height: '80vh',
            minHeight: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            color: 'white',
            textAlign: 'center'
        }}>
            {/* Background Image with Cinematic Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                animation: 'zoomIn 20s ease infinite alternate'
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
                <div className="hero-overlay" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(15, 76, 117, 0.2), rgba(15, 76, 117, 0.6) 60%, rgba(15, 76, 117, 0.9))'
                }}></div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10, padding: '0 1.5rem', animation: 'fadeInUp 1s ease-out' }}>
                <h1 className="hero-title" style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    color: 'white',
                    textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.02em'
                }}>
                    Discover the Magic <br /> of <span className="text-gradient" style={{
                        backgroundImage: 'linear-gradient(135deg, #FF7A18 0%, #FFB347 100%)',
                        display: 'inline-block'
                    }}>Incredible India</span>
                </h1>
                <p className="hero-subtitle" style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    maxWidth: '650px',
                    margin: '0 auto 2.5rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    From the Himalayas in the north to the backwaters in the south, find your perfect government-approved getaway.
                </p>

                {/* Glass Search Bar */}
                <form onSubmit={handleSearch} style={{
                    display: 'flex',
                    maxWidth: '600px',
                    margin: '0 auto 2rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    padding: '0.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}>
                    <input
                        type="text"
                        placeholder="Where do you want to go?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '1.1rem',
                            padding: '0.75rem 1.5rem',
                            outline: 'none'
                        }}
                        className="hero-search-input"
                    />
                    <button type="submit" style={{
                        background: '#FF7A18',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}>
                        Search
                    </button>
                </form>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="/packages" className="btn btn-outline hover-lift" style={{
                        fontSize: '1rem',
                        padding: '0.8rem 2rem',
                        border: '1px solid rgba(255,255,255,0.5)',
                        color: 'white',
                        background: 'rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(4px)'
                    }}>
                        Browse All Packages
                    </a>
                </div>
            </div>

            <style jsx>{`
                .hero-search-input::placeholder {
                    color: rgba(255, 255, 255, 0.8);
                }
                @keyframes zoomIn {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .hero-container {
                        height: 60vh !important;
                        min-height: 500px !important;
                    }
                    /* Darker overlay on mobile for readability */
                    .hero-overlay {
                         background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%) !important;
                    }
                    .hero-title {
                        font-size: 2rem !important;
                        line-height: 1.2;
                    }
                    .hero-subtitle {
                        font-size: 1rem !important;
                        margin-bottom: 2rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .hero-container {
                        height: 50vh !important;
                        min-height: 480px !important; /* Increased min-height for content */
                    }
                    .hero-title {
                        font-size: 1.75rem !important;
                    }
                    .hero-subtitle {
                        font-size: 0.95rem !important;
                    }
                }
            `}</style>
        </div>
    );
}
