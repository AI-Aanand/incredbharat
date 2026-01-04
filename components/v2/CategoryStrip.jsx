'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Mountain, Church, Waves, Castle, Ship, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

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
            position: 'fixed',
            top: '128px', // navbar (120px) + 8px gap
            left: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: '#0a3a5c', // Darker Ocean Blue
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
                                backgroundColor: isActive ? '#FF7A18' : 'transparent', // Sunset Orange
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
                                    e.currentTarget.style.backgroundColor = '#1B9AAA'; // Travel Teal hover
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
