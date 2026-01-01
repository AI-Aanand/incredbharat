import { Train, Bus, Plane, Building2, Info } from 'lucide-react';

export default function PackageLegend() {
    return (
        <div style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                color: '#374151'
            }}>
                <Info size={20} />
                <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Package Guide</h3>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Organizers */}
                <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: '#6B7280' }}>
                        Organizers
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                                padding: '0.25rem 0.65rem',
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                backgroundColor: '#0066CC',
                                color: 'white'
                            }}>
                                IRCTC
                            </span>
                            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Indian Railways</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                                padding: '0.25rem 0.65rem',
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                backgroundColor: '#FF9933',
                                color: 'white'
                            }}>
                                RTDC
                            </span>
                            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>State Tourism</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                                padding: '0.25rem 0.65rem',
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                backgroundColor: '#6B7280',
                                color: 'white'
                            }}>
                                Private
                            </span>
                            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Private Operators</span>
                        </div>
                    </div>
                </div>

                {/* Transport Modes */}
                <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: '#6B7280' }}>
                        Transport Modes
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Train size={16} color="#374151" />
                            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Train/Rail</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bus size={16} color="#374151" />
                            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Road/Bus</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plane size={16} color="#374151" />
                            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Air Travel</span>
                        </div>
                    </div>
                </div>

                {/* Special Markers */}
                <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: '#6B7280' }}>
                        Special Offers
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                            padding: '0.25rem 0.65rem',
                            borderRadius: '1rem',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: '#1F2937'
                        }}>
                            ★ Subsidized
                        </span>
                        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Government subsidized package</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
