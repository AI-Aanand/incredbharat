'use client';

import { useState, useEffect } from 'react';
import { packages, states } from '../../../lib/data';
import { notFound } from 'next/navigation';
import { MapPin, Clock, CheckCircle2, Share2, Heart, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import BookingModal from '../../../components/BookingModal';
import ShareModal from '../../../components/ShareModal';
import FavoriteButton from '../../../components/FavoriteButton';
import { formatShareMessage, formatEmailShare, shareViaWebAPI, canUseWebShare } from '../../../lib/shareUtils';


export default function PackagePage({ params }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const pkg = packages.find(p => p.id === params.id);

    // Track view
    useEffect(() => {
        if (pkg) {
            import('../../../lib/viewTracking').then(({ trackView }) => {
                trackView('package', pkg.id);
            });
        }
    }, [pkg]);

    if (!pkg) {
        return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Package not found</div>;
    }

    const state = states.find(s => s.id === pkg.stateId);

    // Share functionality
    const handleShare = async () => {
        const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
        const shareMessage = formatShareMessage(pkg, state);
        const emailData = formatEmailShare(pkg, state, shareUrl);

        // Try Web Share API first (mobile-friendly)
        if (canUseWebShare()) {
            const shareData = {
                title: pkg.title,
                text: shareMessage,
                url: shareUrl
            };

            const shared = await shareViaWebAPI(shareData);
            if (shared) {
                // Successfully shared via native API
                return;
            }
        }

        // Fallback to custom modal
        setIsShareModalOpen(true);
    };

    // Prepare share data for modal
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareMessage = formatShareMessage(pkg, state);
    const emailData = formatEmailShare(pkg, state, shareUrl);

    return (
        <div style={{ paddingBottom: '4rem', background: 'white' }}>
            {/* Breadcrumb / Nav */}
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Link href={`/states/${pkg.stateId}`} style={{ display: 'inline-flex', alignItems: 'center', color: '#6b7280', textDecoration: 'none' }}>
                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to {state?.name || 'Destinations'}
                </Link>
            </div>

            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>

                    {/* Left Content: Images & Details */}
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{pkg.title}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', color: '#6b7280' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={20} /> {state?.name}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={20} /> {pkg.duration}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{pkg.reviews} Reviews</span>
                        </div>

                        {/* Gallery */}
                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                            <div style={{ height: '400px', borderRadius: '1rem', overflow: 'hidden' }}>
                                <img src={pkg.images[0]} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            {pkg.images.length > 1 && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {pkg.images.slice(1).map((img, i) => (
                                        <div key={i} style={{ height: '200px', borderRadius: '1rem', overflow: 'hidden' }}>
                                            <img src={img} alt={`${pkg.title} ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <section style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overview</h2>
                            <p style={{ lineHeight: '1.8', color: '#4b5563', fontSize: '1.1rem' }}>{pkg.description}</p>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>What's Included</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                {pkg.amenities.map(item => (
                                    <div key={item} style={{
                                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                                        padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem',
                                        border: '1px solid #f3f4f6'
                                    }}>
                                        <CheckCircle2 size={20} color="var(--secondary)" />
                                        <span style={{ fontWeight: 500 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right content: Sticky Information Card */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'sticky', top: '100px' }}>
                            <div className="card" style={{ padding: '2rem', border: '1px solid #e5e7eb', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Approximate Price</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>₹{pkg.price.toLocaleString('en-IN')}</span>
                                        <span style={{ color: '#6b7280' }}>/ per person</span>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {state?.website ? (
                                        <a
                                            href={state.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                            style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                        >
                                            View on Official Website <ExternalLink size={18} />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="btn btn-primary"
                                            style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                                        >
                                            Book Now
                                        </button>
                                    )}

                                    <button
                                        onClick={handleShare}
                                        className="btn btn-outline"
                                        style={{ width: '100%' }}
                                    >
                                        <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Share Package
                                    </button>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        width: '100%'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#FF0000';
                                            e.currentTarget.style.background = '#fee2e2';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#e5e7eb';
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <FavoriteButton packageId={pkg.id} size={18} />
                                        <span style={{ fontWeight: 600, fontSize: '1rem' }}>Add to Favorites</span>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
                                    <p style={{ fontSize: '0.875rem', color: '#166534', textAlign: 'center', margin: 0 }}>
                                        <strong>Trusted Source:</strong> This package is managed strictly by the {state?.name} Tourism Department.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                packageTitle={pkg.title}
                price={pkg.price}
            />

            {/* Share Modal */}
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                shareUrl={shareUrl}
                shareMessage={shareMessage}
                emailData={emailData}
            />
        </div>
    );
}
