import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { states } from '../lib/data';
import OptimizedImage from './OptimizedImage';

export default function DestinationList() {
    const featuredStates = states.filter(s => s.popular).slice(0, 4);

    return (
        <section style={{ padding: '5rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Popular Destinations</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Must-visit states curated for you.</p>
                    </div>
                    <Link href="/destinations" style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontWeight: 600 }}>
                        View All <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {featuredStates.map(state => (
                        <Link key={state.id} href={`/states/${state.id}`} className="card" style={{ display: 'block' }}>
                            <div style={{ position: 'relative', height: '240px' }}>
                                <OptimizedImage
                                    src={state.image}
                                    alt={state.name}
                                    width={400}
                                    height={240}
                                    isAIGenerated={state.isAIGenerated}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                                    pointerEvents: 'none'
                                }}></div>
                                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: 'white' }}>
                                    <h3 style={{ color: 'white', marginBottom: '0.25rem', fontSize: '1.5rem' }}>{state.name}</h3>
                                    <p style={{ fontSize: '0.875rem', opacity: 0.9, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {state.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
