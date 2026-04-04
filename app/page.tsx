import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import BulkOrdering from '../components/BulkOrdering';
import BentoGrid from '../components/BentoGrid';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <section className="section-dark px-12 py-32">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">THE CORE ARSENAL</h2>
                    <div className="w-32 h-1 bg-orange-500 mb-20"></div>
                    <CategoryGrid />
                    <div className="mt-16 text-center">
                        <Link href="/products" className="btn btn-primary">
                            VIEW ALL PRODUCTS
                        </Link>
                    </div>
                </div>
            </section>
            <BulkOrdering />
            <section className="section-dark px-12 py-32">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 text-center">FEATURED SYSTEMS</h2>
                    <div className="w-32 h-1 bg-orange-500 mx-auto mb-20"></div>
                    <BentoGrid />
                </div>
            </section>
            <Footer />
        </>
    );
}