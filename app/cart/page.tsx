import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartPageContent from '../../components/CartPageContent';

export default function CartPage() {
    return (
        <>
            <Header />
            <div style={{ background: '#0d0d0d', minHeight: '100vh', paddingTop: '5rem', paddingBottom: '3rem' }}>
                <div className="px-4 sm:px-8 lg:px-12" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <CartPageContent />
                </div>
            </div>
            <Footer />
        </>
    );
}
