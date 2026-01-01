/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
        // Enable image optimization
        formats: ['image/webp', 'image/avif'],
        // Allow unoptimized for development
        unoptimized: process.env.NODE_ENV === 'development',
    },
};

module.exports = nextConfig;

