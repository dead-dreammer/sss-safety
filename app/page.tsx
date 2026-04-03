import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Hero />
            <main className="container">
                <ProductGrid />
            </main>
            <Footer />
        </div>
    );
}