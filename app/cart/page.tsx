import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartPageContent from '../../components/CartPageContent';

export default function CartPage() {
    return (
        <>
            <Header />
            <div style={{ background: '#0d0d0d', minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 3rem' }}>
                    <CartPageContent />
                </div>
            </div>
            <Footer />
        </>
    );
}
