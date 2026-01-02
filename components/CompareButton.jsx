'use client';

import { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import { getCompareList, getCompareCount } from '../lib/compare';

export default function CompareButton({ packageId, size = 20 }) {
    const [isCompare, setIsCompare] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            const list = getCompareList();
            setIsCompare(list.includes(packageId));
        };
        checkStatus();

        window.addEventListener('compareChanged', checkStatus);
        return () => window.removeEventListener('compareChanged', checkStatus);
    }, [packageId]);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const list = getCompareList();
        let newList;

        if (list.includes(packageId)) {
            newList = list.filter(id => id !== packageId);
            setIsCompare(false);
        } else {
            if (list.length >= 3) {
                alert('You can compare up to 3 packages. Remove one to add another.');
                return;
            }
            newList = [...list, packageId];
            setIsCompare(true);
        }

        localStorage.setItem('incredbharat_compare', JSON.stringify(newList));
        window.dispatchEvent(new CustomEvent('compareChanged'));

        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

    return (
        <button
            onClick={handleClick}
            title={isCompare ? 'Remove from compare' : 'Add to compare'}
            style={{
                background: isCompare ? '#000080' : 'white',
                border: isCompare ? '2px solid #000080' : '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                width: `${size + 16}px`,
                height: `${size + 16}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                transform: animate ? 'scale(1.2)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
                if (!isCompare) {
                    e.currentTarget.style.borderColor = '#000080';
                }
            }}
            onMouseLeave={(e) => {
                if (!isCompare) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                }
            }}
            aria-label={isCompare ? 'Remove from compare' : 'Add to compare'}
        >
            <Scale
                size={size}
                color={isCompare ? 'white' : '#6b7280'}
                strokeWidth={2}
            />
        </button>
    );
}
