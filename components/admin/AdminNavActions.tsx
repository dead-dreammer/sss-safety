'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function AdminNavActions() {
    const { data: session } = useSession();

    return (
        <div className="flex items-center gap-6">
            <Link
                href="/"
                className="nav-link"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
                Back to Site
            </Link>

            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                title="Sign out"
                className="hover:opacity-70 transition-opacity active:scale-95 cursor-pointer"
                style={{ color: 'var(--primary-fixed)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
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
                    {session?.user?.name?.split(' ')[0] ?? session?.user?.email?.split('@')[0]}
                </span>
            </button>
        </div>
    );
}
