'use client';

import Link from 'next/link';
import { Menu, X, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = ['Packages', 'About'];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
                        {/* Logo */}
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin className="h-8 w-8 text-[var(--primary)]" style={{ color: '#FF9933' }} />
                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#000080' }}>
                                Incred<span style={{ color: '#FF9933' }}>Bharat</span>
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            {menuItems.map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    style={{ fontWeight: '500', color: '#1f2937', transition: 'color 0.2s' }}
                                    onMouseOver={(e) => e.target.style.color = '#FF9933'}
                                    onMouseOut={(e) => e.target.style.color = '#1f2937'}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ display: 'none' }}
                            className="mobile-toggle"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="mobile-menu-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 40,
                        animation: 'fadeIn 0.3s ease'
                    }}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className="mobile-menu"
                style={{
                    position: 'fixed',
                    top: 0,
                    right: isOpen ? 0 : '-100%',
                    width: '75%',
                    maxWidth: '300px',
                    height: '100vh',
                    backgroundColor: 'white',
                    zIndex: 50,
                    padding: '2rem 1.5rem',
                    boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
                    transition: 'right 0.3s ease',
                    display: 'none'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        aria-label="Close menu"
                    >
                        <X size={28} color="#1f2937" />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            padding: '0.75rem 0',
                            borderBottom: '1px solid #e5e7eb'
                        }}
                    >
                        Home
                    </Link>
                    {menuItems.map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            style={{
                                fontSize: '1.125rem',
                                fontWeight: '600',
                                color: '#1f2937',
                                padding: '0.75rem 0',
                                borderBottom: '1px solid #e5e7eb'
                            }}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @media (max-width: 768px) {
                    .hidden-mobile {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block !important;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #1f2937;
                    }
                    .mobile-menu {
                        display: block !important;
                    }
                }

                @media (min-width: 769px) {
                    .mobile-menu-overlay,
                    .mobile-menu {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
}
