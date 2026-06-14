import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductListing from '../../components/ProductListing';
import { prisma } from '../../lib/prisma';

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'asc' },
    });

    return (
        <>
            <Header />
            <ProductListing products={products} />
            <Footer />
        </>
    );
}
