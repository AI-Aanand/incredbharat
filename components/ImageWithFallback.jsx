'use client';

import { useState, useEffect } from 'react';

/**
 * Image component with fallback support, lazy loading, and blur-up effect
 */
export default function ImageWithFallback({
    src,
    alt,
    fallbackType = 'default', // 'default' | 'icon'
    className,
    style,
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Sync state if src changes (important for development/filtering)
    useEffect(() => {
        setImgSrc(src);
        setHasError(false);
        setIsLoaded(false);
    }, [src]);

    // Sync state if src changes (important for development/filtering)
    useEffect(() => {
        setImgSrc(src);
        setHasError(false);
        setIsLoaded(false);
    }, [src]);

    // OPTIMIZATION: Removed JS-based timeout. 
    // It conflicts with loading="lazy" (timer fires before browser starts fetching).
    // Standard img.onError is sufficient for 404s/network errors.

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setIsLoaded(true);
            if (fallbackType === 'default') {
                // Default SVG placeholder logic...

                setImgSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwODA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY5OTMzO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkluY3JlZEJoYXJhdDwvdGV4dD48L3N2Zz4=');
            }
            // For 'icon', we don't change text src, instead we'll rely on hasError to render the fallback UI
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            {/* Shimmer Placeholder (visible until loaded) */}
            {!isLoaded && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    zIndex: 1
                }} />
            )}

            <style jsx global>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>

            {/* Icon Fallback UI */}
            {hasError && fallbackType === 'icon' ? (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    color: '#9ca3af'
                }}>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                </div>
            ) : (
                <img
                    src={imgSrc}
                    alt={alt}
                    onError={handleError}
                    onLoad={() => setIsLoaded(true)}
                    className={className}
                    style={{
                        ...style,
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                        objectFit: 'cover'
                    }}
                    loading="lazy"
                    decoding="async"
                    {...props}
                />
            )}
        </div>
    );
}
