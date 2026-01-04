import React from 'react';
import HeroV2 from '../components/v2/HeroV2';
import ContinueExploring from '../components/v2/ContinueExploring';
import PopularStates from '../components/v2/PopularStates';
import ExploreByRegion from '../components/v2/ExploreByRegion';
import '../app/v2/v2.css'; // Ensure V2 styles are loaded

export default function Home() {
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
                <div style={{
                    height: '600px',
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden'
                }}>
                    <iframe
                        src="/map-embed.html"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Interactive India Map"
                    />
                </div>
            </section>

            {/* Beta Badge */}
            <div className="v2-beta-badge">
                ✨ Official v2
            </div>

            <style jsx>{`
                .v2-map-section {
                    max-width: 1600px;
                    margin: 0 auto 3rem;
                    padding: 0 1rem;
                }
                
                @media (max-width: 768px) {
                    .v2-hide-mobile {
                        display: none;
                    }
                }
            `}</style>
        </div>
    )
}
