'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Mountain, Church, Waves, Castle, Ship, Sun } from 'lucide-react';

export default function CategoryStrip() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category');

    const categories = [
        { id: 'Hill Stations', name: 'Hill Stations', icon: Mountain },
        { id: 'Pilgrimage', name: 'Pilgrimage', icon: Church },
        { id: 'Beaches', name: 'Beaches & Islands', icon: Waves },
        { id: 'Heritage', name: 'Heritage & Culture', icon: Castle },
        { id: 'Backwaters', name: 'Backwaters', icon: Ship },
        { id: 'Deserts', name: 'Deserts & Royalty', icon: Sun }
    ];

    const handleClick = (categoryId) => {
        if (activeCategory === categoryId) {
            router.push('/packages'); // Deselect
        } else {
            router.push(`/packages?category=${encodeURIComponent(categoryId)}`);
        }
    };

    return (
        <div style={{
            position: 'sticky',
            top: '80px', // Matches new Navbar height
            zIndex: 40,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
            <div className="container" style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0.75rem 1rem',
                overflowX: 'auto',
                display: 'flex',
                gap: '0.75rem',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none',  // IE/Edge
                WebkitOverflowScrolling: 'touch'
            }}>
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => handleClick(category.id)}
                            className="hover-lift"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.4rem 1rem',
                                backgroundColor: isActive ? '#FF7A18' : 'white', // Sunset Orange active
                                color: isActive ? 'white' : '#4b5563',
                                border: isActive ? '1px solid #FF7A18' : '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '2rem',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                flexShrink: 0,
                                boxShadow: isActive ? '0 2px 8px rgba(255, 122, 24, 0.3)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                    e.currentTarget.style.borderColor = '#d1d5db';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
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
