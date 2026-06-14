import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';

export const metadata = { title: 'Admin — SSS Safety' };

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'admin') {
        redirect('/');
    }

    const name = session.user?.name;
    const email = session.user?.email;
    const initial = (name ?? email ?? 'A')[0].toUpperCase();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
            <AdminSidebar email={email} name={name} />

            <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Top bar */}
                <header style={{
                    height: '60px',
                    background: '#0a0a0a',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '0 2.5rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 5,
                    gap: '1rem',
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                            {name ?? email}
                        </div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary-fixed)', marginTop: '0.1rem' }}>
                            Administrator
                        </div>
                    </div>
                    <div style={{
                        width: '34px',
                        height: '34px',
                        background: 'var(--primary-fixed)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '0.95rem', color: '#000' }}>
                            {initial}
                        </span>
                    </div>
                </header>

                {/* Page content */}
                <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
