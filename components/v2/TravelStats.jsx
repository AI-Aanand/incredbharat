'use client';

import { useState, useEffect } from 'react';
import { Trophy, Map, Package, X } from 'lucide-react';
import { getRecentlyViewedStates, getRecentlyViewedPackages } from '@/lib/viewTracking';

export default function TravelStats({ isMobile = false, onCloseMobileMenu }) {
    const [isOpen, setIsOpen] = useState(false);
    const [stats, setStats] = useState({ stateCount: 0, packageCount: 0 });
    const [level, setLevel] = useState({ title: 'Novice explorer', color: '#6b7280' });

    useEffect(() => {
        if (isOpen) {
            const viewedStates = getRecentlyViewedStates();
            const viewedPackages = getRecentlyViewedPackages();

            const sCount = viewedStates.length;
            const pCount = viewedPackages.length;
            const total = sCount + pCount;

            setStats({ stateCount: sCount, packageCount: pCount });

            // Determine Level
            if (total === 0) setLevel({ title: 'Newcomer', color: '#9CA3AF' });
            else if (total < 5) setLevel({ title: 'Curious Traveler', color: '#1B9AAA' });
            else if (total < 10) setLevel({ title: 'Adventure Seeker', color: '#FF7A18' });
            else setLevel({ title: 'True Globetrotter', color: '#000080' });
        }
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
        if (onCloseMobileMenu) onCloseMobileMenu();
    };

    return (
        <>
            {isMobile ? (
                <button
                    onClick={handleOpen}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        padding: '0.75rem',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        fontSize: '1rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                    }}
                >
                    <span>My Travel Stats</span>
                    <Trophy size={18} color="#FF7A18" />
                </button>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="desktop-nav-link"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'white',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: '1px solid transparent',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    title="My Travel Stats"
                >
                    <Trophy size={20} />
                    <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Stats</span>
                </button>
            )}

            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }} onClick={() => setIsOpen(false)}>
                    <div style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        width: '100%',
                        maxWidth: '400px',
                        position: 'relative',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }} onClick={e => e.stopPropagation()}>

                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                background: '#EFF6FF',
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto'
                            }}>
                                <Trophy size={32} color={level.color} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                Traveller Status
                            </h2>
                            <p style={{ color: level.color, fontWeight: 600, fontSize: '1.125rem' }}>
                                {level.title}
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{
                                background: '#F9FAFB',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                textAlign: 'center'
                            }}>
                                <Map size={24} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{stats.stateCount}</div>
                                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>States Viewed</div>
                            </div>
                            <div style={{
                                background: '#F9FAFB',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                textAlign: 'center'
                            }}>
                                <Package size={24} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{stats.packageCount}</div>
                                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Packages Viewed</div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280' }}>
                            Keep exploring to unlock new traveler levels!
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
