'use client';

import React from 'react';

interface BentoLargeCardProps {
    label: string;
    title: string;
    description: string;
    backgroundImage: string;
    onAction: () => void;
}

const BentoLargeCard: React.FC<BentoLargeCardProps> = ({
    label,
    title,
    description,
    backgroundImage,
    onAction,
}) => {
    return (
        <div
            className="bento-item large"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3))' }}></div>
            <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto', paddingBottom: '2rem' }}>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--primary-fixed)' }}>
                    {label}
                </span>
                <h3 className="text-5xl font-black font-headline uppercase tracking-tighter mt-2 text-white">
                    {title}
                </h3>
                <p className="text-gray-300 mt-4 max-w-xs leading-relaxed">
                    {description}
                </p>
                <button 
                    className="mt-8 font-headline font-bold uppercase text-sm tracking-wide transition-colors hover:text-orange-600 text-white"
                    onClick={onAction}
                    style={{ cursor: 'pointer' }}
                >
                    SHOP NOW →
                </button>
            </div>
        </div>
    );
};

export default BentoLargeCard;
