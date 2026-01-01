'use client';

import { useSearchParams } from 'next/navigation';
import { packages, states } from '../../lib/data';
import Link from 'next/link';
import { Star, Clock, MapPin, Search } from 'lucide-react';
import { Suspense } from 'react';
import ImageWithFallback from '../../components/ImageWithFallback';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    // Simple filtering logic
    const filteredPackages = packages.filter(pkg => {
        const state = states.find(s => s.id === pkg.stateId);
        const textMatch =
            pkg.title.toLowerCase().includes(query) ||
            pkg.description.toLowerCase().includes(query) ||
            state?.name.toLowerCase().includes(query);

        return textMatch;
    });

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                Search Results for "{query}"
                <span style={{ fontSize: '1rem', color: '#6b7280', marginLeft: '1rem', fontWeight: 400 }}>
                    ({filteredPackages.length} packages found)
                </span>
            </h1>

            {filteredPackages.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {filteredPackages.map(pkg => {
                        const state = states.find(s => s.id === pkg.stateId);
                        return (
                            <div key={pkg.id} className="card">
                                <div style={{ height: '240px', position: 'relative' }}>
                                    <ImageWithFallback
                                        src={pkg.images[0]}
                                        alt={pkg.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', padding: '0.25rem 0.75rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, fontSize: '0.875rem' }}>
                                        <Star size={14} fill="#FF9933" stroke="#FF9933" />
                                        {pkg.rating}
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
                                        <Link href={`/packages/${pkg.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {pkg.title}
                                        </Link>
                                    </h3>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={16} /> {pkg.duration}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16} /> {state?.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Avg Price</span>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>₹{pkg.price.toLocaleString('en-IN')}</div>
                                        </div>
                                        <Link href={`/packages/${pkg.id}`} className="btn btn-outline">
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
                        <Search size={48} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>No matches found</h3>
                    <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Try different keywords like "Kerala", "Beach", "Honeymoon".</p>
                    <Link href="/" className="btn btn-primary">Back to Home</Link>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '4rem' }}>Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
