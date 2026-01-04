'use client';

import Link from 'next/link';
import { Menu, X, MapPin, Heart, Scale } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFavoritesCount } from '../lib/favorites';
import { getCompareCount } from '../lib/compare';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [favCount, setFavCount] = useState(0);
    const [compareCount, setCompareCount] = useState(0);

    useEffect(() => {
        // Update favorites count on mount and when localStorage changes
        const updateFavCount = () => setFavCount(getFavoritesCount());
        const updateCompareCount = () => setCompareCount(getCompareCount());

        updateFavCount();
        updateCompareCount();

        // Listen for storage events (when favorites change in other tabs/components)
        window.addEventListener('storage', updateFavCount);
        window.addEventListener('favoritesChanged', updateFavCount);
        window.addEventListener('compareChanged', updateCompareCount);

        return () => {
            window.removeEventListener('storage', updateFavCount);
            window.removeEventListener('favoritesChanged', updateFavCount);
            window.removeEventListener('compareChanged', updateCompareCount);
        };
    }, []);

    const menuItems = [
        { name: 'Packages', href: '/packages' },
        { name: 'Favorites', href: '/favorites', icon: Heart, badge: favCount },
        { name: 'Compare', href: '/compare', icon: Scale, badge: compareCount },
        { name: 'FAQ', href: '/faq' },
        { name: 'About', href: '/about' },
        { name: 'Disclaimer', href: '/disclaimer' }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
                        {/* Logo */}
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin className="h-8 w-8 text-[var(--primary)]" style={{ color: '#FF7A18' }} />
                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#000080' }}>
                                Incred<span style={{ color: '#FF7A18' }}>Bharat</span>
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        style={{
                                            fontWeight: '500',
                                            color: '#1f2937',
                                            transition: 'color 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            position: 'relative'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'}
                                        onMouseOut={(e) => e.currentTarget.style.color = '#1f2937'}
                                    >
                                        {Icon && <Icon size={18} />}
                                        {item.name}
                                        {item.badge > 0 && (
                                            <span style={{
                                                background: '#FF0000',
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                padding: '0.125rem 0.5rem',
                                                borderRadius: '1rem',
                                                minWidth: '20px',
                                                textAlign: 'center'
                                            }}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
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
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    padding: '0.75rem 0',
                                    borderBottom: '1px solid #e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    position: 'relative'
                                }}
                            >
                                {Icon && <Icon size={20} />}
                                {item.name}
                                {item.badge > 0 && (
                                    <span style={{
                                        background: '#FF0000',
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '1rem',
                                        minWidth: '20px',
                                        textAlign: 'center',
                                        marginLeft: 'auto'
                                    }}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
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
