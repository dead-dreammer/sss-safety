import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
    const [productCount, userCount] = await Promise.all([
        prisma.product.count(),
        prisma.user.count(),
    ]);

    const recentProducts = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
    });

    const stats = [
        { label: 'Products', value: productCount, icon: 'inventory_2', href: '/admin/products', description: 'Items in catalogue' },
        { label: 'Users', value: userCount, icon: 'group', href: '#', description: 'Registered accounts' },
    ];

    return (
        <div>
            {/* Page header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.75rem',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: 'white',
                    lineHeight: 1,
                }}>
                    Dashboard
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', marginTop: '0.5rem', fontFamily: "'Inter', sans-serif" }}>
                    Overview of your store
                </p>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                {stats.map(({ label, value, icon, href, description }) => (
                    <Link key={label} href={href} style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: '#111',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderTop: '3px solid var(--primary-fixed)',
                            padding: '1.5rem 1.75rem',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'border-color 0.2s, background 0.2s',
                        }}>
                            {/* Faded background icon */}
                            <span className="material-symbols-outlined" style={{
                                position: 'absolute',
                                right: '1.25rem',
                                bottom: '0.75rem',
                                fontSize: '4rem',
                                color: 'rgba(255,121,54,0.07)',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}>
                                {icon}
                            </span>

                            <div style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.62rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.3)',
                                marginBottom: '0.875rem',
                            }}>
                                {label}
                            </div>
                            <div style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 900,
                                fontSize: '3rem',
                                color: 'white',
                                lineHeight: 1,
                                marginBottom: '0.5rem',
                            }}>
                                {value}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif" }}>
                                {description}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick actions */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.25)',
                    marginBottom: '1rem',
                }}>
                    Quick Actions
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link href="/admin/products/new" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add</span>
                        Add Product
                    </Link>
                    <Link href="/admin/products" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>inventory_2</span>
                        Manage Products
                    </Link>
                </div>
            </div>

            {/* Recent products */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.62rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.25)',
                    }}>
                        Recently Added
                    </div>
                    <Link href="/admin/products" style={{ fontSize: '0.75rem', color: 'var(--primary-fixed)', textDecoration: 'none', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                        View all →
                    </Link>
                </div>

                <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                    {recentProducts.length === 0 ? (
                        <div style={{ padding: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem' }}>
                            No products yet. <Link href="/admin/products/new" style={{ color: 'var(--primary-fixed)', textDecoration: 'none' }}>Add one →</Link>
                        </div>
                    ) : recentProducts.map((product, i) => (
                        <div key={product.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.9rem 1.25rem',
                            borderBottom: i < recentProducts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        }}>
                            {/* Thumbnail */}
                            <div style={{ width: '40px', height: '40px', background: '#1a1a1a', flexShrink: 0, overflow: 'hidden' }}>
                                {product.image && <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {product.title}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.1rem', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                    {product.category}
                                </div>
                            </div>

                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '0.9rem', color: 'var(--primary-fixed)', flexShrink: 0 }}>
                                R{product.price.toFixed(2)}
                            </span>

                            <Link href={`/admin/products/${product.id}`} style={{
                                fontSize: '0.7rem',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.3)',
                                textDecoration: 'none',
                                flexShrink: 0,
                                padding: '0.35rem 0.75rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}>
                                Edit
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
