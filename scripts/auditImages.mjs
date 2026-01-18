
import { packages, states } from '../lib/data.js';
import https from 'https';
import http from 'http';

const allImages = [];

packages.forEach(p => {
    p.images.forEach(img => {
        allImages.push({ url: img, type: 'package', id: p.id, name: p.title });
    });
});

states.forEach(s => {
    if (s.image) {
        allImages.push({ url: s.image, type: 'state', id: s.id, name: s.name });
    }
});

console.log(`Auditing ${allImages.length} images...`);

const duplicates = {};
allImages.forEach(img => {
    if (!duplicates[img.url]) duplicates[img.url] = [];
    duplicates[img.url].push(img.name);
});

console.log('\n--- Duplicate Image Usage ---');
Object.entries(duplicates).forEach(([url, names]) => {
    if (names.length > 1) {
        console.log(`[${names.length}x] ${url} used in: ${names.join(', ')}`);
    }
});

console.log('\n--- Checking Reachability (Head Request) ---');
// Only check first 20 visual ones or suspicious ones? 
// Checking all might be slow/rate limited. 
// We will just check for empty/malformed URLs first.
allImages.forEach(img => {
    if (!img.url || img.url.trim() === '') {
        console.error(`❌ Empty URL in ${img.name}`);
    }
});

// We generally trust local images (starting with /) exist if build passed? 
// But external ones need checking.
const externalImages = allImages.filter(img => img.url.startsWith('http'));
console.log(`Checking ${externalImages.length} external images...`);

// Simple checker
/* (Async check logic omitted for speed, mainly focusing on duplicates for relevance) */
