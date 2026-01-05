'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { packages, states } from '../../lib/data';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import StateCardV2 from './StateCardV2';
import ImageWithFallback from '../ImageWithFallback';

export default function ContinueExploring() {
    const [recentStates, setRecentStates] = useState([]);
    const [recentPackages, setRecentPackages] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const history = localStorage.getItem('viewHistory');
        if (history) {
            try {
                const parsed = JSON.parse(history);

                // Process States
                const stateIds = [...new Set(
                    parsed
                        .filter(item => item.type === 'state')
                        .map(item => item.id)
                )].slice(0, 5); // Limit to 5

                const statesWithCounts = stateIds.map(id => {
                    const state = states.find(s => s.id === id);
                    if (!state) return null;
                    const count = packages.filter(p => p.stateId === id).length;
                    return { state, count };
                }).filter(Boolean);

                setRecentStates(statesWithCounts);

                // Process Packages
                const pkgIds = [...new Set(
                    parsed
                        .filter(item => item.type === 'package')
                        .map(item => item.id)
                )].slice(0, 5); // Limit to 5

                const foundPackages = pkgIds.map(id => {
                    return packages.find(p => p.id === id);
                }).filter(Boolean);

                setRecentPackages(foundPackages);

            } catch (e) {
                console.error('Error parsing view history:', e);
            }
        }
    }, []);

    if (!mounted) return null;
    if (recentStates.length === 0 && recentPackages.length === 0) return null;

    return (
        <section className="v2-section">
            <div className="v2-section-header">
                <h2 className="v2-section-title">Pick up where you left off</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                {/* Recent Packages */}
                {recentPackages.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Recently Viewed Packages</h3>
                            <Link href="/packages" className="v2-section-link">View All History</Link>
                        </div>

                        <div className="v2-scroll-container">
                            {recentPackages.map(pkg => {
                                const state = states.find(s => s.id === pkg.stateId);
                                return (
                                    <Link key={pkg.id} href={`/packages/${pkg.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="card" style={{
                                            minWidth: '280px',
                                            maxWidth: '280px',
                                            height: '100%',
                                            flexShrink: 0
                                        }}>
                                            <div style={{ height: '160px', position: 'relative' }}>
                                                <ImageWithFallback
                                                    src={pkg.images[0]}
                                                    alt={pkg.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '0.5rem',
                                                    right: '0.5rem',
                                                    background: 'white',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem'
                                                }}>
                                                    <Star size={12} fill="#FF7A18" stroke="#FF7A18" />
                                                    {pkg.rating}
                                                </div>
                                            </div>
                                            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 600 }}>
                                                    {state?.name}
                                                </div>
                                                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', lineHeight: 1.3, height: '2.6em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                    {pkg.title}
                                                </h4>
                                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                        <Clock size={14} /> {pkg.duration}
                                                    </div>
                                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--secondary)' }}>
                                                        ₹{pkg.price.toLocaleString('en-IN')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Recent States */}
                {recentStates.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Recently Viewed Destinations</h3>
                        </div>
                        <div className="v2-scroll-container">
                            {recentStates.map(({ state, count }) => (
                                <div key={state.id} style={{ minWidth: '260px', maxWidth: '260px', flexShrink: 0 }}>
                                    <StateCardV2 state={state} packageCount={count} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <style jsx>{`
                .v2-scroll-container {
                    display: flex;
                    gap: 1.5rem;
                    overflow-x: auto;
                    padding-bottom: 1rem;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE/Edge */
                    margin: 0 -1rem;
                    padding: 0 1rem 1rem 1rem;
                }
                
                .v2-scroll-container::-webkit-scrollbar {
                    display: none;
                }

                @media (min-width: 768px) {
                    .v2-scroll-container {
                        margin: 0;
                        padding: 0 0 1rem 0;
                         /* On desktop, we might want grid if there are many, but horizontal scroll is also fine for "Recent" style */
                    }
                }
            `}</style>
        </section>
    );
}
