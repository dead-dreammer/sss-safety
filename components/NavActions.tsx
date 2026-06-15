'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../context/CartContext';

const NavActions: React.FC = () => {
    const { data: session } = useSession();
    const { itemCount, mounted } = useCart();

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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-fixed)' }}>
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
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            title="Sign out"
                            className="hover:opacity-70 transition-opacity active:scale-95 cursor-pointer"
                            style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                            aria-label="Sign out"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>logout</span>
                            <span style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                lineHeight: 1,
                            }}>
                                Sign Out
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

                <Link
                    href="/cart"
                    className="hover:text-orange-600 transition-colors active:scale-95"
                    style={{ color: '#000', display: 'flex', alignItems: 'center', position: 'relative' }}
                    aria-label="Cart"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>shopping_cart</span>
                    {mounted && itemCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-7px',
                            background: 'var(--primary-fixed)',
                            color: '#000',
                            borderRadius: '50%',
                            width: '17px',
                            height: '17px',
                            fontSize: '0.6rem',
                            fontWeight: 900,
                            fontFamily: "'Space Grotesk', sans-serif",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            lineHeight: 1,
                        }}>
                            {itemCount > 9 ? '9+' : itemCount}
                        </span>
                    )}
                </Link>
            </div>
            <Link href="/products" className="btn btn-primary">
                GET PROTECTED
            </Link>
        </div>
    );
};

export default NavActions;
