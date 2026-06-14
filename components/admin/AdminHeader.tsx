import Link from 'next/link';
import AdminNavLinks from './AdminNavLinks';
import AdminNavActions from './AdminNavActions';

export default function AdminHeader() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl flex justify-between items-center px-8 py-6">
            <div className="flex items-center gap-12">
                <Link href="/admin" className="text-2xl font-black text-black tracking-tighter uppercase font-headline">
                    SSS SAFETY
                </Link>
                <div style={{
                    height: '1rem',
                    width: '1px',
                    background: 'rgba(0,0,0,0.15)',
                }} />
                <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--primary-fixed)',
                }}>
                    Admin
                </span>
                <AdminNavLinks />
            </div>
            <AdminNavActions />
        </nav>
    );
}
