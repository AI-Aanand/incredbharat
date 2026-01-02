'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

const STORAGE_KEY = 'incredbharat_compare';
const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        // Load from localStorage on mount
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setCompareList(JSON.parse(stored));
            } catch (e) {
                setCompareList([]);
            }
        }
    }, []);

    useEffect(() => {
        // Save to localStorage on change
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
        // Dispatch custom event for cross-component sync
        window.dispatchEvent(new CustomEvent('compareChanged'));
    }, [compareList]);

    const addToCompare = (packageId) => {
        if (compareList.length >= MAX_COMPARE) {
            alert(`You can compare up to ${MAX_COMPARE} packages at a time. Remove one to add another.`);
            return false;
        }
        if (!compareList.includes(packageId)) {
            setCompareList([...compareList, packageId]);
            return true;
        }
        return false;
    };

    const removeFromCompare = (packageId) => {
        setCompareList(compareList.filter(id => id !== packageId));
    };

    const isInCompare = (packageId) => {
        return compareList.includes(packageId);
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    const toggleCompare = (packageId) => {
        if (isInCompare(packageId)) {
            removeFromCompare(packageId);
            return false;
        } else {
            return addToCompare(packageId);
        }
    };

    return (
        <CompareContext.Provider value={{
            compareList,
            addToCompare,
            removeFromCompare,
            isInCompare,
            clearCompare,
            toggleCompare,
            maxCompare: MAX_COMPARE
        }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}

// Standalone functions for use outside React components
export function getCompareList() {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function getCompareCount() {
    return getCompareList().length;
}
