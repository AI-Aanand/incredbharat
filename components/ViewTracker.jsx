'use client';

import { useEffect } from 'react';

export default function ViewTracker({ type, id }) {
    useEffect(() => {
        if (id) {
            import('../lib/viewTracking').then(({ trackView }) => {
                trackView(type, id);
            });
        }
    }, [type, id]);

    return null; // Render nothing
}
