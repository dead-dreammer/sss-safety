import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import DeleteProductButton from '../../../components/admin/DeleteProductButton';

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

    return (
        <div>
            {/* Back to dashboard */}
            <Link
                href="/admin"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    textDecoration: 'none',
                    marginBottom: '1.5rem',
                }}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
                Admin Dashboard
            </Link>

            {/* Page header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.75rem',
                        letterSpacing: '-0.02em',
                        textTransform: 'uppercase',
                        color: 'white',
                        lineHeight: 1,
                    }}>
                        Products
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', marginTop: '0.5rem', fontFamily: "'Inter', sans-serif" }}>
                        {products.length} item{products.length !== 1 ? 's' : ''} in catalogue
                    </p>
                </div>
                <Link href="/admin/products/new" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add</span>
                    Add Product
                </Link>
            </div>

            {/* Table */}
            <div className="admin-table-scroll">
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', minWidth: '680px' }}>
                {/* Header row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '56px 1fr 150px 110px 1fr 140px',
                    padding: '0.65rem 1.5rem',
                    background: '#0a0a0a',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    gap: '1rem',
                    alignItems: 'center',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.25)',
                }}>
                    <span></span>
                    <span>Product</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Tags</span>
                    <span style={{ textAlign: 'right' }}>Actions</span>
                </div>

                {products.length === 0 && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem' }}>
                        No products yet.{' '}
                        <Link href="/admin/products/new" style={{ color: 'var(--primary-fixed)', textDecoration: 'none' }}>
                            Add your first one →
                        </Link>
                    </div>
                )}

                {products.map((product, i) => (
                    <div key={product.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '56px 1fr 150px 110px 1fr 140px',
                        padding: '1rem 1.5rem',
                        borderBottom: i < products.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        gap: '1rem',
                        alignItems: 'center',
                    }}>
                        {/* Thumbnail */}
                        <div style={{ width: '44px', height: '44px', background: '#1a1a1a', flexShrink: 0, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                            {product.image && (
                                <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                        </div>

                        {/* Title */}
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {product.title}
                            </div>
                        </div>

                        {/* Category badge */}
                        <div>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.2rem 0.6rem',
                                background: 'rgba(255,121,54,0.1)',
                                border: '1px solid rgba(255,121,54,0.2)',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.62rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,121,54,0.85)',
                                whiteSpace: 'nowrap',
                            }}>
                                {product.category}
                            </span>
                        </div>

                        {/* Price */}
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, color: 'white', fontSize: '0.9rem' }}>
                            R{product.price.toFixed(2)}
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {product.tags.slice(0, 2).map(tag => (
                                <span key={tag} style={{
                                    padding: '0.15rem 0.45rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    fontSize: '0.6rem',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.4)',
                                }}>
                                    {tag}
                                </span>
                            ))}
                            {product.tags.length > 2 && (
                                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Grotesk', sans-serif", alignSelf: 'center' }}>
                                    +{product.tags.length - 2}
                                </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <Link
                                href={`/admin/products/${product.id}`}
                                style={{
                                    padding: '0.4rem 0.875rem',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    background: 'transparent',
                                    color: 'rgba(255,255,255,0.6)',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '0.68rem',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>edit</span>
                                Edit
                            </Link>
                            <DeleteProductButton id={product.id} />
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}
