'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scale, X, Trash2, MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { packages, states } from '../../lib/data';
import ImageWithFallback from '../../components/ImageWithFallback';

export default function ComparePage() {
    const [compareIds, setCompareIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCompareList();
        window.addEventListener('compareChanged', loadCompareList);
        return () => window.removeEventListener('compareChanged', loadCompareList);
    }, []);

    const loadCompareList = () => {
        const stored = localStorage.getItem('incredbharat_compare');
        try {
            setCompareIds(stored ? JSON.parse(stored) : []);
        } catch {
            setCompareIds([]);
        }
        setLoading(false);
    };

    const removeFromCompare = (packageId) => {
        const newList = compareIds.filter(id => id !== packageId);
        localStorage.setItem('incredbharat_compare', JSON.stringify(newList));
        setCompareIds(newList);
        window.dispatchEvent(new CustomEvent('compareChanged'));
    };

    const clearAll = () => {
        localStorage.setItem('incredbharat_compare', JSON.stringify([]));
        setCompareIds([]);
        window.dispatchEvent(new CustomEvent('compareChanged'));
    };

    const comparePackages = packages.filter(pkg => compareIds.includes(pkg.id));

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem', textAlign: 'center' }}>
                <p>Loading comparison...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Scale size={40} color="#000080" />
                        Compare Packages
                    </h1>
                    {comparePackages.length > 0 && (
                        <button
                            onClick={clearAll}
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
                    {comparePackages.length > 0
                        ? `Comparing ${comparePackages.length} package${comparePackages.length !== 1 ? 's' : ''} (max 3)`
                        : 'Add packages to compare by clicking the compare icon on package cards'}
                </p>
            </div>

            {comparePackages.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: 'white',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa' }}>
                                <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: 700, color: '#000080', borderBottom: '2px solid #e5e7eb', width: '180px' }}>Feature</th>
                                {comparePackages.map(pkg => (
                                    <th key={pkg.id} style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #e5e7eb', minWidth: '280px', position: 'relative' }}>
                                        <button
                                            onClick={() => removeFromCompare(pkg.id)}
                                            style={{
                                                position: 'absolute',
                                                top: '0.5rem',
                                                right: '0.5rem',
                                                background: '#fee2e2',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '28px',
                                                height: '28px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#ef4444'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = '#fee2e2'}
                                            title="Remove from compare"
                                        >
                                            <X size={16} color="#ef4444" />
                                        </button>
                                        <div style={{ height: '160px', marginBottom: '0.75rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                            <ImageWithFallback
                                                src={pkg.images[0]}
                                                alt={pkg.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <Link href={`/packages/${pkg.id}`} style={{ textDecoration: 'none' }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem', lineHeight: 1.3 }}>{pkg.title}</h3>
                                        </Link>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* State/Destination */}
                            <tr>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                                    <MapPin size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                    Destination
                                </td>
                                {comparePackages.map(pkg => {
                                    const state = states.find(s => s.id === pkg.stateId);
                                    return (
                                        <td key={pkg.id} style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', color: '#000080', fontWeight: 600 }}>
                                            {state?.name || pkg.stateId}
                                        </td>
                                    );
                                })}
                            </tr>

                            {/* Duration */}
                            <tr style={{ background: '#f9fafb' }}>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                                    <Clock size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                    Duration
                                </td>
                                {comparePackages.map(pkg => (
                                    <td key={pkg.id} style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
                                        {pkg.duration}
                                    </td>
                                ))}
                            </tr>

                            {/* Price */}
                            <tr>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                                    💰 Price
                                </td>
                                {comparePackages.map(pkg => (
                                    <td key={pkg.id} style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', fontSize: '1.25rem', fontWeight: 700, color: '#138808' }}>
                                        ₹{pkg.price.toLocaleString('en-IN')}
                                    </td>
                                ))}
                            </tr>

                            {/* Rating */}
                            <tr style={{ background: '#f9fafb' }}>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                                    <Star size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                    Rating
                                </td>
                                {comparePackages.map(pkg => (
                                    <td key={pkg.id} style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#FFF5E6', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                                            <Star size={14} fill="#FF9933" stroke="#FF9933" />
                                            <strong>{pkg.rating}</strong>
                                            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>({pkg.reviews})</span>
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Organizer */}
                            <tr>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                                    🏛️ Organizer
                                </td>
                                {comparePackages.map(pkg => (
                                    <td key={pkg.id} style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
                                        <span style={{
                                            background: pkg.organizer?.includes('TDC') ? '#E8F5E9' : '#f3f4f6',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '0.5rem',
                                            fontWeight: 500
                                        }}>
                                            {pkg.organizer || 'Private'}
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Transport */}
                            <tr style={{ background: '#f9fafb' }}>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                                    🚗 Transport
                                </td>
                                {comparePackages.map(pkg => (
                                    <td key={pkg.id} style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', textTransform: 'capitalize' }}>
                                        {pkg.transportMode || 'Road'}
                                    </td>
                                ))}
                            </tr>

                            {/* Amenities */}
                            <tr>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb', verticalAlign: 'top' }}>
                                    ✨ Inclusions
                                </td>
                                {comparePackages.map(pkg => (
                                    <td key={pkg.id} style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                                        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.8 }}>
                                            {pkg.amenities?.slice(0, 5).map((amenity, i) => (
                                                <li key={i}>{amenity}</li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                            </tr>

                            {/* Description */}
                            <tr style={{ background: '#f9fafb' }}>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb', verticalAlign: 'top' }}>
                                    📝 Description
                                </td>
                                {comparePackages.map(pkg => (
                                    <td key={pkg.id} style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6 }}>
                                        {pkg.description?.substring(0, 150)}...
                                    </td>
                                ))}
                            </tr>

                            {/* Action Buttons */}
                            <tr>
                                <td style={{ padding: '1.5rem', fontWeight: 600, color: '#374151' }}>
                                    Action
                                </td>
                                {comparePackages.map(pkg => (
                                    <td key={pkg.id} style={{ padding: '1.5rem', textAlign: 'center' }}>
                                        <Link
                                            href={`/packages/${pkg.id}`}
                                            className="btn btn-primary"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            View Details <ArrowRight size={16} />
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '5rem 2rem',
                    background: 'linear-gradient(135deg, #EBF4FF 0%, #E8F5E9 100%)',
                    borderRadius: '1rem'
                }}>
                    <Scale size={64} color="#000080" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>
                        No packages to compare
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Add up to 3 packages to compare them side by side. Click the scale icon on any package card to add it to your comparison list.
                    </p>
                    <Link href="/packages" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                        Browse Packages
                    </Link>
                </div>
            )}
        </div>
    );
}
