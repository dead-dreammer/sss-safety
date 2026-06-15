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
            <section className="section-dark px-4 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-32">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-6 sm:mb-8">THE CORE ARSENAL</h2>
                    <div className="w-16 sm:w-24 lg:w-32 h-1 bg-orange-500 mb-12 sm:mb-16 lg:mb-20"></div>
                    <CategoryGrid />
                    <div className="mt-16 text-center">
                        <Link href="/products" className="btn btn-primary">
                            VIEW ALL PRODUCTS
                        </Link>
                    </div>
                </div>
            </section>
            <BulkOrdering />
            <section className="section-dark px-4 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-32">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-6 sm:mb-8 text-center">FEATURED SYSTEMS</h2>
                    <div className="w-16 sm:w-24 lg:w-32 h-1 bg-orange-500 mx-auto mb-12 sm:mb-16 lg:mb-20"></div>
                    <BentoGrid />
                </div>
            </section>
            <Footer />
        </>
    );
}