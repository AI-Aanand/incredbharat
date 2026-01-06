import '../../app/globals.css';
import './v2.css';
import NavbarV2 from '../../components/v2/NavbarV2';
import CategoryStrip from '../../components/v2/CategoryStrip';
import { Suspense } from 'react';

export default function V2Layout({ children }) {
    return (
        <>
            {/* Hide the root Navbar for v2 pages */}
            <style>{`
                body > nav:first-of-type { display: none !important; }
                body > main { padding-top: 0 !important; }
            `}</style>
            <NavbarV2 />
            <Suspense fallback={<div style={{ height: '60px', background: '#0a3a5c' }}></div>}>
                <CategoryStrip />
            </Suspense>
            <main style={{ paddingTop: '0' }}>
                {children}
            </main>
            {/* Footer comes from root layout, no need to duplicate */}
        </>
    );
}
