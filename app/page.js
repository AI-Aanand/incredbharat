import React from 'react';
import Hero from '../components/Hero';
import StateCardsGrid from '../components/StateCardsGrid';
import IndiaMap from '../components/IndiaMap';
import V2Banner from '../components/V2Banner';

export default function Home() {
    return (
        <>
            <V2Banner />
            <Hero />
            <StateCardsGrid />
            <IndiaMap />
        </>
    )
}
