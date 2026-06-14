import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../../lib/prisma';
import ProductForm from '../../../../components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({ where: { id: params.id } });

    if (!product) notFound();

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Link href="/admin/products" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>arrow_back</span>
                </Link>
                <h1 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: '2rem',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                }}>
                    Edit Product
                </h1>
            </div>
            <ProductForm product={product} />
        </div>
    );
}
