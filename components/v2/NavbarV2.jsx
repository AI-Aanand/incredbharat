'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Heart, Scale, Menu, X, Package, MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFavoritesCount } from '../../lib/favorites';
import { getCompareCount } from '../../lib/compare';
import TravelStats from './TravelStats';

export default function NavbarV2() {
    const [isOpen, setIsOpen] = useState(false);
    const [favCount, setFavCount] = useState(0);
    const [compareCount, setCompareCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        const updateCounts = () => {
            setFavCount(getFavoritesCount());
            setCompareCount(getCompareCount());
        };

        updateCounts();
        window.addEventListener('favoritesChanged', updateCounts);
        window.addEventListener('compareChanged', updateCounts);

        return () => {
            window.removeEventListener('favoritesChanged', updateCounts);
            window.removeEventListener('compareChanged', updateCounts);
        };
    }, []);

    return (
        <>
            {/* Main Header */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: '#790101', // Deep Burgundy (User Experiment)
                color: 'white'
            }}>
                <div style={{
                    maxWidth: '1600px',
                    margin: '0 auto',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    {/* Logo */}
                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexShrink: 0,
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: '1px solid transparent',
                        transition: 'border-color 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>
                            Incred<span style={{ color: '#FF7A18' }}>Bharat</span>
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="search-bar-desktop" style={{
                        flex: 1,
                        maxWidth: '800px',
                        display: 'flex',
                        position: 'relative'
                    }}>
                        <input
                            type="text"
                            placeholder="Search states, destinations, packages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                width: '100%',
                                padding: '0.625rem 1rem',
                                fontSize: '0.95rem',
                                border: 'none',
                                borderRadius: '0.25rem 0 0 0.25rem',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{
                                padding: '0 1.5rem',
                                backgroundColor: '#FF7A18',
                                border: 'none',
                                borderRadius: '0 0.25rem 0.25rem 0',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e68a00'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7A18'}>
                            <Search size={20} color="white" />
                        </button>
                    </div>

                    {/* Right Menu */}
                    <div className="nav-links-desktop" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        flexShrink: 0
                    }}>
                        <Link href="/packages" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: 'white',
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid transparent',
                            transition: 'border-color 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                            <Package size={20} />
                            <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Packages</span>
                        </Link>

                        <Link href="/favorites" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: 'white',
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid transparent',
                            transition: 'border-color 0.2s',
                            position: 'relative'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                            <Heart size={20} />
                            {favCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: '#FF0000',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    padding: '0.125rem 0.375rem',
                                    borderRadius: '1rem',
                                    minWidth: '18px',
                                    textAlign: 'center'
                                }}>
                                    {favCount}
                                </span>
                            )}
                            <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Favorites</span>
                        </Link>

                        <Link href="/compare" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: 'white',
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid transparent',
                            transition: 'border-color 0.2s',
                            position: 'relative'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                            <Scale size={20} />
                            {compareCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: '#FF0000',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    padding: '0.125rem 0.375rem',
                                    borderRadius: '1rem',
                                    minWidth: '18px',
                                    textAlign: 'center'
                                }}>
                                    {compareCount}
                                </span>
                            )}
                            <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Compare</span>
                        </Link>

                        <TravelStats />

                        <div style={{ position: 'relative' }}>
                            <button style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: 'white',
                                padding: '0.5rem',
                                borderRadius: '0.25rem',
                                border: '1px solid transparent',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                                <MoreHorizontal size={20} />
                                <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>More</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mobile-menu-btn"
                        style={{
                            display: 'none',
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '0.5rem'
                        }}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Search Bar */}
                <div className="mobile-search-bar" style={{
                    display: 'none',
                    padding: '0.5rem 1rem 0.75rem',
                    width: '100%'
                }}>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                flex: 1,
                                padding: '0.625rem 1rem',
                                fontSize: '0.95rem',
                                border: 'none',
                                borderRadius: '0.25rem 0 0 0.25rem',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{
                                padding: '0 1.25rem',
                                backgroundColor: '#FF7A18',
                                border: 'none',
                                borderRadius: '0 0.25rem 0.25rem 0',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Search size={18} color="white" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            {isOpen && (
                <>
                    <div
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1999
                        }}
                    />
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '80%',
                        maxWidth: '320px',
                        height: '100vh',
                        backgroundColor: '#790101', // Deep Burgundy (Matched to Header)
                        zIndex: 2000,
                        padding: '1rem',
                        overflowY: 'auto'
                    }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1.5rem'
                                }}
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link href="/v2" onClick={() => setIsOpen(false)} style={{
                                color: 'white',
                                padding: '0.75rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            }}>Home</Link>
                            <Link href="/packages" onClick={() => setIsOpen(false)} style={{
                                color: 'white',
                                padding: '0.75rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            }}>Packages</Link>
                            <Link href="/favorites" onClick={() => setIsOpen(false)} style={{
                                color: 'white',
                                padding: '0.75rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                Favorites
                                {favCount > 0 && <span style={{ color: '#FF7A18' }}>({favCount})</span>}
                            </Link>
                            <Link href="/compare" onClick={() => setIsOpen(false)} style={{
                                color: 'white',
                                padding: '0.75rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                Compare
                                {compareCount > 0 && <span style={{ color: '#FF7A18' }}>({compareCount})</span>}
                            </Link>
                            <Link href="/faq" onClick={() => setIsOpen(false)} style={{
                                color: 'white',
                                padding: '0.75rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            }}>FAQ</Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} style={{
                                color: 'white',
                                padding: '0.75rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            }}>About</Link>
                            <Link href="/disclaimer" onClick={() => setIsOpen(false)} style={{
                                color: 'white',
                                padding: '0.75rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            }}>Disclaimer</Link>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                                <TravelStats isMobile={true} onCloseMobileMenu={() => setIsOpen(false)} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .search-bar-desktop,
                    .nav-links-desktop {
                        display: none !important;
                    }
                    .mobile-menu-btn,
                    .mobile-search-bar {
                        display: block !important;
                    }
                }
            `}</style>
        </>
    );
}
