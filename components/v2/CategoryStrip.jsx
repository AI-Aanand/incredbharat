'use client';

import { Mountain, Church, Waves, Castle, Ship, Sun } from 'lucide-react';
import { useState } from 'react';

export default function CategoryStrip({ onCategorySelect }) {
    const [activeCategory, setActiveCategory] = useState(null);

    const categories = [
        { id: 'hill-stations', name: 'Hill Stations', icon: Mountain },
        { id: 'pilgrimage', name: 'Pilgrimage', icon: Church },
        { id: 'beaches', name: 'Beaches & Islands', icon: Waves },
        { id: 'heritage', name: 'Heritage & Culture', icon: Castle },
        { id: 'backwaters', name: 'Backwaters', icon: Ship },
        { id: 'deserts', name: 'Deserts & Royalty', icon: Sun }
    ];

    const handleClick = (categoryId) => {
        const newActive = activeCategory === categoryId ? null : categoryId;
        setActiveCategory(newActive);
        if (onCategorySelect) {
            onCategorySelect(newActive);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '128px', // navbar (120px) + 8px gap
            left: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: '#232F3E',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                overflowX: 'auto',
                display: 'flex',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none'  // IE/Edge
            }}>
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => handleClick(category.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: isActive ? '#FF9933' : 'transparent',
                                color: 'white',
                                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '1.5rem',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <Icon size={16} />
                            {category.name}
                        </button>
                    );
                })}
            </div>

            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
