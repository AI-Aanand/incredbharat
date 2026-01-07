'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Import hook
import { packages, states } from '../../lib/data';
import PackageTypeIndicator from '../../components/PackageTypeIndicator';
import ImageWithFallback from '../../components/ImageWithFallback';
import FavoriteButton from '../../components/FavoriteButton';
import CompareButton from '../../components/CompareButton';
import { Star, Clock, MapPin, SlidersHorizontal, X, ExternalLink, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateUSPs } from '../../lib/uspGenerator';
import { generateThemes } from '../../lib/themeGenerator';

function PackagesContent() {
    const searchParams = useSearchParams(); // Use hook
    const [filters, setFilters] = useState({
        state: 'all',
        category: [],
        organizer: 'all',
        transportMode: 'all',
        isSubsidized: false,
        priceRange: 'all',
        minRating: 0,
        durationMin: 0,
        durationMax: 15,
        searchQuery: ''
    });

    // Update filters when URL params change
    useEffect(() => {
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        setFilters(prev => ({
            ...prev,
            category: category ? [category] : [],
            searchQuery: search || ''
        }));
    }, [searchParams]);

    // Initial state false to prevent mobile flash, set to true on desktop mount
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // Open sidebar by default on large screens
        if (window.innerWidth >= 1024) {
            setShowFilters(true);
        }
    }, []);

    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Get unique states
    const uniqueStates = useMemo(() => {
        const stateIds = [...new Set(packages.map(p => p.stateId).filter(Boolean))];
        return states
            .filter(s => stateIds.includes(s.id))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    // Get organizers filtered by selected state (cascading)
    const availableOrganizers = useMemo(() => {
        let pkgs = packages;
        if (filters.state !== 'all') {
            pkgs = packages.filter(p => p.stateId === filters.state);
        }
        const organizers = [...new Set(pkgs.map(p => p.organizer).filter(Boolean))];
        return organizers.sort();
    }, [filters.state]);

    // Search suggestions logic
    useEffect(() => {
        if (!filters.searchQuery || filters.searchQuery.length < 2) {
            setSearchSuggestions([]);
            return;
        }

        const query = filters.searchQuery.toLowerCase();
        const matches = [];

        // Match States
        states.forEach(state => {
            if (state.name.toLowerCase().includes(query)) {
                matches.push({ type: 'Location', text: state.name, value: state.id, field: 'state' });
            }
        });

        // Match Packages
        packages.forEach(pkg => {
            if (pkg.title.toLowerCase().includes(query)) {
                matches.push({ type: 'Package', text: pkg.title, value: pkg.title, field: 'searchQuery' });
            }
        });

        // Match Organizers
        const organizers = [...new Set(packages.map(p => p.organizer).filter(Boolean))];
        organizers.forEach(org => {
            if (org.toLowerCase().includes(query)) {
                matches.push({ type: 'Organizer', text: org, value: org, field: 'organizer' });
            }
        });

        setSearchSuggestions(matches.slice(0, 5)); // Limit to 5 suggestions
        setShowSuggestions(true);
    }, [filters.searchQuery]);


    const uniqueTransportModes = useMemo(() => {
        const modes = [...new Set(packages.map(p => p.transportMode).filter(Boolean))];
        return modes.sort();
    }, []);

    // Filter packages
    const filteredPackages = useMemo(() => {
        return packages.filter(pkg => {
            // Search Query Filter
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                const matchesSearch =
                    pkg.title.toLowerCase().includes(query) ||
                    pkg.description.toLowerCase().includes(query) ||
                    (pkg.stateId && pkg.stateId.toLowerCase().includes(query)) ||
                    (pkg.destinations && pkg.destinations.some(d => d.toLowerCase().includes(query)));

                if (!matchesSearch) return false;
            }

            // Category Filter
            if (filters.category.length > 0) {
                const pkgThemes = generateThemes(pkg);
                // Check if ANY of the selected categories match ANY of the generated themes
                // Use strict inclusion or equality, but case-insensitive
                const hasCategory = filters.category.some(cat =>
                    pkgThemes.some(theme => theme.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(theme.toLowerCase()))
                );
                if (!hasCategory) return false;
            }

            // State filter
            if (filters.state !== 'all' && pkg.stateId !== filters.state) return false;

            // Organizer filter
            if (filters.organizer !== 'all' && pkg.organizer !== filters.organizer) return false;

            // Transport mode filter
            if (filters.transportMode !== 'all' && pkg.transportMode !== filters.transportMode) return false;

            // Subsidized filter
            if (filters.isSubsidized && !pkg.isSubsidized) return false;

            // Duration filter
            const durationMatch = pkg.duration.match(/(\d+)/);
            const nights = durationMatch ? parseInt(durationMatch[0]) : 0;
            // Handle "Day Trip" or similar (0 nights)
            const pkgDuration = pkg.duration.toLowerCase().includes('day') && !pkg.duration.toLowerCase().includes('night') ? 1 : nights;

            if (pkgDuration < filters.durationMin || pkgDuration > filters.durationMax) return false;

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
    }, [filters]); // Re-compute when filters change

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            <style jsx>{`
                /* Mobile: Hide sidebar by default, show FAB, drawer overlay */
                @media (max-width: 1023px) {
                    .mobile-filter-btn {
                        display: flex !important;
                    }
                    .packages-container {
                        margin-left: 0 !important;
                    }
                    .mobile-submit-btn {
                        display: block !important;
                    }
                    .desktop-toggle-btn {
                        display: none !important;
                    }
                }

                /* Desktop: Fixed sidebar logic */
                @media (min-width: 1024px) {
                    .mobile-filter-btn {
                        display: none !important;
                    }
                    .mobile-submit-btn {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Desktop Toggle Button (Visible when sidebar is closed) */}
            {!showFilters && (
                <button
                    onClick={() => setShowFilters(true)}
                    className="desktop-toggle-btn"
                    style={{
                        position: 'fixed',
                        left: '0',
                        top: '120px',
                        zIndex: 998,
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderLeft: 'none',
                        borderRadius: '0 0.5rem 0.5rem 0',
                        padding: '0.75rem 0.25rem',
                        cursor: 'pointer',
                        boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#4b5563'
                    }}
                    title="Show Filters"
                >
                    <ChevronRight size={20} />
                </button>
            )}

            <div className="packages-container" style={{
                /* Dynamically adjust margin based on sidebar state on desktop */
                marginLeft: showFilters ? '300px' : '0',
                transition: 'margin-left 0.3s ease-in-out'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                    {filters.state === 'all'
                        ? 'All Tour Packages'
                        : `${states.find(s => s.id === filters.state)?.name} Tour Packages`}
                </h1>
                <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '800px' }}>
                    {filters.state === 'all'
                        ? `Explore ${packages.length} curated tour packages from state tourism boards, IRCTC, and private operators across India.`
                        : `Discover ${filteredPackages.length} curated tour packages in ${states.find(s => s.id === filters.state)?.name}.`}
                    {' '}Filter by organizer, transport mode, and discover government-subsidized schemes.
                </p>
            </div>

            {/* Disclaimer Banner */}
            <div style={{
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '0.5rem',
                padding: '1rem 1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                marginLeft: showFilters ? '300px' : '0', // Align with content
                transition: 'margin-left 0.3s ease-in-out'
            }} className="desktop-margin-adjustment">
                <span style={{ fontSize: '1.25rem', marginTop: '0.125rem' }}>ℹ️</span>
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.875rem', color: '#92400E', margin: 0, lineHeight: 1.6 }}>
                        <strong>IncredBharat is an information aggregator only.</strong> All packages are from official government & state tourism boards. Book directly on their websites.
                        <Link href="/disclaimer" style={{ color: '#B45309', marginLeft: '0.5rem', textDecoration: 'underline' }}>
                            Read full disclaimer →
                        </Link>
                    </p>
                </div>
            </div>

            {/* Search Bar with Autocomplete */}
            <div style={{
                marginBottom: '2rem',
                position: 'relative',
                marginLeft: showFilters ? '300px' : '0', // Align with content
                transition: 'margin-left 0.3s ease-in-out'
            }}>
                <input
                    type="text"
                    placeholder="Search packages by destination, title, or organizer..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    onFocus={() => setShowSuggestions(true)}
                    // Delay hiding to allow clicking suggestions
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.5rem',
                        fontSize: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                />

                {/* Autocomplete Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        marginTop: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        zIndex: 50
                    }}>
                        {searchSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    if (suggestion.field === 'state') {
                                        setFilters({ ...filters, state: suggestion.value, searchQuery: '' });
                                    } else if (suggestion.field === 'organizer') {
                                        setFilters({ ...filters, organizer: suggestion.value, searchQuery: '' });
                                    } else {
                                        setFilters({ ...filters, searchQuery: suggestion.value });
                                    }
                                    setShowSuggestions(false);
                                }}
                                style={{
                                    padding: '0.75rem 1rem',
                                    cursor: 'pointer',
                                    borderBottom: index < searchSuggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                            >
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '0.25rem 0.5rem',
                                    background: '#EFF6FF',
                                    color: '#1E40AF',
                                    borderRadius: '0.25rem',
                                    width: '80px',
                                    textAlign: 'center'
                                }}>
                                    {suggestion.type}
                                </span>
                                <span style={{ color: '#374151' }}>{suggestion.text}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ position: 'relative' }}>
                {/* Mobile Filter Toggle Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 1000,
                        display: 'none', // Will be shown via CSS media query
                        padding: '1rem',
                        background: '#FF7A18',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    className="mobile-filter-btn"
                >
                    <SlidersHorizontal size={24} />
                </button>

                {/* Filter Sidebar - Fixed on Desktop, Drawer on Mobile */}
                <div style={{
                    position: 'fixed',
                    left: showFilters ? '0' : '-320px',
                    top: '80px',
                    width: '280px',
                    height: 'calc(100vh - 80px)',
                    background: 'white',
                    zIndex: 999,
                    transition: 'left 0.3s ease-in-out',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                    overflowY: 'auto'
                }} className="filter-sidebar">
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <SlidersHorizontal size={20} />
                                Filters
                            </h3>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <button
                                    onClick={() => setFilters({
                                        state: 'all',
                                        category: [], // Reset category array
                                        organizer: 'all',
                                        transportMode: 'all',
                                        isSubsidized: false,
                                        priceRange: 'all',
                                        minRating: 0,
                                        durationMin: 0,
                                        durationMax: 15,
                                        searchQuery: ''
                                    })}
                                    style={{
                                        fontSize: '0.875rem',
                                        color: '#FF7A18',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    Reset
                                </button>
                                {/* Desktop Collapse Button */}
                                <button
                                    className="desktop-toggle-btn"
                                    onClick={() => setShowFilters(false)}
                                    style={{
                                        background: '#f3f4f6',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    title="Hide Filters"
                                >
                                    <ChevronLeft size={16} color="#4b5563" />
                                </button>
                            </div>
                        </div>

                        {/* State Filter */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>
                                State / Destination
                            </label>
                            <select
                                value={filters.state}
                                onChange={(e) => setFilters({
                                    ...filters,
                                    state: e.target.value,
                                    organizer: 'all' // Reset organizer when state changes
                                })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="all">All States</option>
                                {uniqueStates.map(state => (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Organizer Filter */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>
                                Organizer
                                {filters.state !== 'all' && (
                                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 400, marginLeft: '0.5rem' }}>
                                        (in selected state)
                                    </span>
                                )}
                            </label>
                            <select
                                value={filters.organizer}
                                onChange={(e) => setFilters({ ...filters, organizer: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="all">All Organizers</option>
                                {availableOrganizers.map(org => (
                                    <option key={org} value={org}>{org}</option>
                                ))}
                            </select>
                        </div>

                        {/* Duration Filter */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>
                                Duration (Days)
                            </label>
                            <div style={{ padding: '0 0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                    <span>{filters.durationMin}d</span>
                                    <span>{filters.durationMax >= 15 ? '15+' : filters.durationMax}d</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="15"
                                        step="1"
                                        value={filters.durationMin}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (val <= filters.durationMax) {
                                                setFilters({ ...filters, durationMin: val });
                                            }
                                        }}
                                        style={{ width: '100%', accentColor: '#FF7A18', height: '4px' }}
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="15"
                                        step="1"
                                        value={filters.durationMax}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (val >= filters.durationMin) {
                                                setFilters({ ...filters, durationMax: val });
                                            }
                                        }}
                                        style={{ width: '100%', accentColor: '#FF7A18', height: '4px' }}
                                    />
                                </div>
                            </div>
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

                        {/* Mobile Submit Button */}
                        <div className="mobile-submit-btn" style={{
                            marginTop: '1.5rem',
                            paddingTop: '1.5rem',
                            borderTop: '1px solid #e5e7eb'
                        }}>
                            <button
                                onClick={() => setShowFilters(false)}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    background: '#FF7A18',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(255, 153, 51, 0.4)'
                                }}
                            >
                                Apply Filters ({filteredPackages.length} Results)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - with margin for desktop sidebar */}
                <div style={{
                    marginLeft: showFilters ? '300px' : '0',
                    width: '100%',
                    transition: 'margin-left 0.3s ease-in-out'
                }} className="main-content">
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
                        <div
                            key={`grid-${filters.state}-${filters.organizer}-${filteredPackages.length}`}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '2rem'
                            }}>
                            {filteredPackages.map(pkg => {
                                const state = states.find(s => s.id === pkg.stateId);
                                return (
                                    <div key={pkg.id} className="card" style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div style={{ height: '220px', position: 'relative' }}>
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

                                            {/* Action Buttons - Top Right */}
                                            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
                                                <CompareButton packageId={pkg.id} size={18} />
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
                                                <Star size={14} fill="#FF7A18" stroke="#FF7A18" />
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

                                            {/* USP Bullets */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                {(pkg.usps || generateUSPs(pkg)).map((usp, idx) => (
                                                    <div key={idx} style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '0.5rem',
                                                        fontSize: '0.8rem',
                                                        color: '#4b5563',
                                                        marginBottom: '0.25rem'
                                                    }}>
                                                        <span style={{ color: '#138808' }}>✓</span>
                                                        {usp}
                                                    </div>
                                                )).slice(0, 2)}
                                            </div>

                                            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block' }}>Starting from</span>
                                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>₹{pkg.price.toLocaleString('en-IN')}</span>
                                                </div>
                                                <Link href={`/packages/${pkg.id}`} className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '5rem', background: '#f9fafb', borderRadius: '1rem' }}>
                            <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', background: '#e5e7eb', marginBottom: '1.5rem', color: '#6b7280' }}>
                                <X size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>No packages found</h3>
                            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Try adjusting your filters to find what you&apos;re looking for.</p>
                            <button
                                onClick={() => setFilters({
                                    state: 'all',
                                    organizer: 'all',
                                    transportMode: 'all',
                                    isSubsidized: false,
                                    priceRange: 'all',
                                    minRating: 0,
                                    durationMin: 0,
                                    durationMax: 15,
                                    searchQuery: ''
                                })}
                                className="btn btn-primary"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function PackagesPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading packages...</div>}>
            <PackagesContent />
        </Suspense>
    );
}
