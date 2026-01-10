import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { siteConfig, generatePageMetadata, generateOrganizationSchema, generateWebsiteSchema } from '../lib/seo-config'

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
})

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body',
})

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


import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'

export default function RootLayout({ children }) {
    // Generate structured data
    const organizationSchema = generateOrganizationSchema();
    const websiteSchema = generateWebsiteSchema();

    return (
        <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
            <head>
                {/* Google Analytics 4 - Replace G-XXXXXXXXXX with your actual GA4 Measurement ID */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXXXXX');
                    `}
                </Script>

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
                <ErrorBoundary>
                    <Navbar />
                    <main style={{
                        minHeight: 'calc(100vh - 80px - 300px)',
                        paddingTop: '80px',
                        backgroundColor: 'var(--background)'
                    }}>
                        {children}
                    </main>
                    <Footer />
                </ErrorBoundary>
            </body>
        </html>
    )
}
