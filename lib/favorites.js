// Favorites management utility
'use client';

const FAVORITES_KEY = 'incredbharat_favorites';

/**
 * Get all favorite package IDs from localStorage
 */
export function getFavorites() {
    if (typeof window === 'undefined') return [];

    try {
        const favorites = localStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error reading favorites:', error);
        return [];
    }
}

/**
 * Add a package to favorites
 */
export function addToFavorites(packageId) {
    if (typeof window === 'undefined') return false;

    try {
        const favorites = getFavorites();
        if (!favorites.includes(packageId)) {
            favorites.push(packageId);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
            // Dispatch custom event for same-tab updates
            window.dispatchEvent(new Event('favoritesChanged'));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return false;
    }
}

/**
 * Remove a package from favorites
 */
export function removeFromFavorites(packageId) {
    if (typeof window === 'undefined') return false;

    try {
        const favorites = getFavorites();
        const filtered = favorites.filter(id => id !== packageId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new Event('favoritesChanged'));
        return true;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return false;
    }
}

/**
 * Check if a package is in favorites
 */
export function isFavorite(packageId) {
    if (typeof window === 'undefined') return false;

    const favorites = getFavorites();
    return favorites.includes(packageId);
}

/**
 * Toggle favorite status of a package
 */
export function toggleFavorite(packageId) {
    if (isFavorite(packageId)) {
        removeFromFavorites(packageId);
        return false;
    } else {
        addToFavorites(packageId);
        return true;
    }
}

/**
 * Get count of favorites
 */
export function getFavoritesCount() {
    return getFavorites().length;
}

/**
 * Clear all favorites
 */
export function clearFavorites() {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.removeItem(FAVORITES_KEY);
        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new Event('favoritesChanged'));
        return true;
    } catch (error) {
        console.error('Error clearing favorites:', error);
        return false;
    }
}
