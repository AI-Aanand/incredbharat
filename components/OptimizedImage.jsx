'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function OptimizedImage({
    src,
    alt,
    width,
    height,
    className,
    style,
    priority = false,
    isAIGenerated = false,
    showAIBadge = true,
    fallbackSrc = '/images/fallback.svg',
    isFallbackAIGenerated = false,
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [usingFallback, setUsingFallback] = useState(false);

    const handleError = () => {
        if (!usingFallback) {
            console.warn(`Image failed to load: ${src}, using fallback: ${fallbackSrc}`);
            setImgSrc(fallbackSrc);
            setUsingFallback(true);
            setHasError(false); // Reset error to try loading fallback
        } else {
            setHasError(true); // Fallback also failed
        }
    };

    // Determine if we should show the AI badge
    // If using fallback, use fallback's AI flag. Else use primary AI flag.
    const shouldShowBadge = showAIBadge && !hasError && (usingFallback ? isFallbackAIGenerated : isAIGenerated);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
            <Image
                src={imgSrc || fallbackSrc} // Handle empty src passed in
                alt={alt}
                width={width}
                height={height}
                className={className}
                onError={handleError}
                onLoad={() => setIsLoading(false)}
                priority={priority}
                quality={80} // Balance quality vs size
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                {...props}
            />

            {/* Loading shimmer effect */}
            {isLoading && !hasError && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        opacity: 0.3,
                        animation: 'pulse 2s infinite'
                    }}
                />
            )}

            {/* AI Generated Badge */}
            {shouldShowBadge && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#667eea',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        zIndex: 10
                    }}
                >
                    <Sparkles size={12} fill="#667eea" stroke="#667eea" />
                    <span>AI Generated</span>
                </div>
            )}
        </div>
    );
}
