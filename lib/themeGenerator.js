
export function generateThemes(pkg) {
    const themes = [];
    const text = `${pkg.title} ${pkg.description} ${(pkg.amenities || []).join(' ')}`.toLowerCase();

    // Adventure
    if (text.includes('trek') || text.includes('hike') || text.includes('camping') || text.includes('safari') || text.includes('rafting') || text.includes('adventure')) {
        themes.push('Adventure');
    }

    // Heritage / Culture
    if (text.includes('heritage') || text.includes('history') || text.includes('museum') || text.includes('ancient') || text.includes('culture') || text.includes('temple') || text.includes('palace') || text.includes('fort')) {
        themes.push('Heritage');
    }

    // Nature / Hill Stations
    if (text.includes('wildlife') || text.includes('forest') || text.includes('jungle') || text.includes('nature') || text.includes('park')) {
        themes.push('Nature');
    }
    if (text.includes('hill station') || text.includes('mountain') || text.includes('valley') || text.includes('peak')) {
        themes.push('Hill Stations');
    }

    // Pilgrimage / Spiritual
    if (text.includes('pilgrimage') || text.includes('darshan') || text.includes('shrine') || text.includes('spiritual') || text.includes('divine') || text.includes('temple')) {
        themes.push('Pilgrimage');
    }

    // Beaches / Backwaters
    if (text.includes('beach') || text.includes('island') || text.includes('sea') || text.includes('ocean')) {
        themes.push('Beaches');
    }
    if (text.includes('backwater') || text.includes('houseboat') || text.includes('lake') || text.includes('boat')) {
        themes.push('Backwaters');
    }

    // Deserts
    if (text.includes('desert') || text.includes('sand') || text.includes('camel') || text.includes('dune')) {
        themes.push('Deserts');
    }

    // Wellness / Relax
    if (text.includes('wellness') || text.includes('spa') || text.includes('ayurveda') || text.includes('relax') || text.includes('resort')) {
        themes.push('Wellness');
    }

    // Romantic / Honeymoon
    if (text.includes('honeymoon') || text.includes('couple') || text.includes('romantic')) {
        themes.push('Romantic');
    }

    return [...new Set(themes)].slice(0, 3); // Max 3 themes
}
