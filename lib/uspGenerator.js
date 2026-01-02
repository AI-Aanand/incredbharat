// Utility function to generate USPs from package data
export function generateUSPs(pkg) {
    const usps = [];

    // USP 1: Target audience based on package type
    if (pkg.title.toLowerCase().includes('honeymoon')) {
        usps.push('Ideal for couples & honeymooners');
    } else if (pkg.title.toLowerCase().includes('family')) {
        usps.push('Perfect for family vacations');
    } else if (pkg.organizer && pkg.organizer !== 'Private') {
        usps.push('Government-assured quality stays');
    } else if (pkg.price < 15000) {
        usps.push('Budget-friendly for all travelers');
    } else if (pkg.price > 40000) {
        usps.push('Premium luxury experience');
    } else {
        usps.push('Great for leisure travelers');
    }

    // USP 2: Key inclusion based on amenities/organizer
    if (pkg.organizer === 'IRCTC') {
        usps.push('All-inclusive train journey');
    } else if (pkg.organizer && pkg.organizer !== 'Private') {
        usps.push(`${pkg.organizer} hotels & complete transfers`);
    } else if (pkg.amenities && pkg.amenities.length > 0) {
        const key = pkg.amenities[0];
        usps.push(`Includes ${key.toLowerCase()}`);
    } else {
        usps.push('Complete package with sightseeing');
    }

    // USP 3: Unique highlight based on title/description
    if (pkg.title.toLowerCase().includes('spiti') || pkg.title.toLowerCase().includes('adventure')) {
        usps.push('Thrilling offbeat adventure');
    } else if (pkg.title.toLowerCase().includes('luxury') || pkg.title.toLowerCase().includes('palace')) {
        usps.push('Heritage luxury at its finest');
    } else if (pkg.title.toLowerCase().includes('darshan') || pkg.title.toLowerCase().includes('pilgrimage')) {
        usps.push('Spiritual journey with guidance');
    } else if (pkg.title.toLowerCase().includes('houseboat') || pkg.title.toLowerCase().includes('backwaters')) {
        usps.push('Unique houseboat experience');
    } else if (pkg.title.toLowerCase().includes('safari') || pkg.title.toLowerCase().includes('wildlife')) {
        usps.push('Wildlife spotting adventures');
    } else if (pkg.isSubsidized) {
        usps.push('Special govt-subsidized benefits');
    } else if (pkg.duration && pkg.duration.includes('1 Day')) {
        usps.push('Quick day trip perfect for weekends');
    } else {
        usps.push('Multi-day immersive experience');
    }

    return usps.slice(0, 3); // Return max 3 USPs
}
