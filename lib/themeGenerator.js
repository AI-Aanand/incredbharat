
export function generateThemes(pkg) {
    const themes = [];
    const text = `${pkg.title} ${pkg.description} ${(pkg.amenities || []).join(' ')}`.toLowerCase();

    // Adventure
    if (text.includes('trek') || text.includes('hike') || text.includes('camping') || text.includes('safari') || text.includes('rafting') || text.includes('adventure')) {
        themes.push('Adventure');
    }

    // Heritage / Culture
    if (text.includes('heritage') || text.includes('history') || text.includes('museum') || text.includes('ancient') || text.includes('culture') || text.includes('temple') || text.includes('palace')) {
        themes.push('Heritage');
    }

    // Nature / Wildlife
    if (text.includes('wildlife') || text.includes('forest') || text.includes('jungle') || text.includes('nature') || text.includes('park') || text.includes('hill station')) {
        themes.push('Nature');
    }

    // Pilgrimage / Spiritual
    if (text.includes('pilgrimage') || text.includes('darshan') || text.includes('shrine') || text.includes('spiritual') || text.includes('divine')) {
        themes.push('Spiritual');
    }

    // Wellness / Relax
    if (text.includes('wellness') || text.includes('spa') || text.includes('ayurveda') || text.includes('relax') || text.includes('beach') || text.includes('resort')) {
        themes.push('Wellness');
    }

    // Romantic / Honeymoon
    if (text.includes('honeymoon') || text.includes('couple') || text.includes('romantic')) {
        themes.push('Romantic');
    }

    return [...new Set(themes)].slice(0, 3); // Max 3 themes
}
