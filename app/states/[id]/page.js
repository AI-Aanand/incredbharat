import { states, packages } from '../../../lib/data';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Star, ExternalLink, Info, Train, Bus, Building2, BadgeCheck, Sun, CloudRain, UtensilsCrossed, Camera, Landmark, Music } from 'lucide-react';
import { destinationGuides } from '../../../lib/destinationData';
import { notFound } from 'next/navigation';
import OptimizedImage from '../../../components/OptimizedImage';
import ViewTracker from '../../../components/ViewTracker';

// Helper function to detect package transport type
function getPackageType(pkg) {
    const title = pkg.title.toLowerCase();
    const id = pkg.id.toLowerCase();

    // Government Subsidy packages
    if (id.includes('subsidy') || title.includes('dekho apna desh') || title.includes('govt subsidy') ||
        title.includes('senior citizen') || title.includes('student') || title.includes('ek bharat') ||
        title.includes('divyangjan') || title.includes('women safety') || title.includes('bharat gaurav')) {
        return {
            type: 'subsidy',
            label: 'Govt Subsidy',
            icon: BadgeCheck,
            color: '#9333ea', // Purple
            bgColor: '#f3e8ff',
            borderColor: '#c084fc'
        };
    }

    // IRCTC packages (Rail)
    if (title.includes('irctc') || title.includes('palace on wheels') || title.includes('deccan odyssey') ||
        title.includes('golden chariot') || title.includes('maharajas express') || title.includes('buddhist circuit')) {
        return {
            type: 'rail',
            label: 'Railway',
            icon: Train,
            color: '#2563eb', // Blue
            bgColor: '#dbeafe',
            borderColor: '#93c5fd'
        };
    }

    // Road Transport packages
    if (id.includes('ksrtc') || id.includes('apsrtc') || id.includes('rsrtc') ||
        id.includes('gsrtc') || id.includes('msrtc') || id.includes('upsrtc') || id.includes('tsrtc') ||
        title.includes('bus') || title.includes('volvo') || title.includes('shivneri')) {
        return {
            type: 'road',
            label: 'Road Transport',
            icon: Bus,
            color: '#ea580c', // Orange
            bgColor: '#ffedd5',
            borderColor: '#fdba74'
        };
    }

    // Tourism Department packages (default)
    return {
        type: 'tourism',
        label: 'Tourism Dept',
        icon: Building2,
        color: '#16a34a', // Green
        bgColor: '#dcfce7',
        borderColor: '#86efac'
    };
}

export function generateStaticParams() {
    return states.map((state) => ({
        id: state.id,
    }));
}

