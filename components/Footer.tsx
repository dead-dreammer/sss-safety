import React from 'react';
import FooterBranding from './FooterBranding';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';

const Footer = () => {
    const footerLinks = [
        { href: '#privacy', label: 'PRIVACY POLICY' },
        { href: '#terms', label: 'TERMS OF SERVICE' },
        { href: '#compliance', label: 'SAFETY COMPLIANCE' },
        { href: '#contact', label: 'CONTACT ARCHITECT' },
    ];

    return (
        <footer className="bg-black border-t-4 border-orange-600 px-12 py-20">
            <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-8">
                <FooterBranding
                    brand="SSS SAFETY"
                    copyright="© 2024 SSS SAFETY INDUSTRIAL CORP. ALL RIGHTS RESERVED."
                />
                <FooterLinks links={footerLinks} />
                <FooterSocial />
            </div>
        </footer>
    );
};

export default Footer;
