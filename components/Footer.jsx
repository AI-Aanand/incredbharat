'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer-container" style={{ backgroundColor: '#0F4C75', color: 'white', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Incred<span style={{ color: '#FF7A18' }}>Bharat</span>
                        </h3>
                        <p style={{ color: '#e5e7eb', lineHeight: '1.6' }}>
                            Discover the soul of India. From the Himalayas to the Indian Ocean, we aggregate the best experiences for you.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.25rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.75rem' }}>
                                <Link href="/" style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
                            </li>
                            <li style={{ marginBottom: '0.75rem' }}>
                                <Link href="/packages" style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}>Packages</Link>
                            </li>
                            <li style={{ marginBottom: '0.75rem' }}>
                                <Link href="/favorites" style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}>Favorites</Link>
                            </li>
                            <li style={{ marginBottom: '0.75rem' }}>
                                <Link href="/about" style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}>About Us</Link>
                            </li>
                            <li style={{ marginBottom: '0.75rem' }}>
                                <Link href="/disclaimer" style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}>Disclaimer</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.25rem' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db' }}>
                                <MapPin size={18} />
                                <span>Kalyan Nagar, Bengaluru, Karnataka</span>
                            </div>
                            <a href="tel:+919663080203" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#d1d5db'}>
                                <Phone size={18} />
                                <span>+91 9663080203</span>
                            </a>
                            <a href="mailto:aanand.blog@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#d1d5db'}>
                                <Mail size={18} />
                                <span>aanand.blog@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Disclaimer Banner */}
                <div style={{
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '0.5rem',
                    padding: '1rem 1.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    <p style={{ color: '#fcd34d', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                        <strong>Disclaimer:</strong> IncredBharat is an information aggregator only. All package details are sourced from official government tourism websites.
                        Please verify information and make bookings directly through official channels.
                        <Link href="/disclaimer" style={{ color: '#fbbf24', marginLeft: '0.5rem', fontWeight: 600 }}>Read Full Disclaimer →</Link>
                    </p>
                </div>

                <div style={{ borderTop: '1px solid #374151', paddingTop: '1.5rem', textAlign: 'center', color: '#d1d5db' }}>
                    <p style={{ marginBottom: '0.5rem' }}>&copy; {new Date().getFullYear()} IncredBharat Tourism. All rights reserved.</p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                        Not affiliated with any government tourism department. For informational purposes only.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .footer-container {
                        padding-top: 3rem !important;
                        padding-bottom: 1.5rem !important;
                    }
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2.5rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .footer-container {
                        padding-top: 2.5rem !important;
                    }
                    .footer-grid {
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </footer>
    );
}
