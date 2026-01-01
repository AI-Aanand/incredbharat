import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#1f2937', color: 'white', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Incred<span style={{ color: '#FF9933' }}>Bharat</span>
                        </h3>
                        <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                            Discover the soul of India. From the Himalayas to the Indian Ocean, we curate the best experiences for you.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.25rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Home', 'Destinations', 'Packages', 'About Us', 'Contact'].map(link => (
                                <li key={link} style={{ marginBottom: '0.75rem' }}>
                                    <a href="#" style={{ color: '#d1d5db', transition: 'color 0.2s' }}>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.25rem' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db' }}>
                                <MapPin size={18} />
                                <span>Connaught Place, New Delhi, India</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db' }}>
                                <Phone size={18} />
                                <span>+91 98765 43210</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db' }}>
                                <Mail size={18} />
                                <span>hello@incred-bharat.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                    <p>&copy; {new Date().getFullYear()} IncredBharat Tourism. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
