'use client';

import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Footer from './Footer';
import NavbarV2 from './v2/NavbarV2';
import CategoryStrip from './v2/CategoryStrip';

export default function AppWrapper({ children }) {
    const pathname = usePathname();
    const isHomepage = pathname === '/' || pathname?.startsWith('/v2');

    return (
        <>
            {/* Global V2 Navbar */}
            <NavbarV2 />

            {/* Category Strip (Global) */}
            <Suspense fallback={<div style={{ height: '60px', background: '#500000' }}></div>}>
                <CategoryStrip />
            </Suspense>

            <main style={isHomepage ? { paddingTop: 0 } : {
                minHeight: 'calc(100vh - 80px - 300px)',
                paddingTop: '80px', // Push content down for fixed navbar on non-home pages
                backgroundColor: 'var(--background)'
            }}>
                {children}
            </main>

            {/* Footer is common */}
            <Footer />
        </>
    );
}
