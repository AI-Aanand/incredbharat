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
        <section className="v2-popular-section">
            <div className="v2-section-header-row">
                <h2 className="v2-section-title">Popular States This Season</h2>
                <a href="/packages" className="v2-section-link">See all packages →</a>
            </div>
            <p className="v2-section-subtitle">
                Trending destinations with government-verified tour packages
            </p>

            <div className="v2-card-grid">
                {popularStates.map(({ state, count }) => (
                    <StateCardV2
                        key={state.id}
                        state={state}
                        packageCount={count}
                    />
                ))}
            </div>

            <style jsx>{`
                .v2-popular-section {
                    max-width: 1600px;
                    margin: 2rem auto;
                    padding: 2rem;
                    background-color: #f9fafb;
                    border-radius: 0.75rem;
                }

                .v2-section-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .v2-section-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #131921;
                }

                .v2-section-link {
                    color: #007185;
                    font-size: 0.875rem;
                    font-weight: 500;
                    text-decoration: none;
                }

                .v2-section-subtitle {
                    color: #6b7280;
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                }

                .v2-card-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                }

                /* Tablet */
                @media (max-width: 1024px) {
                    .v2-card-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                /* Mobile */
                @media (max-width: 768px) {
                    .v2-popular-section {
                        margin: 1rem;
                        padding: 1rem;
                        border-radius: 0.5rem;
                    }

                    .v2-section-title {
                        font-size: 1.25rem;
                    }

                    .v2-section-subtitle {
                        font-size: 0.8rem;
                        margin-bottom: 1rem;
                    }

                    .v2-card-grid {
                        grid-template-columns: 1fr;
                        gap: 0.75rem;
                    }
                }

                /* Small Mobile */
                @media (max-width: 480px) {
                    .v2-popular-section {
                        margin: 0.5rem;
                        padding: 0.875rem;
                    }

                    .v2-section-title {
                        font-size: 1.125rem;
                    }
                }
            `}</style>
        </section>
    );
}
