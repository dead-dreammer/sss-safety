'use client';

import React from 'react';

interface HeroContentProps {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    onPrimaryAction: () => void;
    onSecondaryAction: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({
    badge,
    title,
    titleHighlight,
    description,
    onPrimaryAction,
    onSecondaryAction,
}) => {
    return (
        <div className="hero-content">
            <span className="hero-badge">{badge}</span>
            <h1 className="text-7xl md:text-9xl font-black text-white leading-tight tracking-tighter mb-8 uppercase font-headline">
                {title} <br />
                <span style={{ color: 'var(--primary-fixed)' }}>{titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl">
                {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary" onClick={onPrimaryAction}>
                    Explore Loadouts
                </button>
                <button className="btn btn-secondary" onClick={onSecondaryAction}>
                    Bulk Ordering
                </button>
            </div>
        </div>
    );
};

export default HeroContent;
