'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const NavActions: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
                {session ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {session.user?.role === 'admin' && (
                            <Link
                                href="/admin"
                                title="Admin panel"
                                style={{ color: 'var(--primary-fixed)', display: 'flex', alignItems: 'center' }}
                                aria-label="Admin panel"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>admin_panel_settings</span>
                            </Link>
                        )}
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            title="Click to sign out"
                            className="hover:opacity-70 transition-opacity active:scale-95 cursor-pointer"
                            style={{ color: 'var(--primary-fixed)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                            aria-label="Sign out"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>person</span>
                            <span style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                lineHeight: 1,
                            }}>
                                {session.user?.name?.split(' ')[0] ?? session.user?.email?.split('@')[0]}
                            </span>
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="hover:text-orange-600 transition-colors active:scale-95"
                        style={{ color: '#000', display: 'flex', alignItems: 'center' }}
                        aria-label="Sign in"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>person</span>
                    </Link>
                )}

                <button
                    className="hover:text-orange-600 transition-colors active:scale-95 cursor-pointer"
                    style={{ color: '#000', display: 'flex', alignItems: 'center' }}
                    aria-label="Cart"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>shopping_cart</span>
                </button>
            </div>
            <Link href="/products" className="btn btn-primary">
                GET PROTECTED
            </Link>
        </div>
    );
};

export default NavActions;
