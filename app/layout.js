export const metadata = {
    title: 'IncredBharat | Explore Amazing India',
    description: 'Your gateway to the most beautiful destinations in India.',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 80px - 300px)', paddingTop: '80px' }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
