// Utility to track page views for personalization
export function trackView(type, id) {
    if (typeof window === 'undefined') return;

    try {
        const history = JSON.parse(localStorage.getItem('viewHistory') || '[]');

        // Add new entry
        history.unshift({
            type, // 'state' or 'package'
            id,
            timestamp: Date.now()
        });

        // Keep only last 50 entries
        const trimmed = history.slice(0, 50);

        localStorage.setItem('viewHistory', JSON.stringify(trimmed));
    } catch (e) {
        console.error('Error tracking view:', e);
    }
}

export function getViewHistory() {
    if (typeof window === 'undefined') return [];

    try {
        return JSON.parse(localStorage.getItem('viewHistory') || '[]');
    } catch {
        return [];
    }
}
