'use client';

import React from 'react';
import HeroContent from './HeroContent';

const Hero = () => {
    const handleExploreLoadouts = () => {
        window.location.href = '/products';
    };

    const handleBulkOrdering = () => {
        window.location.href = '#bulk-ordering';
    };

    return (
        <section className="hero">
            <div className="hero-background" style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFMJb_6ABYxzjPJMDcm4unjYwJQdjdx67YsZoLSC8o3JB1bAo3Z4epDjovIe5Sj4e9m6pEMLvHtnMrvs7qvG86ffKA6NoVUIidO-XMiMgi1mQpGL4ukzfzGZw4ua5SUJ5aqtlkwMfzTDrGw2EJArygMd348oIXvV55jXKs6F2Q1TfLpH4jfBH_BeT81eeFHFrFdWq2REUUsVRjjh08MSRqPtTn6S-vXRm8d7Vi8m9lp6hPl7gUVaAdBcylPbPnzbSONEq0hpATlo0")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}></div>
            <div className="hero-overlay"></div>
            <HeroContent
                badge="UTILITY FORGE V.24"
                title="TOTAL"
                titleHighlight="PROTECTION"
                description="Precision-engineered industrial gear designed for the most extreme deployment scenarios. Built for the modern worker, forged for resilience."
                onPrimaryAction={handleExploreLoadouts}
                onSecondaryAction={handleBulkOrdering}
            />
        </section>
    );
};

export default Hero;