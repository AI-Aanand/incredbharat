
import { states, packages } from '../lib/data.js';

console.log(`Total States: ${states.length}`);
console.log(`Total Packages: ${packages.length}`);

const stateIds = states.map(s => s.id);
const packageStateIds = new Set(packages.map(p => p.stateId));

const missingStates = stateIds.filter(id => !packageStateIds.has(id));

if (missingStates.length > 0) {
    console.error('❌ States without packages:', missingStates);
    process.exit(1);
} else {
    console.log('✅ All states have at least one package.');
    process.exit(0);
}
