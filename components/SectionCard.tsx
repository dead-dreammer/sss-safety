'use client';

import React from 'react';

interface SectionCardProps {
    title: string;
    accentColor: 'black' | 'orange';
    description: string;
    buttonText: string;
    backgroundColor: 'white' | 'light-gray';
    onButtonClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
    title,
    accentColor,
    description,
    buttonText,
    backgroundColor,
    onButtonClick,
}) => {
    const bgClass = backgroundColor === 'white' ? 'section-primary' : 'section-light';
    const accentStyle = accentColor === 'black' ? { color: '#000000' } : { color: 'var(--primary-fixed)' };
    const textStyle = accentColor === 'black' ? { color: '#000000' } : { color: '#666666' };

    return (
        <div className={`${bgClass} px-12 md:px-16 py-24 md:py-32 flex flex-col justify-center items-start`}>
            <h2 className="text-5xl md:text-7xl font-black text-black uppercase font-headline tracking-tighter mb-6">
                {title}
            </h2>
            <div 
                className="w-20 h-1 mb-10"
                style={accentStyle}
            ></div>
            <p className="font-medium text-lg max-w-lg mb-12 leading-relaxed" style={textStyle}>
                {description}
            </p>
            <button className="btn btn-primary" onClick={onButtonClick}>
                {buttonText}
            </button>
        </div>
    );
};

export default SectionCard;
