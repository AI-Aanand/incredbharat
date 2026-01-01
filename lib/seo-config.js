// SEO metadata configuration for IncredBharat
export const siteConfig = {
    name: 'IncredBharat',
    title: 'IncredBharat | Discover India\'s Best Government Tourism Packages',
    description: 'Your one-stop platform to discover and compare tourism packages from all Indian state tourism boards, IRCTC, and state road transport corporations. Find budget tours, luxury trains, and subsidized packages.',
    url: 'https://incredbharat.vercel.app',
    ogImage: 'https://incredbharat.vercel.app/og-image.jpg',
    keywords: [
        'India tourism',
        'government tourism packages',
        'IRCTC tours',
        'state tourism',
        'Kerala tourism',
        'Rajasthan tourism',
        'Goa tourism',
        'India travel packages',
        'budget tours India',
        'KTDC packages',
        'RTDC packages',
        'Palace on Wheels',
        'India heritage tours',
        'subsidized tours India',
        'KSRTC tours',
        'state road transport tours'
    ],
    author: 'IncredBharat Tourism',
    contact: {
        email: 'aanand.blog@gmail.com',
        phone: '+91 9663080203',
        address: 'Kalyan Nagar, Bengaluru, Karnataka, India'
    },
    social: {
        twitter: '@incredbharat',
        facebook: 'incredbharat'
    }
};

// Generate metadata for different page types
export function generatePageMetadata(type, data = {}) {
    const baseUrl = siteConfig.url;

    switch (type) {
        case 'home':
            return {
                title: siteConfig.title,
                description: siteConfig.description,
                keywords: siteConfig.keywords.join(', '),
                openGraph: {
                    title: siteConfig.title,
                    description: siteConfig.description,
                    url: baseUrl,
                    siteName: siteConfig.name,
                    images: [
                        {
                            url: siteConfig.ogImage,
                            width: 1200,
                            height: 630,
                            alt: 'IncredBharat - Discover India\'s Best Tourism Packages'
                        }
                    ],
                    locale: 'en_IN',
                    type: 'website',
                },
                twitter: {
                    card: 'summary_large_image',
                    title: siteConfig.title,
                    description: siteConfig.description,
                    images: [siteConfig.ogImage],
                    creator: siteConfig.social.twitter,
                },
            };

        case 'packages':
            return {
                title: `Browse All Tourism Packages | ${siteConfig.name}`,
                description: `Explore 80+ government tourism packages across India. Compare IRCTC rail tours, state tourism packages, and road transport tours. Find budget-friendly to luxury travel options.`,
                keywords: 'India tour packages, IRCTC packages, state tourism packages, budget tours, luxury trains India',
                openGraph: {
                    title: `Browse All Tourism Packages | ${siteConfig.name}`,
                    description: `Explore 80+ government tourism packages across India`,
                    url: `${baseUrl}/packages`,
                    siteName: siteConfig.name,
                    type: 'website',
                },
            };

        case 'about':
            return {
                title: `About Us | ${siteConfig.name}`,
                description: `Learn about IncredBharat - India's premier platform for discovering and comparing official government tourism packages from KTDC, RTDC, IRCTC, KSRTC and more.`,
                keywords: 'about IncredBharat, India tourism platform, government tourism aggregator',
                openGraph: {
                    title: `About Us | ${siteConfig.name}`,
                    description: `India's premier platform for government tourism packages`,
                    url: `${baseUrl}/about`,
                    siteName: siteConfig.name,
                    type: 'website',
                },
            };

        case 'state':
            return {
                title: `${data.stateName} Tourism Packages | ${siteConfig.name}`,
                description: `Discover amazing ${data.stateName} tourism packages. ${data.packageCount}+ official tours from state tourism board. Explore heritage sites, beaches, mountains, and cultural experiences.`,
                keywords: `${data.stateName} tourism, ${data.stateName} packages, ${data.stateName} tours, visit ${data.stateName}`,
                openGraph: {
                    title: `${data.stateName} Tourism Packages`,
                    description: `${data.packageCount}+ official tourism packages in ${data.stateName}`,
                    url: `${baseUrl}/states/${data.stateId}`,
                    siteName: siteConfig.name,
                    type: 'website',
                },
            };

        case 'package':
            return {
                title: `${data.packageName} | ${data.stateName} | ${siteConfig.name}`,
                description: `${data.description} Duration: ${data.duration}. Starting from ₹${data.price}. Organized by ${data.organizer}.`,
                keywords: `${data.packageName}, ${data.stateName} tour, ${data.organizer}, India tourism`,
                openGraph: {
                    title: data.packageName,
                    description: `${data.description}. From ₹${data.price}`,
                    url: `${baseUrl}/packages/${data.packageId}`,
                    siteName: siteConfig.name,
                    type: 'product',
                },
            };

        default:
            return {
                title: siteConfig.title,
                description: siteConfig.description,
            };
    }
}

// Structured Data (JSON-LD) generators
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: siteConfig.contact.phone,
            contactType: 'Customer Service',
            email: siteConfig.contact.email,
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi']
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bengaluru',
            addressRegion: 'Karnataka',
            addressCountry: 'IN'
        },
        sameAs: [
            `https://twitter.com/${siteConfig.social.twitter}`,
            `https://facebook.com/${siteConfig.social.facebook}`
        ]
    };
}

export function generateTourPackageSchema(packageData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: packageData.name,
        description: packageData.description,
        provider: {
            '@type': 'Organization',
            name: packageData.organizer
        },
        touristType: 'All',
        itinerary: {
            '@type': 'ItemList',
            name: `${packageData.name} Itinerary`
        },
        offers: {
            '@type': 'Offer',
            price: packageData.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock'
        }
    };
}

export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    };
}
