'use client';

import Link from 'next/link';
import { AlertTriangle, ExternalLink, Info, Shield, FileText } from 'lucide-react';

export default function DisclaimerPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#fef3c7',
                        marginBottom: '1.5rem'
                    }}>
                        <Shield size={40} color="#d97706" />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#111827' }}>
                        Disclaimer & Terms of Use
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
                        Please read this disclaimer carefully before using IncredBharat
                    </p>
                </div>

                {/* Main Content */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '2.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    {/* Important Notice */}
                    <div style={{
                        backgroundColor: '#fef3c7',
                        border: '1px solid #fcd34d',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        <AlertTriangle size={24} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <h3 style={{ fontWeight: 700, color: '#92400e', marginBottom: '0.5rem' }}>Important Notice</h3>
                            <p style={{ color: '#78350f', lineHeight: 1.6, margin: 0 }}>
                                IncredBharat is an <strong>information aggregator platform</strong>. We do not operate, manage, or have any
                                direct affiliation with the tourism packages, state tourism departments, IRCTC, or any other
                                organizations listed on this website.
                            </p>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Info size={24} color="#3b82f6" />
                            Nature of Content
                        </h2>
                        <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
                            <p style={{ marginBottom: '1rem' }}>
                                All information displayed on IncredBharat, including but not limited to tour package details,
                                prices, itineraries, images, and descriptions, has been <strong>extracted from publicly available
                                    official websites</strong> of various state tourism development corporations, IRCTC, and state road
                                transport corporations.
                            </p>
                            <p>
                                We strive to present accurate information; however, as content is sourced from external websites
                                over which we have no control, we cannot guarantee the accuracy, completeness, or timeliness of
                                the information provided.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ExternalLink size={24} color="#10b981" />
                            Official Sources & Bookings
                        </h2>
                        <div style={{
                            backgroundColor: '#ecfdf5',
                            border: '1px solid #a7f3d0',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            marginBottom: '1rem'
                        }}>
                            <p style={{ color: '#065f46', lineHeight: 1.7, margin: 0 }}>
                                <strong>For the most accurate and up-to-date information, visitors are strongly advised to:</strong>
                            </p>
                            <ul style={{ color: '#065f46', marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Visit the official website of the respective tourism department</li>
                                <li style={{ marginBottom: '0.5rem' }}>Verify all details including prices, availability, and itinerary directly with the official source</li>
                                <li style={{ marginBottom: '0.5rem' }}>Make all bookings exclusively through official government portals</li>
                                <li>Contact the official helpline numbers for any queries or clarifications</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={24} color="#8b5cf6" />
                            Limitation of Liability
                        </h2>
                        <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
                            <p style={{ marginBottom: '1rem' }}>
                                IncredBharat and its owners, operators, and affiliates shall <strong>not be held responsible or liable</strong> for:
                            </p>
                            <ul style={{ paddingLeft: '1.25rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}>
                                    <strong>Inaccurate Information:</strong> Any errors, omissions, or outdated information displayed on this website
                                </li>
                                <li style={{ marginBottom: '0.75rem' }}>
                                    <strong>Financial Loss:</strong> Any financial losses, booking failures, or payment issues arising from the use of information on this site
                                </li>
                                <li style={{ marginBottom: '0.75rem' }}>
                                    <strong>Travel Disruptions:</strong> Cancellations, delays, changes in itinerary, or any other disruptions to travel plans
                                </li>
                                <li style={{ marginBottom: '0.75rem' }}>
                                    <strong>Third-Party Services:</strong> Quality, safety, or performance of services provided by tourism operators
                                </li>
                                <li style={{ marginBottom: '0.75rem' }}>
                                    <strong>External Links:</strong> Content, privacy practices, or availability of external websites linked from our platform
                                </li>
                                <li>
                                    <strong>Personal Inconvenience:</strong> Any inconvenience, disappointment, or harm experienced during or after travel
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>
                            No Booking Services
                        </h2>
                        <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
                            <p>
                                IncredBharat does <strong>not process bookings, accept payments, or handle reservations</strong> of any kind.
                                We serve purely as an information discovery platform to help travelers explore available tourism options
                                across India. All transactions must be completed directly with the official service providers.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>
                            Intellectual Property
                        </h2>
                        <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
                            <p>
                                All trademarks, logos, images, and content displayed on this website belong to their respective owners
                                (state tourism departments, IRCTC, etc.). Their use on IncredBharat is solely for informational and
                                reference purposes.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>
                            Changes to Information
                        </h2>
                        <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
                            <p>
                                Tourism packages, prices, availability, and other details are subject to change by the respective
                                tourism operators without prior notice. We recommend verifying all information before making any
                                travel decisions or financial commitments.
                            </p>
                        </div>
                    </section>

                    {/* Acceptance */}
                    <div style={{
                        backgroundColor: '#f3f4f6',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        marginTop: '2rem',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: '#374151', lineHeight: 1.7, margin: 0 }}>
                            By using IncredBharat, you acknowledge that you have read, understood, and agree to this disclaimer.
                            Your continued use of this website constitutes acceptance of these terms.
                        </p>
                    </div>

                    {/* Last Updated */}
                    <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem', marginTop: '2rem' }}>
                        Last updated: January 1, 2026
                    </p>
                </div>

                {/* Back Link */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href="/" style={{
                        color: '#FF7A18',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
