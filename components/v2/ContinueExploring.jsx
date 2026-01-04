'use client';

import { useEffect, useState } from 'react';
import StateCardV2 from './StateCardV2';
import { states, packages } from '../../lib/data';

export default function ContinueExploring() {
    const [recentStates, setRecentStates] = useState([]);

    useEffect(() => {
        const history = localStorage.getItem('viewHistory');
        if (history) {
            try {
                const parsed = JSON.parse(history);
                const stateIds = [...new Set(
                    parsed
                        .filter(item => item.type === 'state')
                        .map(item => item.id)
                )].slice(0, 4); // Reduced to 4 for mobile

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

    // Empty state
    if (recentStates.length === 0) {
        return (
            <section className="v2-continue-section">
                <h2 className="v2-section-title">Continue Exploring</h2>
                <div className="v2-empty-state">
                    <p>🗺️ Visit some states to see personalized recommendations</p>
                </div>

                <style jsx>{`
                    .v2-continue-section {
                        max-width: 1600px;
                        margin: 1.5rem auto;
                        padding: 0 1rem;
                    }

                    .v2-section-title {
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: #131921;
                        margin-bottom: 0.75rem;
                    }

                    .v2-empty-state {
                        background-color: #f3f4f6;
                        padding: 1.5rem;
                        border-radius: 0.5rem;
                        text-align: center;
                        border: 1px dashed #d1d5db;
                    }

                    .v2-empty-state p {
                        color: #6b7280;
                        font-size: 0.875rem;
                        margin: 0;
                    }

                    @media (max-width: 768px) {
                        .v2-continue-section {
                            margin: 1rem 0.5rem;
                            padding: 0;
                        }

                        .v2-section-title {
                            font-size: 1.125rem;
                            padding: 0 0.5rem;
                        }

                        .v2-empty-state {
                            padding: 1rem;
                            margin: 0 0.5rem;
                        }
                    }
                `}</style>
            </section>
        );
    }

    return (
        <section className="v2-continue-section">
            <div className="v2-section-header-row">
                <h2 className="v2-section-title">Continue Exploring</h2>
                <a href="#all-states" className="v2-section-link">View all</a>
            </div>

            <div className="v2-card-grid">
                {recentStates.map(({ state, count }) => (
                    <StateCardV2
                        key={state.id}
                        state={state}
                        packageCount={count}
                        compact={true}
                    />
                ))}
            </div>

            <style jsx>{`
                .v2-continue-section {
                    max-width: 1600px;
                    margin: 1.5rem auto;
                    padding: 0 1.5rem;
                }

                .v2-section-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;
                }

                .v2-section-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #131921;
                }

                .v2-section-link {
                    color: #007185;
                    font-size: 0.8rem;
                    font-weight: 500;
                    text-decoration: none;
                }

                .v2-card-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                }

                @media (max-width: 1024px) {
                    .v2-card-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .v2-continue-section {
                        margin: 1rem 0;
                        padding: 0 0.75rem;
                    }

                    .v2-section-title {
                        font-size: 1.125rem;
                    }

                    .v2-card-grid {
                        grid-template-columns: 1fr;
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </section>
    );
}
