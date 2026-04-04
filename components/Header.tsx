import React from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import NavActions from './NavActions';

const Header = () => {
    const navLinks = [
        { href: '/products', label: 'EQUIPMENT', active: true },
        { href: '#protocols', label: 'PROTOCOLS' },
        { href: '#training', label: 'TRAINING' },
        { href: '#resources', label: 'RESOURCES' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl flex justify-between items-center px-8 py-6">
            <div className="flex items-center gap-12">
                <Link href="/" className="text-2xl font-black text-black tracking-tighter uppercase font-headline">SSS SAFETY</Link>
                <NavLinks links={navLinks} />
            </div>
            <NavActions />
        </nav>
    );
};

export default Header;