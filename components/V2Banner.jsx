'use client';

import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export default function V2Banner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            width: '90%',
            maxWidth: '800px',
            backgroundColor: '#0F4C75',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            animation: 'slideDown 0.5s ease-out'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <Sparkles size={24} color="#FF7A18" />
                <div>
                    <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        marginBottom: '0.25rem',
                        color: 'white'
                    }}>
                        Try Our Redesigned Experience
                    </h3>
                    <p style={{
                        fontSize: '0.875rem',
                        color: '#9ca3af',
                        margin: 0
                    }}>
                        Amazon-style UI with better navigation and search
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link
                    href="/v2"
                    style={{
                        padding: '0.625rem 1.5rem',
                        backgroundColor: '#FF7A18',
                        color: 'white',
                        borderRadius: '0.375rem',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        transition: 'background-color 0.2s',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e68a00'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7A18'}
                >
                    Try It Now →
                </Link>

                <button
                    onClick={() => setIsVisible(false)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    aria-label="Close banner"
                >
                    <X size={20} />
                </button>
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        transform: translateX(-50%) translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }

                @media (max-width: 768px) {
                    div[style*="position: fixed"] {
                        top: 90px !important;
                        padding: 0.875rem 1rem !important;
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                }
            `}</style>
        </div>
    );
}
