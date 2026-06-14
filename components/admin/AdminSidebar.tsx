'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
    { href: '/admin/products', label: 'Products', icon: 'inventory_2' },
];

export default function AdminSidebar({ email, name }: { email?: string | null; name?: string | null }) {
    const pathname = usePathname();
    const [hovered, setHovered] = useState<string | null>(null);
    const initial = (name ?? email ?? 'A')[0].toUpperCase();

    return (
        <aside style={{
            width: '260px',
            background: '#080808',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            padding: '1.75rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            zIndex: 10,
        }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2.75rem', paddingLeft: '0.5rem' }}>
                <div style={{
                    width: '34px',
                    height: '34px',
                    background: 'var(--primary-fixed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: '#000' }}>S</span>
                </div>
                <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'white', lineHeight: 1.1 }}>
                        SSS Safety
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,121,54,0.7)', marginTop: '0.2rem' }}>
                        Admin Console
                    </div>
                </div>
            </div>

            {/* Nav section label */}
            <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.18)',
                paddingLeft: '0.9rem',
                marginBottom: '0.5rem',
            }}>
                Navigation
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
                {navItems.map(({ href, label, icon }) => {
                    const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
                    const isHovered = hovered === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            onMouseEnter={() => setHovered(href)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                padding: '0.7rem 0.9rem',
                                borderRadius: '6px',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: isActive ? '#fff' : isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)',
                                background: isActive ? 'rgba(255,121,54,0.14)' : isHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                                border: isActive ? '1px solid rgba(255,121,54,0.28)' : '1px solid transparent',
                                textDecoration: 'none',
                                transition: 'all 0.12s ease',
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1.15rem', color: isActive ? 'var(--primary-fixed)' : 'inherit', flexShrink: 0 }}>
                                {icon}
                            </span>
                            {label}
                            {isActive && (
                                <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-fixed)', flexShrink: 0 }} />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User section */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* User card */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'var(--primary-fixed)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '0.85rem', color: '#000' }}>
                            {initial}
                        </span>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {name ?? email}
                        </div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-fixed)', marginTop: '0.15rem' }}>
                            Administrator
                        </div>
                    </div>
                </div>

                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.9rem',
                    fontSize: '0.73rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    transition: 'color 0.12s ease',
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>arrow_back</span>
                    Back to Site
                </Link>

                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.9rem',
                        fontSize: '0.73rem',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(239,68,68,0.5)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        textAlign: 'left',
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>logout</span>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
