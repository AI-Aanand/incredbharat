import { siteConfig, generatePageMetadata, generateOrganizationSchema, generateWebsiteSchema } from '../lib/seo-config'

export const metadata = {
    metadataBase: new URL('https://incredbharat.vercel.app'),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author, email: siteConfig.contact.email }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: 'IncredBharat - Discover India\'s Best Tourism Packages',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: siteConfig.social.twitter,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    verification: {
        google: 'pe35QBtevjNuhFwfNN36uXpytqMhN7Z93tAVRV9f6j4',
    },
}

import '../app/v2/v2.css' // Global V2 Styles
import './globals.css'
import NavbarV2 from '../components/v2/NavbarV2' // Use V2 Navbar globally
import CategoryStrip from '../components/v2/CategoryStrip' // Use CategoryStrip globally
import Footer from '../components/Footer'

export default function RootLayout({ children }) {
    // Generate structured data
    const organizationSchema = generateOrganizationSchema();
    const websiteSchema = generateWebsiteSchema();

    return (
        <html lang="en">
            <head>
                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationSchema)
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteSchema)
                    }}
                />
            </head>
            <body>
                <NavbarV2 />
                <CategoryStrip />
                {/* 
                    Adjust top padding for fixed header:
                    Navbar (120px) + CategoryStrip (52px) = 172px 
                    + some breathing room
                */}
                <main style={{
                    minHeight: 'calc(100vh - 172px - 300px)',
                    paddingTop: '180px',
                    backgroundColor: 'var(--background)' // Ensure background color is consistent
                }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
