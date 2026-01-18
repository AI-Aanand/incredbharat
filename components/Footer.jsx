'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer-container" style={{ backgroundColor: '#790101', color: 'white', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <h3 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Incred<span style={{ color: '#FF7A18' }}>Bharat</span>
                        </h3>
                        <p style={{ color: '#f3f4f6', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            Discover the soul of India. From the Himalayas to the Indian Ocean, we aggregate the best experiences for you.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <Link href="/" style={{ color: '#f9fafb', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.05rem', display: 'block', padding: '0.2rem 0' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#f9fafb'}>Home</Link>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <Link href="/packages" style={{ color: '#f9fafb', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.05rem', display: 'block', padding: '0.2rem 0' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#f9fafb'}>Packages</Link>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <Link href="/favorites" style={{ color: '#f9fafb', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.05rem', display: 'block', padding: '0.2rem 0' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#f9fafb'}>Favorites</Link>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <Link href="/about" style={{ color: '#f9fafb', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.05rem', display: 'block', padding: '0.2rem 0' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#f9fafb'}>About Us</Link>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <Link href="/disclaimer" style={{ color: '#f9fafb', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.05rem', display: 'block', padding: '0.2rem 0' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#f9fafb'}>Disclaimer</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: '#f9fafb', lineHeight: '1.6', fontSize: '1.05rem' }}>
                                <MapPin size={22} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                <span>Kalyan Nagar, Bengaluru, Karnataka</span>
                            </div>
                            <a href="tel:+919663080203" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#f9fafb', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.05rem' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#f9fafb'}>
                                <Phone size={22} />
                                <span>+91 9663080203</span>
                            </a>
                            <a href="mailto:aanand.blog@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#f9fafb', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.05rem' }} onMouseOver={(e) => e.currentTarget.style.color = '#FF7A18'} onMouseOut={(e) => e.currentTarget.style.color = '#f9fafb'}>
                                <Mail size={22} />
                                <span>aanand.blog@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Disclaimer Banner */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <p style={{ color: '#fef3c7', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
                        <strong>Disclaimer:</strong> IncredBharat is an information aggregator only. All package details are sourced from official government tourism websites.
                        Please verify information and make bookings directly through official channels.
                        <Link href="/disclaimer" style={{ color: '#fff', marginLeft: '0.5rem', fontWeight: 700, textDecoration: 'underline' }}>Read Full Disclaimer →</Link>
                    </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', textAlign: 'center', color: '#e5e7eb' }}>
                    <p style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>&copy; {new Date().getFullYear()} IncredBharat Tourism. All rights reserved.</p>
                    <p style={{ fontSize: '0.85rem', color: '#d1d5db', opacity: 0.8 }}>
                        Not affiliated with any government tourism department. For informational purposes only.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .footer-container {
                        padding-top: 3rem !important;
                        padding-bottom: 2rem !important;
                    }
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                        gap: 3rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .footer-container {
                        padding-top: 2.5rem !important;
                    }
                    .footer-grid {
                        gap: 2.5rem !important;
                    }
                }
            `}</style>
        </footer>
    );
}
