import React from 'react';

interface BentoCardProps {
    label: string;
    title: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    background?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ label, title, subtitle, description, icon, background }) => {
    return (
        <div className="bento-item" style={{ background: background || '#2a2a2a' }}>
            <div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--primary-fixed)' }}>
                    {label}
                </span>
                <h3 className="text-2xl font-black font-headline uppercase tracking-tight mt-3">
                    {title}
                    {subtitle && <br />}
                    {subtitle}
                </h3>
                {description && <p className="text-gray-400 mt-3 text-sm leading-relaxed">{description}</p>}
            </div>
            {icon && (
                <div className="flex justify-between items-end mt-auto">
                    <span className="text-5xl font-black" style={{ color: 'var(--primary-fixed)' }}>
                        {icon}
                    </span>
                </div>
            )}
        </div>
    );
};

export default BentoCard;
