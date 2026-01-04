'use client';

import Link from 'next/link';
import ImageWithFallback from '../ImageWithFallback';
import { MapPin, ArrowRight } from 'lucide-react';

export default function StateCardV2({ state, packageCount, compact = false }) {
    return (
        <Link href={`/states/${state.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                transition: 'all 0.2s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    e.currentTarget.style.borderColor = '#FF9933';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                }}>
                {/* Image */}
                <div style={{
                    height: compact ? '140px' : '180px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <ImageWithFallback
                        src={state.image}
                        alt={state.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    {/* Gradient overlay for better text readability */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
                    }} />
                </div>

                {/* Content */}
                <div style={{ padding: compact ? '0.875rem' : '1.125rem' }}>
                    {/* State Name */}
                    <h3 style={{
                        fontSize: compact ? '1rem' : '1.125rem',
                        fontWeight: 700,
                        color: '#131921',
                        marginBottom: '0.375rem',
                        lineHeight: 1.3
                    }}>
                        {state.name}
                    </h3>

                    {/* Tagline */}
                    <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginBottom: '0.75rem',
                        lineHeight: 1.4
                    }}>
                        {state.description}
                    </p>

                    {/* Package Count */}
                    {packageCount > 0 && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            color: '#007185',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            marginBottom: '0.75rem'
                        }}>
                            <MapPin size={14} />
                            <span>{packageCount} Package{packageCount !== 1 ? 's' : ''}</span>
                        </div>
                    )}

                    {/* CTA */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        color: '#FF9933',
                        fontSize: '0.875rem',
                        fontWeight: 600
                    }}>
                        <span>Explore Packages</span>
                        <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
