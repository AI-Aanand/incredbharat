// Sample packages with complete metadata for demonstration
// This extends the existing packages array with metadata enriched versions

export const samplePackagesWithMetadata = [
    {
        id: 'ktdc-moments',
        stateId: 'kerala',
        title: 'KTDC Moments',
        duration: '5 Days / 4 Nights',
        price: 42590,
        rating: 4.8,
        reviews: 320,
        description: 'Official KTDC Package. Covers Munnar, Thekkady, and Kumarakom/Cochin.',
        amenities: ['KTDC Hotels', 'Breakfast', 'A/C Etios/Sedan', 'Sightseeing'],
        organizer: 'KTDC',
        transportMode: 'road',
        isSubsidized: false,
        images: [
            'https://images.unsplash.com/photo-1593693396885-5a589918c120?q=80&w=3454&auto=format&fit=crop'
        ]
    },
    {
        id: 'rtdc-desert-circuit',
        stateId: 'rajasthan',
        title: 'RTDC Desert Circuit',
        duration: '8 Days / 7 Nights',
        price: 30200,
        rating: 4.7,
        reviews: 145,
        description: 'Experience the Thar Desert. Jaipur, Bikaner, Jaisalmer (Sam Sand Dunes), Jodhpur.',
        amenities: ['Desert Camp', 'Camel Ride', 'RTDC Hotels', 'Breakfast'],
        organizer: 'RTDC',
        transportMode: 'road',
        isSubsidized: false,
        images: [
            'https://images.unsplash.com/photo-1518182170546-0766ba6f6a56?q=80&w=3540&auto=format&fit=crop'
        ]
    },
    {
        id: 'gtdc-north-goa-tour',
        stateId: 'goa',
        title: 'North Goa Sightseeing (AC Bus)',
        duration: '1 Day',
        price: 400,
        rating: 4.3,
        reviews: 850,
        description: 'Famous GT DC Daily Tour. Visit Calangute, Anjuna, Vagator, Fort Aguada.',
        amenities: ['AC Coach', 'Guide', 'Beach Stops', 'Fort Visit'],
        organizer: 'GTDC',
        transportMode: 'road',
        isSubsidized: true,
        images: [
            'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=3552&auto=format&fit=crop'
        ]
    },
    {
        id: 'pkg-irctc-golden-triangle',
        stateId: 'delhi',
        title: 'IRCTC Bharat Darshan - Golden Triangle',
        duration: '6 Days / 5 Nights',
        price: 18900,
        rating: 4.6,
        reviews: 542,
        description: 'Official IRCTC rail package. Delhi-Agra-Jaipur circuit by train with AC accommodation.',
        amenities: ['AC Train', 'Hotel Stay', 'All Meals', 'Sightseeing', 'Tour Manager'],
        organizer: 'IRCTC',
        transportMode: 'rail',
        isSubsidized: false,
        images: [
            'https://images.unsplash.com/photo-1587474260584-1790af56b2dc?q=80&w=3540&auto=format&fit=crop'
        ]
    },
    {
        id: 'pkg-andaman-hopper',
        stateId: 'andaman-and-nicobar',
        title: 'Andaman Island Hopper',
        duration: '7 Days / 6 Nights',
        price: 35000,
        rating: 4.9,
        reviews: 112,
        description: 'Comprehensive tour: Port Blair, Havelock (Radhanagar/Elephant Beach), and Neil Island.',
        amenities: ['Luxury Cruise', 'Island Hopping', 'Snorkeling Session', 'Resorts'],
        organizer: 'Private',
        transportMode: 'mixed',
        isSubsidized: false,
        images: [
            'https://images.unsplash.com/photo-1633501758550-5165d492695c?q=80&w=3387&auto=format&fit=crop'
        ]
    }
];
