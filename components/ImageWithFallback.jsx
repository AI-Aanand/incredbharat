'use client';

import { useState } from 'react';

/**
 * Image component with fallback support, lazy loading, and blur-up effect
 */
export default function ImageWithFallback({
    src,
    alt,
    fallbackSrc = '/placeholder-image.jpg',
    className,
    style,
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwODA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY5OTMzO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkluY3JlZEJoYXJhdDwvdGV4dD48L3N2Zz4=');
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
                    objectFit: 'cover' // Default to cover for better aesthetics
                }}
                loading="lazy"
                decoding="async"
                {...props}
            />
        </div>
    );
}
