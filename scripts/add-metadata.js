// Bulk metadata updater for packages
const fs = require('fs');
const path = require('path');

// Define metadata rules based on package ID patterns and descriptions
const metadataRules = [
    // Kerala KTDC packages
    { pattern: /^ktdc-/, organizer: 'KTDC', transportMode: 'road', isSubsidized: (pkg) => pkg.id === 'ktdc-natures-charm' },

    // Rajasthan RTDC packages
    { pattern: /^rtdc-/, organizer: 'RTDC', transportMode: 'road', isSubsidized: false },

    // Goa GTDC packages
    { pattern: /^gtdc-/, organizer: 'GTDC', transportMode: 'road', isSubsidized: (pkg) => pkg.price < 1000 },

    // IRCTC packages
    { pattern: /^pkg-irctc-/, organizer: 'IRCTC', transportMode: 'rail', isSubsidized: false },
    { pattern: /irctc/i, organizer: 'IRCTC', transportMode: 'rail', isSubsidized: false },
    { pattern: /buddhist circuit train/i, organizer: 'IRCTC', transportMode: 'rail', isSubsidized: false },

    // State tourism development corps (by state ID)
    { stateMatch: 'tamil-nadu', titlePattern: /TTDC/, organizer: 'TTDC', transportMode: 'road', isSubsidized: false },
    { stateMatch: 'maharashtra', titlePattern: /MTDC/, organizer: 'MTDC', transportMode: 'road', isSubsidized: (pkg) => pkg.price < 2000 },
    { stateMatch: 'karnataka', titlePattern: /KSTDC/, organizer: 'KSTDC', transportMode: 'road', isSubsidized: false },
    { stateMatch: 'odisha', titlePattern: /OTDC/, organizer: 'OTDC', transportMode: 'road', isSubsidized: false },
    { stateMatch: 'west-bengal', titlePattern: /WBTDC/, organizer: 'WBTDC', transportMode: 'road', isSubsidized: false },
    { stateMatch: 'assam', titlePattern: /ATDC/, organizer: 'ATDC', transportMode: 'road', isSubsidized: false },
    { stateMatch: 'andhra-pradesh', titlePattern: /APTDC/, organizer: 'APTDC', transportMode: (pkg) => pkg.title.includes('Rail') ? 'rail' : 'road', isSubsidized: (pkg) => pkg.price < 3000 },
    { stateMatch: 'jammu-kashmir', titlePattern: /JKTDC/, organizer: 'JKTDC', transportMode: 'road', isSubsidized: false },
    { stateMatch: 'delhi', titlePattern: /Delhi Darshan/, organizer: 'DTTDC', transportMode: 'road', isSubsidized: (pkg) => pkg.price < 500 },

    // Private packages (default)
    { pattern: /^pkg-/, organizer: 'Private', transportMode: 'mixed', isSubsidized: false },
];

function addMetadataToPackages() {
    const dataPath = path.join(__dirname, '../lib/data.js');
    let content = fs.readFileSync(dataPath, 'utf8');

    // This is a simplified version - in reality, you'd parse the packages array properly
    // For now, let's output the metadata mappings that can be manually applied

    console.log('Metadata mapping for packages:');
    console.log('================================\n');

    const packagePatterns = {
        'ktdc-': { organizer: 'KTDC', transportMode: 'road' },
        'rtdc-': { organizer: 'RTDC', transportMode: 'road' },
        'gtdc-': { organizer: 'GTDC', transportMode: 'road' },
        'pkg-irctc-': { organizer: 'IRCTC', transportMode: 'rail' },
        'pkg-mh-': { organizer: 'MTDC', transportMode: 'road' },
        'pkg-kn-': { organizer: 'KSTDC', transportMode: 'road' },
        'pkg-od-': { organizer: 'OTDC', transportMode: 'road' },
        'pkg-wb-': { organizer: 'WBTDC', transportMode: 'road' },
        'pkg-as-': { organizer: 'ATDC', transportMode: 'road' },
        'pkg-ap-': { organizer: 'APTDC', transportMode: 'road' },
        'pkg-jk-': { organizer: 'JKTDC', transportMode: 'road' },
        'pkg-dl-': { organizer: 'DTTDC', transportMode: 'road' },
        'pkg-': { organizer: 'Private', transportMode: 'mixed' },
    };

    for (const [prefix, meta] of Object.entries(packagePatterns)) {
        console.log(`Packages starting with '${prefix}': organizer='${meta.organizer}', transportMode='${meta.transportMode}'`);
    }
}

addMetadataToPackages();
