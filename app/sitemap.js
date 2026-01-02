import { states, packages } from '../lib/data';

export default function sitemap() {
    const baseUrl = 'https://incredbharat.vercel.app';

    // Static pages
    const staticPages = [
        '',
        '/packages',
        '/about',
        '/faq',
        '/disclaimer',
        '/favorites',
        '/compare',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic State pages
    const statePages = states.map((state) => ({
        url: `${baseUrl}/states/${state.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    // Dynamic Package pages
    const packagePages = packages.map((pkg) => ({
        url: `${baseUrl}/packages/${pkg.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticPages, ...statePages, ...packagePages];
}
