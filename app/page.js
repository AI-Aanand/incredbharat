import React from 'react';
import Hero from '../components/Hero';
import StateCardsGrid from '../components/StateCardsGrid';
import IndiaMap from '../components/IndiaMap';

export default function Home() {
    return (
        <>
            <Hero />
            <StateCardsGrid />
            <IndiaMap />
        </>
    )
}
