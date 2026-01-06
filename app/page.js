'use client';

import React from 'react';
import Hero from '../components/Hero';
import CategoryStrip from '../components/CategoryStrip';
import StateCardsGrid from '../components/StateCardsGrid';
import IndiaMap from '../components/IndiaMap';

export default function Home() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            {/* Cinematic Hero Section */}
            <Hero />

            {/* Quick Filter Categories */}
            <CategoryStrip />

            {/* Premium State Cards Grid */}
            <div id="states">
                <StateCardsGrid />
            </div>

            {/* Interactive India Map */}
            <div id="map" style={{ position: 'relative', zIndex: 1 }}>
                <IndiaMap />
            </div>

            {/* Spacer for Footer */}
            <div style={{ height: '4rem' }}></div>
        </main>
    );
}
