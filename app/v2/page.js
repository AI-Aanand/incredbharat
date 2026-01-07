'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeV2() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to main page since V2 is now the default design
        router.replace('/');
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div>
                <h2 style={{ marginBottom: '1rem' }}>Redirecting...</h2>
                <p>V2 design is now the default experience.</p>
            </div>
        </div>
    );
}
