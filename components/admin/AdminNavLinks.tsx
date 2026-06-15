'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
];

export default function AdminNavLinks() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex gap-8 items-center">
            {links.map(({ href, label }) => {
                const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
                return (
                    <Link
                        key={href}
                        href={href}
                        className={isActive ? 'nav-link nav-link-active' : 'nav-link'}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}
