'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag, MapPin, Clock, Star } from 'lucide-react';
import { getFavorites, removeFromFavorites, clearFavorites } from '../../lib/favorites';
import { packages, states } from '../../lib/data';
import ImageWithFallback from '../../components/ImageWithFallback';
import PackageTypeIndicator from '../../components/PackageTypeIndicator';

export default function FavoritesPage() {
    const [favoritePackages, setFavoritePackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = () => {
        const favoriteIds = getFavorites();
        const favPackages = packages.filter(pkg => favoriteIds.includes(pkg.id));
        setFavoritePackages(favPackages);
        setLoading(false);
    };

    const handleRemove = (packageId) => {
        removeFromFavorites(packageId);
        loadFavorites();
    };

    const handleClearAll = () => {
        if (confirm('Are you sure you want to remove all favorites?')) {
            clearFavorites();
            loadFavorites();
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem', textAlign: 'center' }}>
                <p>Loading favorites...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Heart size={40} fill="#FF0000" stroke="#FF0000" />
                        My Favorites
                    </h1>
                    {favoritePackages.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                background: 'none',
                                border: '2px solid #ef4444',
                                borderRadius: '0.5rem',
                                color: '#ef4444',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ef4444';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'none';
                                e.currentTarget.style.color = '#ef4444';
                            }}
                        >
                            <Trash2 size={18} />
                            Clear All
                        </button>
                    )}
                </div>
                <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
                    {favoritePackages.length > 0
                        ? `You have ${favoritePackages.length} saved package${favoritePackages.length !== 1 ? 's' : ''}`
                        : 'No saved packages yet. Start exploring and save your favorites!'}
                </p>
            </div>

            {favoritePackages.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {favoritePackages.map(pkg => {
                        const state = states.find(s => s.id === pkg.stateId);
                        return (
                            <div key={pkg.id} className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemove(pkg.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        zIndex: 10,
                                        background: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#fee2e2';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'white';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                    aria-label="Remove from favorites"
                                >
                                    <Heart size={20} fill="#FF0000" stroke="#FF0000" />
                                </button>

                                <div style={{ height: '200px', position: 'relative' }}>
                                    <ImageWithFallback
                                        src={pkg.images[0]}
                                        alt={pkg.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />

                                    {/* Package Type Indicators */}
                                    {(pkg.organizer || pkg.transportMode || pkg.isSubsidized) && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '0rem',
                                            left: '0rem',
                                            padding: '1rem',
                                            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
                                            borderRadius: '0 0 1rem 0'
                                        }}>
                                            <PackageTypeIndicator
                                                organizer={pkg.organizer}
                                                transportMode={pkg.transportMode}
                                                isSubsidized={pkg.isSubsidized}
                                            />
                                        </div>
                                    )}

                                    {/* Rating Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        left: '1rem',
                                        background: 'white',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        <Star size={14} fill="#FF9933" stroke="#FF9933" />
                                        {pkg.rating}
                                    </div>
                                </div>

                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#6b7280',
                                        fontSize: '0.875rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <MapPin size={16} />
                                        {state?.name}
                                    </div>

                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem', fontWeight: 700, lineHeight: 1.3 }}>
                                        <Link href={`/packages/${pkg.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {pkg.title}
                                        </Link>
                                    </h3>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#6b7280',
                                        marginBottom: '1rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        <Clock size={16} />
                                        {pkg.duration}
                                    </div>

                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>From</span>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#000080' }}>
                                                ₹{pkg.price.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                        <Link href={`/packages/${pkg.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '5rem 2rem',
                    background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE5CC 100%)',
                    borderRadius: '1rem'
                }}>
                    <ShoppingBag size={64} color="#FF9933" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>
                        No favorites yet
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Start exploring amazing tour packages and save your favorites for later. Click the heart icon on any package to add it here!
                    </p>
                    <Link href="/packages" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                        Browse Packages
                    </Link>
                </div>
            )}
        </div>
    );
}
