'use client';

import Link from 'next/link';
import { Menu, X, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
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
                        {['Packages', 'About'].map((item) => (
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

                    {/* Mobile Menu Button - simplified for now */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ display: 'none' }} // Hidden on desktop
                        className="mobile-toggle"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Basic Mobile Responsive styles to be added in globals or styled-jsx */}
            <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
            background: none;
            border: none;
            cursor: pointer;
          }
        }
      `}</style>
        </nav>
    );
}
