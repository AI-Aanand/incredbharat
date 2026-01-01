'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isFavorite, toggleFavorite } from '../lib/favorites';

export default function FavoriteButton({ packageId, size = 24, className = '' }) {
    const [favorite, setFavorite] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setFavorite(isFavorite(packageId));
    }, [packageId]);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newState = toggleFavorite(packageId);
        setFavorite(newState);

        // Trigger animation
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

    return (
        <button
            onClick={handleClick}
            className={`favorite-btn ${className}`}
            style={{
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: `${size + 16}px`,
                height: `${size + 16}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease',
                transform: animate ? 'scale(1.2)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
            }}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart
                size={size}
                fill={favorite ? '#FF0000' : 'none'}
                stroke={favorite ? '#FF0000' : '#6b7280'}
                strokeWidth={2}
            />
        </button>
    );
}
