import React from 'react';

interface HeroBadgeProps {
    text: string;
}

const HeroBadge: React.FC<HeroBadgeProps> = ({ text }) => {
    return <span className="hero-badge">{text}</span>;
};

export default HeroBadge;
