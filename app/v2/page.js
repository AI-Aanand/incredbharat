import HeroV2 from '../../components/v2/HeroV2';
import ContinueExploring from '../../components/v2/ContinueExploring';
import PopularStates from '../../components/v2/PopularStates';
import ExploreByRegion from '../../components/v2/ExploreByRegion';
import StateCardsGrid from '../../components/StateCardsGrid';
import IndiaMap from '../../components/IndiaMap';

export const metadata = {
    title: 'IncredBharat v2 - New Experience',
    description: 'Experience our redesigned tourism package discovery platform'
};

export default function HomeV2() {
    return (
        <div style={{ paddingBottom: '4rem' }}>
            <HeroV2 />

            {/* Continue Exploring - Personalized */}
            <ContinueExploring />

            {/* Popular States */}
            <PopularStates />

            {/* Explore by Region */}
            <ExploreByRegion />

            {/* All States Grid */}
            <section id="all-states" style={{
                maxWidth: '1600px',
                margin: '3rem auto',
                padding: '0 2rem'
            }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#131921',
                    marginBottom: '1.5rem'
                }}>
                    All States & Union Territories
                </h2>
                <StateCardsGrid />
            </section>

            {/* Explore by Map */}
            <section style={{
                maxWidth: '1600px',
                margin: '3rem auto',
                padding: '0 2rem'
            }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#131921',
                    marginBottom: '1.5rem'
                }}>
                    Interactive Map
                </h2>
                <p style={{
                    color: '#6b7280',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                }}>
                    Click on any state to explore tour packages
                </p>
                <IndiaMap />
            </section>

            {/* Beta Badge */}
            <div style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: '#FF9933',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                fontSize: '0.875rem',
                fontWeight: 600,
                zIndex: 1000
            }}>
                ✨ v2 Preview
            </div>
        </div>
    );
}
