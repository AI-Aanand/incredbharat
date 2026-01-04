'use client';

import StateCardV2 from './StateCardV2';
import { states, packages } from '../../lib/data';

export default function PopularStates() {
    // Get states with most packages or marked as popular
    const popularStates = states
        .map(state => ({
            state,
            count: packages.filter(p => p.stateId === state.id).length
        }))
        .filter(item => item.count > 0)
        .sort((a, b) => {
            // Prioritize marked popular states, then by package count
            if (a.state.popular && !b.state.popular) return -1;
            if (!a.state.popular && b.state.popular) return 1;
            return b.count - a.count;
        })
        .slice(0, 8); // Top 8

    return (
        <section style={{
            maxWidth: '1600px',
            margin: '3rem auto',
            padding: '0 2rem',
            backgroundColor: '#f9fafb',
            padding: '3rem 2rem',
            borderRadius: '0.75rem'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#131921'
                }}>
                    Popular States This Season
                </h2>
                <a href="/packages" style={{
                    color: '#007185',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none'
                }}>
                    See all packages →
                </a>
            </div>
            <p style={{
                color: '#6b7280',
                marginBottom: '2rem',
                fontSize: '0.95rem'
            }}>
                Trending destinations with government-verified tour packages
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.5rem'
            }}>
                {popularStates.map(({ state, count }) => (
                    <StateCardV2
                        key={state.id}
                        state={state}
                        packageCount={count}
                    />
                ))}
            </div>
        </section>
    );
}