export default function StatePage({ params }) {
    const state = states.find(s => s.id === params.id);
    const statePackages = packages.filter(p => p.stateId === params.id);

    if (!state) {
        notFound();
    }

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '4rem', backgroundColor: '#f9fafb' }}>
            <ViewTracker type="state" id={state.id} />
            {/* State Hero */}
            <div style={{ position: 'relative', height: '40vh', minHeight: '300px' }}>
                <OptimizedImage
                    src={state.image}
                    alt={state.name}
                    width={1920}
                    height={600}
                    priority
                    isAIGenerated={state.isAIGenerated}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}></div>
                <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0' }}>
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', color: 'white', marginBottom: '0.5rem', opacity: 0.9, textDecoration: 'none' }}>
                        <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Home
                    </Link>
                    <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '0.5rem' }}>{state.name}</h1>
                    <p style={{ fontSize: '1.1rem', color: 'white', maxWidth: '700px', opacity: 0.9 }}>{state.description}</p>

                    {state.website && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <a href={state.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem' }}>
                                Visit Official Tourism Website <ExternalLink size={16} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
            {/* Destination Guide Section */}
            {destinationGuides[state.id] && (
                <div className="container" style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Best Time & Weather */}
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ea580c' }}>
                                <Sun size={20} /> Best Time to Visit
                            </h3>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontWeight: 600, color: '#111827' }}>{destinationGuides[state.id].bestTime.peak}</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>{destinationGuides[state.id].bestTime.description}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff7ed', padding: '0.75rem', borderRadius: '0.5rem', color: '#c2410c' }}>
                                <CloudRain size={18} />
                                <span style={{ fontWeight: 500 }}>{destinationGuides[state.id].bestTime.temperature}</span>
                            </div>
                        </div>

                        {/* Culture & Food */}
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#db2777' }}>
                                <Music size={20} /> Culture & Food
                            </h3>
                            <div style={{ marginBottom: '1rem' }}>
                                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                    {destinationGuides[state.id].culture}
                                </p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#1f2937' }}>
                                    <UtensilsCrossed size={14} /> Must Try Foods:
                                </h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {destinationGuides[state.id].food.map((item, i) => (
                                        <span key={i} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: '#fce7f3', color: '#db2777', borderRadius: '1rem', fontWeight: 500 }}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Highlights */}
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Camera size={24} style={{ color: '#059669' }} /> Top Attractions
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            {destinationGuides[state.id].highlights.map((highlight, idx) => (
                                <div key={idx} style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', transition: 'all 0.2s' }} className="hover:shadow-md">
                                    <h4 style={{ fontWeight: 600, color: '#059669', marginBottom: '0.5rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                        <Landmark size={16} style={{ marginTop: '3px', flexShrink: 0 }} />
                                        {highlight.title}
                                    </h4>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.5 }}>
                                        {highlight.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Packages Table */}
            <div className="container" style={{ marginTop: '3rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#111827' }}>Available Packages</h2>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        <Info size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Select a package to view full details. Bookings are handled by the official state tourism department.
                    </p>

                    {/* Legend */}
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.875rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <BadgeCheck size={16} style={{ color: '#9333ea' }} />
                            <span style={{ color: '#6b7280' }}>Govt Subsidy</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Train size={16} style={{ color: '#2563eb' }} />
                            <span style={{ color: '#6b7280' }}>Railway (IRCTC)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bus size={16} style={{ color: '#ea580c' }} />
                            <span style={{ color: '#6b7280' }}>Road Transport</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Building2 size={16} style={{ color: '#16a34a' }} />
                            <span style={{ color: '#6b7280' }}>Tourism Department</span>
                        </div>
                    </div>
                </div>

                {statePackages.length > 0 ? (
                    <div style={{ overflowX: 'auto', background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
                                <tr>
                                    <th style={{ padding: '1rem', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Package Name</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Approx Price</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Details</th>
                                </tr>
                            </thead>
                            <tbody style={{ divideY: '1px solid #e5e7eb' }}>
                                {statePackages.map((pkg, index) => {
                                    const pkgType = getPackageType(pkg);
                                    const IconComponent = pkgType.icon;

                                    return (
                                        <tr key={pkg.id} style={{ borderTop: index === 0 ? 'none' : '1px solid #e5e7eb', transition: 'background-color 0.15s ease' }} className="hover:bg-gray-50">
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.375rem 0.75rem',
                                                    borderRadius: '0.375rem',
                                                    backgroundColor: pkgType.bgColor,
                                                    border: `1px solid ${pkgType.borderColor}`,
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    color: pkgType.color,
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    <IconComponent size={14} />
                                                    {pkgType.label}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#111827', fontWeight: 500 }}>
                                                <Link href={`/packages/${pkg.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    {pkg.title}
                                                </Link>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#6b7280' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Clock size={16} /> {pkg.duration}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#6b7280' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <Star size={16} fill="#FF7A18" stroke="#FF7A18" /> {pkg.rating} <span style={{ fontSize: '0.8em', color: '#9ca3af' }}>({pkg.reviews})</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#111827', fontWeight: 600 }}>
                                                ₹{pkg.price.toLocaleString('en-IN')}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <Link href={`/packages/${pkg.id}`} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', textDecoration: 'none' }}>
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '0.5rem', border: '1px dashed #e5e7eb' }}>
                        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>No specific highlight packages listed here currently.</p>
                        {state.website && (
                            <a href={state.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                Browse All on {state.name} Tourism <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
