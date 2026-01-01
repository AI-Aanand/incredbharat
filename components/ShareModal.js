'use client';

import { useState } from 'react';
import { X, Copy, MessageCircle, Facebook, Twitter, Mail, Linkedin, Check } from 'lucide-react';
import { shareUrls, copyToClipboard } from '../lib/shareUtils';

export default function ShareModal({ isOpen, onClose, shareUrl, shareMessage, emailData }) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopyLink = async () => {
        const success = await copyToClipboard(shareUrl);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSocialShare = (url) => {
        window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
    };

    const shareOptions = [
        {
            name: 'Copy Link',
            icon: copied ? Check : Copy,
            color: copied ? '#10b981' : '#6b7280',
            onClick: handleCopyLink,
            description: copied ? 'Copied!' : 'Copy to clipboard'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: '#25D366',
            onClick: () => handleSocialShare(shareUrls.whatsapp(shareMessage, shareUrl)),
            description: 'Share on WhatsApp'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            color: '#1877F2',
            onClick: () => handleSocialShare(shareUrls.facebook(shareUrl)),
            description: 'Share on Facebook'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            color: '#1DA1F2',
            onClick: () => handleSocialShare(shareUrls.twitter(shareMessage, shareUrl)),
            description: 'Share on Twitter'
        },
        {
            name: 'Email',
            icon: Mail,
            color: '#EA4335',
            onClick: () => window.location.href = shareUrls.email(emailData.subject, emailData.body),
            description: 'Share via Email'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            color: '#0A66C2',
            onClick: () => handleSocialShare(shareUrls.linkedin(shareUrl)),
            description: 'Share on LinkedIn'
        }
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9998,
                    animation: 'fadeIn 0.2s ease-out'
                }}
            />

            {/* Modal */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderTopLeftRadius: '1.5rem',
                    borderTopRightRadius: '1.5rem',
                    boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.1)',
                    zIndex: 9999,
                    animation: 'slideUp 0.3s ease-out',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                        Share this Package
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <X size={24} color="#6b7280" />
                    </button>
                </div>

                {/* Share Options Grid */}
                <div className="share-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    padding: '2rem',
                    paddingBottom: '2.5rem'
                }}>
                    {shareOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.name}
                                onClick={option.onClick}
                                className="share-option-btn"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '1.5rem 1rem',
                                    background: 'white',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    outline: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = option.color;
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: `${option.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon size={24} color={option.color} />
                                </div>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#374151',
                                    textAlign: 'center'
                                }}>
                                    {option.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @media (min-width: 768px) {
                    div[style*="bottom: 0"] {
                        bottom: auto !important;
                        top: 50% !important;
                        transform: translateY(-50%) !important;
                        border-radius: 1.5rem !important;
                    }
                }

                /* Mobile Optimizations */
                @media (max-width: 640px) {
                    :global(.share-grid) {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0.875rem !important;
                        padding: 1.5rem !important;
                        padding-bottom: 2rem !important;
                    }
                    :global(.share-option-btn) {
                        padding: 1.25rem 0.75rem !important;
                        min-height: 100px;
                    }
                }

                @media (max-width: 480px) {
                    :global(.share-grid) {
                        gap: 0.75rem !important;
                        padding: 1.25rem !important;
                    }
                }
            `}</style>
        </>
    );
}
