'use client';

import HeroV2 from '../../components/v2/HeroV2';
import ContinueExploring from '../../components/v2/ContinueExploring';
import PopularStates from '../../components/v2/PopularStates';
import ExploreByRegion from '../../components/v2/ExploreByRegion';
import IndiaMap from '../../components/IndiaMap';


export default function HomeV2() {
    return (
        <div className="v2-homepage">
            <HeroV2 />

            {/* Continue Exploring - Personalized */}
            <ContinueExploring />

            {/* Popular States */}
            <PopularStates />

            {/* Explore by Region */}
            <ExploreByRegion />

            {/* Interactive Map - Hidden on Mobile */}
            <section className="v2-map-section v2-hide-mobile">
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#2E2E2E',
                    marginBottom: '1rem'
                }}>
                    Interactive Map
                </h2>
                <p style={{
                    color: '#6b7280',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                }}>
                    Click on any state to explore tour packages
                </p>
                <IndiaMap />
            </section>

            {/* Beta Badge */}
            <div className="v2-beta-badge">
                ✨ v2 Preview
            </div>

            <style jsx>{`
                .v2-homepage {
                    padding-bottom: 3rem;
                }

                .v2-map-section {
                    max-width: 1600px;
                    margin: 2rem auto;
                    padding: 0 1.5rem;
                }

                .v2-beta-badge {
                    position: fixed;
                    bottom: 1rem;
                    right: 1rem;
                    background-color: #FF7A18;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    font-size: 0.75rem;
                    font-weight: 600;
                    z-index: 1000;
                }

                .v2-hide-mobile {
                    display: block;
                }

                @media (max-width: 768px) {
                    .v2-homepage {
                        padding-bottom: 2rem;
                    }

                    .v2-hide-mobile {
                        display: none !important;
                    }

                    .v2-beta-badge {
                        bottom: 0.5rem;
                        right: 0.5rem;
                        padding: 0.375rem 0.75rem;
                        font-size: 0.7rem;
                    }
                }
            `}</style>
        </div>
    );
}
