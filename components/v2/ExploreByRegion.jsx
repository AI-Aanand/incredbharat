'use client';

import Link from 'next/link';
import { states, packages } from '../../lib/data';
import { ChevronRight } from 'lucide-react';

export default function ExploreByRegion() {
    const regions = {
        north: {
            name: 'North India',
            states: ['himachal-pradesh', 'jammu-kashmir', 'ladakh', 'punjab', 'uttarakhand', 'delhi']
        },
        south: {
            name: 'South India',
            states: ['kerala', 'tamil-nadu', 'karnataka', 'andhra-pradesh', 'telangana']
        },
        west: {
            name: 'West India',
            states: ['rajasthan', 'gujarat', 'maharashtra', 'goa']
        },
        east: {
            name: 'East & Northeast',
            states: ['west-bengal', 'odisha', 'assam', 'sikkim', 'meghalaya']
        }
    };

    const getRegionStats = (regionId) => {
        const stateIds = regions[regionId].states;
        const stateCount = stateIds.filter(id => states.find(s => s.id === id)).length;
        const packageCount = stateIds.reduce((acc, id) => {
            return acc + packages.filter(p => p.stateId === id).length;
        }, 0);
        return { stateCount, packageCount };
    };

    return (
        <section className="v2-region-section">
            <h2 className="v2-section-title">Explore by Region</h2>

            <div className="v2-region-grid">
                {Object.entries(regions).map(([regionId, region]) => {
                    const stats = getRegionStats(regionId);
                    return (
                        <Link
                            key={regionId}
                            href={`/packages?region=${regionId}`}
                            className="v2-region-card"
                        >
                            <div className="v2-region-content">
                                <h3 className="v2-region-name">{region.name}</h3>
                                <p className="v2-region-stats">
                                    {stats.stateCount} states • {stats.packageCount} packages
                                </p>
                            </div>
                            <ChevronRight size={20} className="v2-region-arrow" />
                        </Link>
                    );
                })}
            </div>

            <style jsx>{`
                .v2-region-section {
                    max-width: 1600px;
                    margin: 1.5rem auto;
                    padding: 0 1.5rem;
                }

                .v2-section-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #131921;
                    margin-bottom: 1rem;
                }

                .v2-region-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                }

                .v2-region-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem;
                    background-color: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .v2-region-card:hover {
                    border-color: #FF9933;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .v2-region-name {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #131921;
                    margin-bottom: 0.25rem;
                }

                .v2-region-stats {
                    font-size: 0.75rem;
                    color: #6b7280;
                    margin: 0;
                }

                :global(.v2-region-arrow) {
                    color: #9ca3af;
                    flex-shrink: 0;
                }

                @media (max-width: 1024px) {
                    .v2-region-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .v2-region-section {
                        margin: 1rem 0;
                        padding: 0 0.75rem;
                    }

                    .v2-section-title {
                        font-size: 1.125rem;
                    }

                    .v2-region-grid {
                        grid-template-columns: 1fr;
                        gap: 0.5rem;
                    }

                    .v2-region-card {
                        padding: 0.875rem;
                    }

                    .v2-region-name {
                        font-size: 0.95rem;
                    }
                }

                @media (max-width: 480px) {
                    .v2-region-card {
                        padding: 0.75rem;
                    }

                    .v2-region-name {
                        font-size: 0.875rem;
                    }

                    .v2-region-stats {
                        font-size: 0.7rem;
                    }
                }
            `}</style>
        </section>
    );
}
