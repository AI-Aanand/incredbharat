const { states, packages } = require('../lib/data.js');

// Count packages per state
const statePackageCounts = {};
states.forEach(s => statePackageCounts[s.id] = 0);
packages.forEach(p => {
    if (statePackageCounts[p.stateId] !== undefined) {
        statePackageCounts[p.stateId]++;
    }
});

// Separate states with and without packages
const withPackages = Object.entries(statePackageCounts)
    .filter(([k, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => {
        const state = states.find(s => s.id === id);
        return { id, name: state?.name || id, count };
    });

const withoutPackages = Object.entries(statePackageCounts)
    .filter(([k, v]) => v === 0)
    .map(([id]) => {
        const state = states.find(s => s.id === id);
        return { id, name: state?.name || id };
    });

console.log('=== PACKAGE COVERAGE ANALYSIS ===\n');
console.log(`Total States/UTs: ${states.length}`);
console.log(`States WITH Packages: ${withPackages.length}`);
console.log(`States WITHOUT Packages: ${withoutPackages.length}`);
console.log(`Total Packages: ${packages.length}\n`);

console.log('=== STATES WITH PACKAGES (Sorted by count) ===');
withPackages.forEach(({ id, name, count }) => {
    console.log(`${name.padEnd(40)} : ${count} packages`);
});

console.log('\n=== STATES WITHOUT ANY PACKAGES ===');
withoutPackages.forEach(({ id, name }) => {
    console.log(`- ${name} (${id})`);
});

// Package type breakdown
console.log('\n=== PACKAGE TYPE BREAKDOWN ===');
const organizers = {};
packages.forEach(p => {
    organizers[p.organizer] = (organizers[p.organizer] || 0) + 1;
});
Object.entries(organizers).sort((a, b) => b[1] - a[1]).forEach(([org, count]) => {
    console.log(`${org.padEnd(20)} : ${count} packages`);
});

// Transport mode breakdown
console.log('\n=== TRANSPORT MODE BREAKDOWN ===');
const transportModes = {};
packages.forEach(p => {
    transportModes[p.transportMode] = (transportModes[p.transportMode] || 0) + 1;
});
Object.entries(transportModes).sort((a, b) => b[1] - a[1]).forEach(([mode, count]) => {
    console.log(`${mode.padEnd(20)} : ${count} packages`);
});

// Subsidized packages
const subsidized = packages.filter(p => p.isSubsidized).length;
console.log('\n=== SUBSIDY STATUS ===');
console.log(`Subsidized Packages: ${subsidized}`);
console.log(`Non-Subsidized Packages: ${packages.length - subsidized}`);
