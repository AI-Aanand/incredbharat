'use client';

import { useEffect, useState } from 'react';
import StateCardV2 from './StateCardV2';
import { states, packages } from '../../lib/data';

export default function ContinueExploring() {
    const [recentStates, setRecentStates] = useState([]);

    useEffect(() => {
        // Get viewing history from localStorage
        const history = localStorage.getItem('viewHistory');
        if (history) {
            try {
                const parsed = JSON.parse(history);
                // Get last 6 unique state IDs
                const stateIds = [...new Set(
                    parsed
                        .filter(item => item.type === 'state')
                        .map(item => item.id)
                )].slice(0, 6);

                // Map to state objects with package counts
                const statesWithCounts = stateIds.map(id => {
                    const state = states.find(s => s.id === id);
                    const count = packages.filter(p => p.stateId === id).length;
                    return { state, count };
                }).filter(item => item.state);

                setRecentStates(statesWithCounts);
            } catch (e) {
                console.error('Error parsing view history:', e);
            }
        }
    }, []);

    // Don't show section if no history
    if (recentStates.length === 0) {
        return (
            <section style={{
                maxWidth: '1600px',
                margin: '3rem auto',
                padding: '0 2rem'
            }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#131921',
                    marginBottom: '1rem'
                }}>
                    Continue Exploring
                </h2>
                <div style={{
                    backgroundColor: '#f3f4f6',
                    padding: '2.5rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    border: '1px dashed #d1d5db'
                }}>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '0.95rem',
                        margin: 0
                    }}>
                        🗺️ Visit some states to see personalized recommendations here
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section style={{
            maxWidth: '1600px',
            margin: '3rem auto',
            padding: '0 2rem'
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
                    Continue Exploring
                </h2>
                <a href="#all-states" style={{
                    color: '#007185',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none'
                }}>
                    View all states
                </a>
            </div>
            <p style={{
                color: '#6b7280',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
            }}>
                Pick up where you left off
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.25rem'
            }}>
                {recentStates.map(({ state, count }) => (
                    <StateCardV2
                        key={state.id}
                        state={state}
                        packageCount={count}
                        compact={true}
                    />
                ))}
            </div>
        </section>
    );
}
