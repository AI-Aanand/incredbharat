const fs = require('fs');
const path = require('path');

// Read the data.js file
const dataPath = path.join(__dirname, '../lib/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Function to determine organizer based on title
function getOrganizer(title, description) {
    if (title.includes('KTDC')) return 'KTDC';
    if (title.includes('RTDC')) return 'RTDC';
    if (title.includes('GTDC')) return 'GTDC';
    if (title.includes('MTDC')) return 'MTDC';
    if (title.includes('KSTDC')) return 'KSTDC';
    if (title.includes('OTDC')) return 'OTDC';
    if (title.includes('WBTDC')) return 'WBTDC';
    if (title.includes('DTTDC') || title.includes('DTC') || title.includes('Delhi Darshan')) return 'DTTDC';
    if (title.includes('JKTDC')) return 'JKTDC';
    if (title.includes('APTDC')) return 'APTDC';
    if (title.includes('IRCTC') || description?.includes('IRCTC')) return 'IRCTC';
    return 'Private';
}

// Function to determine transport mode based on title and description
function getTransportMode(title, description, organizer) {
    if (organizer === 'IRCTC') {
        if (title.toLowerCase().includes('rail') || description?.toLowerCase().includes('train')) return 'rail';
        if (title.toLowerCase().includes('mixed') || description?.toLowerCase().includes('train and')) return 'mixed';
        return 'rail'; // Default for IRCTC
    }
    if (title.toLowerCase().includes('bike') || title.toLowerCase().includes('motorcycle')) return 'road';
    if (title.toLowerCase().includes('flight') || title.toLowerCase().includes('air')) return 'air';
    if (organizer !== 'Private') return 'road'; // State tourism default
    return 'road'; // Default
}

// Function to determine if subsidized
function isSubsidized(price, description) {
    // Heavily discounted packages (below specific thresholds) or those with "subsidy" in description
    if (description?.toLowerCase().includes('subsidy') || description?.toLowerCase().includes('subsidized')) return true;
    if (description?.toLowerCase().includes('govt') && price < 5000) return true;
    return false;
}

// Process packages
const packageRegex = /(\{[\s\S]*?id: ['"]([^'"]+)['"],[\s\S]*?title: ['"]([^'"]+)['"],[\s\S]*?description: ['"]([^'"]+)['"],[\s\S]*?amenities: \[[^\]]+\],)([\s\S]*?)(images: \[[\s\S]*?\][\s\S]*?\})/g;

let match;
let updatedContent = content;
let updateCount = 0;

while ((match = packageRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const beforeAmenities = match[1];
    const id = match[2];
    const title = match[3];
    const description = match[4];
    const middlePart = match[5];
    const afterAmenities = match[6];

    // Check if already has metadata
    if (middlePart.includes('organizer:') || middlePart.includes('transportMode:') || middlePart.includes('isSubsidized:')) {
        continue; // Skip packages that already have metadata
    }

    const organizer = getOrganizer(title, description);
    const transportMode = getTransportMode(title, description, organizer);
    const priceMatch = middlePart.match(/price: (\d+)/);
    const price = priceMatch ? parseInt(priceMatch[1]) : 0;
    const subsidized = isSubsidized(price, description);

    // Build new metadata
    const metadata = `\n        organizer: '${organizer}',\n        transportMode: '${transportMode}',\n        isSubsidized: ${subsidized},`;

    // Insert metadata after amenities
    const updated = beforeAmenities + metadata + '\n       ' + afterAmenities;

    updatedContent = updatedContent.replace(fullMatch, updated);
    updateCount++;

    console.log(`Updated: ${id} - ${title}`);
    console.log(`  Organizer: ${organizer}, Transport: ${transportMode}, Subsidized: ${subsidized}`);
}

// Write back
fs.writeFileSync(dataPath, updatedContent, 'utf8');
console.log(`\nTotal packages updated: ${updateCount}`);
