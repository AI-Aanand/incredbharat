import { Train, Bus, Plane, Building2 } from 'lucide-react';

export default function PackageTypeIndicator({ organizer, transportMode, isSubsidized, variant = 'default' }) {
    if (!organizer && !transportMode && !isSubsidized) return null;

    const getOrganizerStyle = () => {
        if (!organizer) return {};

        // IRCTC - Blue theme
        if (organizer === 'IRCTC') return { bg: '#0066CC', color: 'white' };

        // State Tourism Corporations - Saffron/Orange theme
        const stateTourism = ['KTDC', 'RTDC', 'GTDC', 'MTDC', 'KSTDC', 'OTDC', 'WBTDC', 'ATDC', 'APTDC', 'JKTDC', 'DTTDC', 'HPTDC'];
        if (stateTourism.includes(organizer)) return { bg: '#FF7A18', color: 'white' };

        // Private - Gray theme
        return { bg: '#6B7280', color: 'white' };
    };

    const getTransportIcon = () => {
        switch (transportMode) {
            case 'rail': return <Train size={14} />;
            case 'road': return <Bus size={14} />;
            case 'air': return <Plane size={14} />;
            case 'mixed': return <><Train size={12} /><Bus size={12} /></>;
            default: return null;
        }
    };

    const orgStyle = getOrganizerStyle();

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            alignItems: 'center'
        }}>
            {/* Organizer Badge */}
            {organizer && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    backgroundColor: orgStyle.bg,
                    color: orgStyle.color,
                    letterSpacing: '0.5px'
                }}>
                    <Building2 size={12} />
                    {organizer}
                </div>
            )}

            {/* Transport Mode Icon */}
            {transportMode && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#374151',
                    border: '1px solid #E5E7EB'
                }}>
                    {getTransportIcon()}
                    <span style={{ textTransform: 'capitalize' }}>
                        {transportMode === 'mixed' ? 'Multi' : transportMode}
                    </span>
                </div>
            )}

            {/* Subsidized Ribbon */}
            {isSubsidized && (
                <div style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '1rem',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#1F2937',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 4px rgba(255, 215, 0, 0.3)'
                }}>
                    ★ Subsidized
                </div>
            )}
        </div>
    );
}
