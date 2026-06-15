import React from 'react';

interface FooterBrandingProps {
    brand: string;
    copyright: string;
}

const FooterBranding: React.FC<FooterBrandingProps> = ({ brand, copyright }) => {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-3xl font-black uppercase font-headline tracking-tighter" style={{ color: 'var(--primary-fixed)' }}>
                {brand}
            </span>
            <p className="text-xs tracking-widest text-white uppercase font-space-grotesk font-bold">
                {copyright}
            </p>
        </div>
    );
};

export default FooterBranding;
