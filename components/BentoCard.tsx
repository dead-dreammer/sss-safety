import React from 'react';

interface BentoCardProps {
    label: string;
    title: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    background?: string;
    textDark?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ label, title, subtitle, description, icon, background, textDark }) => {
    const accentColor = textDark ? '#000000' : 'var(--primary-fixed)';

    return (
        <div
            className="bento-item"
            style={{
                background: background || '#2a2a2a',
                color: textDark ? '#000000' : 'white',
            }}
        >
            <div>
                <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: accentColor }}
                >
                    {label}
                </span>
                <h3 className="text-2xl font-black font-headline uppercase tracking-tight mt-3">
                    {title}
                    {subtitle && <><br />{subtitle}</>}
                </h3>
                {description && (
                    <p
                        className="mt-3 text-sm leading-relaxed"
                        style={{ color: textDark ? 'rgba(0,0,0,0.65)' : '#9ca3af' }}
                    >
                        {description}
                    </p>
                )}
            </div>
            {icon && (
                <div className="flex justify-between items-end mt-auto">
                    <span className="text-5xl font-black" style={{ color: accentColor }}>
                        {icon}
                    </span>
                </div>
            )}
        </div>
    );
};

export default BentoCard;
