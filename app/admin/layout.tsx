import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = { title: 'Admin — SSS Safety' };

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login?callbackUrl=/admin');
    }
    if (session.user?.role !== 'admin') {
        redirect('/');
    }

    return (
        <main style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary-fixed)' }}>
                        SSS SAFETY — Admin
                    </span>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
                        Back to Site
                    </Link>
                </div>
                {children}
            </div>
        </main>
    );
}
