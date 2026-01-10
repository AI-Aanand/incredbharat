'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        padding: '3rem',
                        background: '#fff',
                        borderRadius: '1rem',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <h1 style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            color: '#ef4444'
                        }}>
                            Oops!
                        </h1>
                        <h2 style={{
                            fontSize: '1.5rem',
                            marginBottom: '1rem',
                            color: '#374151'
                        }}>
                            Something went wrong
                        </h2>
                        <p style={{
                            color: '#6b7280',
                            marginBottom: '2rem',
                            lineHeight: '1.6'
                        }}>
                            We&apos;re sorry for the inconvenience. An unexpected error has occurred.
                            Please try refreshing the page or return to the homepage.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                            >
                                Refresh Page
                            </button>
                            <a
                                href="/"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'inline-block'
                                }}
                            >
                                Go Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
