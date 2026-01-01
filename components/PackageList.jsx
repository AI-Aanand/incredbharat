import Link from 'next/link';
import { ArrowRight, Clock, Star, MapPin } from 'lucide-react';
import { packages } from '../lib/data';
import { samplePackagesWithMetadata } from '../lib/sample-packages-with-metadata';
import PackageTypeIndicator from './PackageTypeIndicator';
import ImageWithFallback from './ImageWithFallback';

export default function PackageList() {
    // Use sample packages with metadata for demonstration, fallback to regular packages
    const featuredPackages = samplePackagesWithMetadata.length > 0
        ? samplePackagesWithMetadata.slice(0, 3)
        : packages.slice(0, 3);

    return (
        <section style={{ padding: '5rem 0', backgroundColor: '#f3f4f6' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Featured Packages</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Handpicked experiences at unbeatable prices.</p>
                    </div>
                    <Link href="/packages" style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontWeight: 600 }}>
                        View All <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {featuredPackages.map(pkg => (
                        <div key={pkg.id} className="card">
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

                                {/* Rating Badge - Top Right */}
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', padding: '0.25rem 0.75rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, fontSize: '0.875rem' }}>
                                    <Star size={14} fill="#FF9933" stroke="#FF9933" />
                                    {pkg.rating}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    <MapPin size={16} />
                                    {/* Map stateId to something readable if needed, or just assume context */}
                                    Discover India
                                </div>

                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#111827' }}>
                                    <Link href={`/packages/${pkg.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {pkg.title}
                                    </Link>
                                </h3>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    <Clock size={16} />
                                    {pkg.duration}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                    <div>
                                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Starts from</span>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>
                                            ₹{pkg.price.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                    <Link href={`/packages/${pkg.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
