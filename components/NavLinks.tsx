import React from 'react';
import Link from 'next/link';

interface NavLink {
    href: string;
    label: string;
    active?: boolean;
}

interface NavLinksProps {
    links: NavLink[];
}

const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
    return (
        <div className="hidden lg:flex gap-8 items-center">
            {links.map((link) => (
                link.href.startsWith('#') ? (
                    <a
                        key={link.label}
                        href={link.href}
                        className={link.active ? 'nav-link nav-link-active' : 'nav-link'}
                    >
                        {link.label}
                    </a>
                ) : (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={link.active ? 'nav-link nav-link-active' : 'nav-link'}
                    >
                        {link.label}
                    </Link>
                )
            ))}
        </div>
    );
};

export default NavLinks;
