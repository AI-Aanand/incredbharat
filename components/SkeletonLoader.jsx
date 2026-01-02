'use client';

export default function SkeletonLoader({ type = 'card', count = 3 }) {
    const CardSkeleton = () => (
        <div className="card" style={{ height: '100%', animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            {/* Image skeleton */}
            <div style={{
                height: '220px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
            }} />

            {/* Content skeleton */}
            <div style={{ padding: '1.5rem' }}>
                {/* Title */}
                <div style={{
                    height: '20px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '0.75rem',
                    width: '70%'
                }} />

                {/* Subtitle */}
                <div style={{
                    height: '16px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    width: '90%'
                }} />

                {/* Duration */}
                <div style={{
                    height: '14px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '1.5rem',
                    width: '40%'
                }} />

                {/* Price and button row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                        height: '32px',
                        background: '#e5e7eb',
                        borderRadius: '4px',
                        width: '100px'
                    }} />
                    <div style={{
                        height: '40px',
                        background: '#e5e7eb',
                        borderRadius: '8px',
                        width: '100px'
                    }} />
                </div>
            </div>
        </div>
    );

    const ListSkeleton = () => (
        <div style={{ marginBottom: '1rem' }}>
            <div style={{
                height: '24px',
                background: '#e5e7eb',
                borderRadius: '4px',
                width: '60%',
                marginBottom: '0.5rem'
            }} />
            <div style={{
                height: '16px',
                background: '#e5e7eb',
                borderRadius: '4px',
                width: '40%'
            }} />
        </div>
    );

    if (type === 'card') {
        return (
            <>
                <style jsx>{`
                    @keyframes shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                `}</style>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {Array.from({ length: count }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </>
        );
    }

    if (type === 'list') {
        return (
            <>
                {Array.from({ length: count }).map((_, i) => (
                    <ListSkeleton key={i} />
                ))}
            </>
        );
    }

    return null;
}
