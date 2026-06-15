import React from 'react';

interface FooterLink {
    href: string;
    label: string;
}

interface FooterLinksProps {
    links: FooterLink[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => {
    return (
        <div className="flex flex-wrap justify-center gap-12">
            {links.map((link) => (
                <a key={link.label} className="footer-link" href={link.href}>
                    {link.label}
                </a>
            ))}
        </div>
    );
};

export default FooterLinks;
