'use client';

import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NavbarV2 from './v2/NavbarV2';
import CategoryStrip from './v2/CategoryStrip';

export default function AppWrapper({ children }) {
    const pathname = usePathname();
    // Use V2 layout for root and /v2 paths
    const isV2 = pathname === '/' || pathname?.startsWith('/v2');

    return (
        <>
            {/* Navbar Selection */}
            {isV2 ? <NavbarV2 /> : <Navbar />}

            {/* Category Strip (V2 Only) */}
            {isV2 && (
                <Suspense fallback={<div style={{ height: '60px', background: '#0a3a5c' }}></div>}>
                    <CategoryStrip />
                </Suspense>
            )}

            <main style={isV2 ? { paddingTop: 0 } : {
                minHeight: 'calc(100vh - 80px - 300px)',
                paddingTop: '80px',
                backgroundColor: 'var(--background)'
            }}>
                {children}
            </main>

            {/* Footer is common */}
            <Footer />
        </>
    );
}
