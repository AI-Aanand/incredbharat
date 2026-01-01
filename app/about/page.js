import Link from 'next/link';
import { MapPin, Building2, Train, Bus, Plane, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="container about-page" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            {/* Hero Section */}
            <div className="about-hero" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
                <div className="about-logo-container" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem'
                }}>
                    <MapPin className="about-logo-icon" size={48} style={{ color: '#FF9933' }} />
                    <h1 className="about-title" style={{ fontSize: '3rem', fontWeight: 800 }}>
                        Incred<span style={{ color: '#FF9933' }}>Bharat</span>
                    </h1>
                </div>
                <p className="about-subtitle" style={{ fontSize: '1.25rem', color: '#6b7280', lineHeight: 1.8 }}>
                    Your one-stop platform to discover and compare tourism packages from all Indian state tourism boards,
                    IRCTC, and state road transport corporations.
                </p>
            </div>

            {/* Mission Section */}
            <div className="card" style={{ marginBottom: '3rem', padding: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                    Our Mission
                </h2>
                <p style={{ fontSize: '1.125rem', color: '#4b5563', lineHeight: 1.8, marginBottom: '1rem' }}>
                    India offers incredible tourism packages through various government bodies - from state tourism development
                    corporations like KTDC and RTDC to IRCTC's luxury trains and state road transport services. However,
                    these are scattered across dozens of websites, making it difficult for travelers to discover, compare,
                    and choose the best options.
                </p>
                <p style={{ fontSize: '1.125rem', color: '#4b5563', lineHeight: 1.8, marginBottom: '1rem' }}>
                    <strong>IncredBharat</strong> brings together these official government tourism packages into one modern,
                    user-friendly platform. Whether you're looking for a budget KSRTC bus tour, a subsidized heritage circuit,
                    or a luxury Palace on Wheels experience, we make it easy to find and compare options.
                </p>
                <p style={{ fontSize: '1.125rem', color: '#4b5563', lineHeight: 1.8 }}>
                    With <strong>mobile-first design</strong>, <strong>intelligent search</strong>, <strong>easy sharing</strong>,
                    and <strong>visual package indicators</strong>, we've modernized the way you discover India's incredible
                    travel experiences - all from trusted government sources.
                </p>
            </div>

            {/* New Features Section */}
            <div className="card" style={{ marginBottom: '3rem', padding: '3rem', background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE5CC 100%)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 700, textAlign: 'center' }}>
                    Platform Features
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📱</div>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 700 }}>Mobile Responsive</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Seamlessly browse packages on any device - desktop, tablet, or smartphone
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 700 }}>Smart Search</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Find exactly what you need with intelligent search across all packages
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔖</div>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 700 }}>Visual Indicators</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Color-coded badges help you instantly identify package types and organizers
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📤</div>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 700 }}>Easy Sharing</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Share packages via WhatsApp, Email, Facebook, Twitter, or copy link
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🗺️</div>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 700 }}>Interactive Map</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Explore destinations visually with our interactive India map
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 700 }}>Lightning Fast</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Built with Next.js for blazing-fast performance and smooth navigation
                        </p>
                    </div>
                </div>
            </div>

            {/* Package Types Explanation */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 700, textAlign: 'center' }}>
                    Understanding Package Types
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {/* State Tourism */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex',
                            padding: '1rem',
                            borderRadius: '50%',
                            background: '#FFF5E6',
                            marginBottom: '1.5rem'
                        }}>
                            <Building2 size={32} style={{ color: '#FF9933' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>
                            State Tourism
                        </h3>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            background: '#FF9933',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            marginBottom: '1rem'
                        }}>
                            KTDC, RTDC, GTDC, etc.
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Official packages from State Tourism Development Corporations. Quality-assured stays and curated experiences.
                        </p>
                    </div>

                    {/* IRCTC Rail */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex',
                            padding: '1rem',
                            borderRadius: '50%',
                            background: '#E6F2FF',
                            marginBottom: '1.5rem'
                        }}>
                            <Train size={32} style={{ color: '#0066CC' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>
                            IRCTC Rail Tours
                        </h3>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            background: '#0066CC',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            marginBottom: '1rem'
                        }}>
                            IRCTC
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Rail-based tour packages including luxury trains like Palace on Wheels, Golden Chariot, and Bharat Darshan circuits.
                        </p>
                    </div>

                    {/* Road Transport */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex',
                            padding: '1rem',
                            borderRadius: '50%',
                            background: '#F3F4F6',
                            marginBottom: '1.5rem'
                        }}>
                            <Bus size={32} style={{ color: '#6B7280' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>
                            Road Transport
                        </h3>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            background: '#6B7280',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            marginBottom: '1rem'
                        }}>
                            KSRTC, APSRTC, TSRTC
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Budget-friendly bus tours from State Road Transport Corporations. Comfortable Volvo and Garuda services.
                        </p>
                    </div>

                    {/* Subsidized */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex',
                            padding: '1rem',
                            borderRadius: '50%',
                            background: '#FFFBEB',
                            marginBottom: '1.5rem'
                        }}>
                            <Award size={32} style={{ color: '#FFD700' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>
                            Government Subsidized
                        </h3>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: '#1F2937',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            marginBottom: '1rem'
                        }}>
                            ★ SUBSIDIZED
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Special schemes with government subsidies for students, senior citizens, women, and cultural exchange programs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Partner Organizations */}
            <div className="card" style={{ padding: '3rem', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 700 }}>
                    Our Partner Organizations
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { name: 'KTDC', full: 'Kerala Tourism Development Corporation' },
                        { name: 'RTDC', full: 'Rajasthan Tourism Development Corporation' },
                        { name: 'GTDC', full: 'Goa Tourism Development Corporation' },
                        { name: 'MTDC', full: 'Maharashtra Tourism Development Corporation' },
                        { name: 'KSTDC', full: 'Karnataka State Tourism Development Corporation' },
                        { name: 'IRCTC', full: 'Indian Railway Catering and Tourism Corporation' },
                        { name: 'KSRTC', full: 'Karnataka State Road Transport Corporation' },
                        { name: 'APSRTC', full: 'Andhra Pradesh State Road Transport Corporation' },
                        { name: 'RSRTC', full: 'Rajasthan State Road Transport Corporation' },
                        { name: 'GSRTC', full: 'Gujarat State Road Transport Corporation' },
                        { name: 'WBTDC', full: 'West Bengal Tourism Development Corporation' },
                        { name: 'JKTDC', full: 'Jammu & Kashmir Tourism Development Corporation' }
                    ].map(org => (
                        <div key={org.name} style={{
                            padding: '1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.5rem',
                            transition: 'border-color 0.2s'
                        }}>
                            <div style={{ fontWeight: 700, color: '#000080', marginBottom: '0.25rem' }}>
                                {org.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.4 }}>
                                {org.full}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 700, textAlign: 'center' }}>
                    How It Works
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {[
                        { num: '1', title: 'Browse', desc: 'Explore 80+ packages from all states and organizers' },
                        { num: '2', title: 'Filter', desc: 'Use our smart filters to find packages by organizer, transport, price, and subsidies' },
                        { num: '3', title: 'Compare', desc: 'View detailed information and compare options side-by-side' },
                        { num: '4', title: 'Book', desc: 'Click through to the official website to complete your booking' }
                    ].map(step => (
                        <div key={step.num} style={{ textAlign: 'center' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: '#FF9933',
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                marginBottom: '1rem'
                            }}>
                                {step.num}
                            </div>
                            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                                {step.title}
                            </h3>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'linear-gradient(135deg, #000080 0%, #0000CD 100%)',
                borderRadius: '1rem',
                color: 'white'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    Ready to Explore India?
                </h2>
                <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
                    Discover amazing packages from official government tourism boards
                </p>
                <Link href="/packages" className="btn" style={{
                    background: '#FF9933',
                    color: 'white',
                    padding: '1rem 2rem',
                    fontSize: '1.125rem',
                    fontWeight: 600
                }}>
                    Browse All Packages
                </Link>
            </div>
        </div>
    );
}
