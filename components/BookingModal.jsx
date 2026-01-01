'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

export default function BookingModal({ isOpen, onClose, packageTitle, price }) {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! Your inquiry has been sent. Our travel expert will contact you shortly.');
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card" style={{
                width: '100%',
                maxWidth: '500px',
                padding: '2rem',
                position: 'relative',
                animation: 'slideUp 0.3s ease-out'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6b7280'
                    }}
                >
                    <X size={24} />
                </button>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Book Your Trip</h3>
                <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
                    Inquiry for <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{packageTitle}</span>
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
                        <input required type="text" className="form-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} placeholder="John Doe" />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
                        <input required type="email" className="form-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} placeholder="john@example.com" />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
                        <input required type="tel" className="form-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} placeholder="+91 98765 43210" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Travel Date</label>
                            <input required type="date" className="form-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Guests</label>
                            <input required type="number" min="1" defaultValue="2" className="form-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Estimate</span>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>₹{price?.toLocaleString('en-IN')}</div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                            Send Inquiry
                        </button>
                    </div>
                </form>
            </div>
            <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
