import React from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import NavActions from './NavActions';

const Header = () => {
    const navLinks = [
        { href: '/products', label: 'EQUIPMENT', active: true },
        { href: '#protocols', label: 'PROTOCOLS' },
        { href: '#training', label: 'TRAINING' },
        { href: '/contact', label: 'CONTACT' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">
            <div className="flex items-center gap-3 lg:gap-10">
                <Link href="/" className="text-lg sm:text-xl lg:text-2xl font-black text-black tracking-tighter uppercase font-headline">SSS SAFETY</Link>
                <NavLinks links={navLinks} />
            </div>
            <NavActions />
        </nav>
    );
};

export default Header;