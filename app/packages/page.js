'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { packages, states } from '../../lib/data';
import PackageTypeIndicator from '../../components/PackageTypeIndicator';
import ImageWithFallback from '../../components/ImageWithFallback';
import FavoriteButton from '../../components/FavoriteButton';
import { Star, Clock, MapPin, SlidersHorizontal, X } from 'lucide-react';

export default function PackagesPage() {
    const [filters, setFilters] = useState({
        organizer: 'all',
        transportMode: 'all',
        isSubsidized: false,
        priceRange: 'all',
        minRating: 0,
        searchQuery: ''
    });
    const [showFilters, setShowFilters] = useState(true);

    // Get unique organizers and transport modes
    const uniqueOrganizers = useMemo(() => {
        const organizers = [...new Set(packages.map(p => p.organizer).filter(Boolean))];
        return organizers.sort();
    }, []);

    const uniqueTransportModes = useMemo(() => {
        const modes = [...new Set(packages.map(p => p.transportMode).filter(Boolean))];
        return modes.sort();
    }, []);

    // Filter packages
    const filteredPackages = useMemo(() => {
        return packages.filter(pkg => {
            // Organizer filter
            if (filters.organizer !== 'all' && pkg.organizer !== filters.organizer) return false;

            // Transport mode filter
            if (filters.transportMode !== 'all' && pkg.transportMode !== filters.transportMode) return false;

            // Subsidized filter
            if (filters.isSubsidized && !pkg.isSubsidized) return false;

            // Price range filter
            if (filters.priceRange !== 'all') {
                const price = pkg.price;
                switch (filters.priceRange) {
                    case 'budget':
                        if (price > 10000) return false;
                        break;
                    case 'mid':
                        if (price < 10000 || price > 50000) return false;
                        break;
                    case 'luxury':
                        if (price < 50000) return false;
                        break;
                }
            }

            // Rating filter
            if (pkg.rating < filters.minRating) return false;

            // Search query
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                const state = states.find(s => s.id === pkg.stateId);
                const searchable = `${pkg.title} ${pkg.description} ${state?.name} ${pkg.organizer}`.toLowerCase();
                if (!searchable.includes(query)) return false;
            }

            return true;
        });
    }, [filters]);

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                    All Tour Packages
                </h1>
                <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '800px' }}>
                    Explore {packages.length} curated tour packages from state tourism boards, IRCTC, and private operators across India.
                    Filter by organizer, transport mode, and discover government-subsidized schemes.
                </p>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Search packages by destination, title, or organizer..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '1rem 1.5rem',
                        fontSize: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#FF9933'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                {/* Filter Sidebar */}
                <div style={{
                    width: showFilters ? '280px' : '0',
                    flexShrink: 0,
                    transition: 'width 0.3s',
                    overflow: 'hidden'
                }}>
                    <div className="card" style={{ position: 'sticky', top: '100px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <SlidersHorizontal size={20} />
                                Filters
                            </h3>
                            <button
                                onClick={() => setFilters({
                                    organizer: 'all',
                                    transportMode: 'all',
                                    isSubsidized: false,
                                    priceRange: 'all',
                                    minRating: 0,
                                    searchQuery: ''
                                })}
                                style={{
                                    fontSize: '0.875rem',
                                    color: '#FF9933',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Reset
                            </button>
                        </div>

                        {/* Organizer Filter */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.875rem', color: '#374151' }}>
                                Organizer
                            </label>
                            <select
                                value={filters.organizer}
                                onChange={(e) => setFilters({ ...filters, organizer: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <option value="all">All Organizers</option>
                                {uniqueOrganizers.map(org => (
                                    <option key={org} value={org}>{org}</option>
                                ))}
                            </select>
                        </div>

                        {/* Transport Mode Filter */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.875rem', color: '#374151' }}>
                                Transport Mode
                            </label>
                            <select
                                value={filters.transportMode}
                                onChange={(e) => setFilters({ ...filters, transportMode: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <option value="all">All Modes</option>
                                {uniqueTransportModes.map(mode => (
                                    <option key={mode} value={mode}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subsidized Toggle */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={filters.isSubsidized}
                                    onChange={(e) => setFilters({ ...filters, isSubsidized: e.target.checked })}
                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                />
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
                                    ⭐ Government Subsidized Only
                                </span>
                            </label>
                        </div>

                        {/* Price Range Filter */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.875rem', color: '#374151' }}>
                                Price Range
                            </label>
                            <select
                                value={filters.priceRange}
                                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <option value="all">All Prices</option>
                                <option value="budget">Budget (Under ₹10,000)</option>
                                <option value="mid">Mid-Range (₹10,000 - ₹50,000)</option>
                                <option value="luxury">Luxury (Above ₹50,000)</option>
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.875rem', color: '#374151' }}>
                                Minimum Rating
                            </label>
                            <select
                                value={filters.minRating}
                                onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <option value="0">Any Rating</option>
                                <option value="3.5">3.5+ ⭐</option>
                                <option value="4.0">4.0+ ⭐</option>
                                <option value="4.5">4.5+ ⭐</option>
                                <option value="4.8">4.8+ ⭐</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Packages Grid */}
                <div style={{ flex: 1 }}>
                    {/* Results Count & Filter Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <p style={{ fontSize: '1rem', color: '#6b7280' }}>
                            Showing <strong>{filteredPackages.length}</strong> of {packages.length} packages
                        </p>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-outline"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            {showFilters ? <X size={18} /> : <SlidersHorizontal size={18} />}
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Packages Grid */}
                    {filteredPackages.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '2rem'
                        }}>
                            {filteredPackages.map(pkg => {
                                const state = states.find(s => s.id === pkg.stateId);
                                return (
                                    <div key={pkg.id} className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ height: '200px', position: 'relative' }}>
                                            <ImageWithFallback
                                                src={pkg.images[0]}
                                                alt={pkg.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />

                                            {/* Package Type Indicators - Top Left with overlay for better readability */}
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

                                            {/* Favorite Button - Top Right */}
                                            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10 }}>
                                                <FavoriteButton packageId={pkg.id} size={20} />
                                            </div>

                                            {/* Rating Badge - Below Favorite Button */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '3.5rem',
                                                right: '1rem',
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
                                                <Link href={`/packages/${pkg.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                                    Details
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
                            padding: '5rem',
                            background: '#f9fafb',
                            borderRadius: '1rem'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>
                                No packages found
                            </h3>
                            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                                Try adjusting your filters or search criteria
                            </p>
                            <button
                                onClick={() => setFilters({
                                    organizer: 'all',
                                    transportMode: 'all',
                                    isSubsidized: false,
                                    priceRange: 'all',
                                    minRating: 0,
                                    searchQuery: ''
                                })}
                                className="btn btn-primary"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
