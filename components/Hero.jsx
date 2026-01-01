'use client';

import { MapPin } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export default function Hero() {

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
            {/* Background Image with Overlay */}
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
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
                }}></div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10, padding: '0 1.5rem' }}>
                <h1 className="hero-title" style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    color: 'white',
                    textShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}>
                    Discover the Magic <br /> of <span style={{ color: '#FF9933' }}>Incredible India</span>
                </h1>
                <p className="hero-subtitle" style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    color: '#e5e7eb',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    From the Himalayas in the north to the backwaters in the south, find your perfect getaway.
                </p>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .hero-container {
                        height: 60vh !important;
                        min-height: 500px !important;
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
                        min-height: 400px !important;
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
