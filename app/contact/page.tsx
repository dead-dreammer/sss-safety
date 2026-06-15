import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';

export const metadata = {
    title: 'Contact Us — SSS Safety',
    description: 'Get in touch with the SSS Safety team for product enquiries, bulk orders, or compliance questions.',
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <div style={{ background: '#0d0d0d', minHeight: '100vh', paddingTop: '6rem' }}>

                {/* Page header */}
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingTop: '3rem', paddingBottom: '3rem' }}>
                    <div className="px-4 sm:px-8 lg:px-12" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--primary-fixed)',
                            marginBottom: '1rem',
                        }}>
                            Get In Touch
                        </p>
                        <h1 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 900,
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.03em',
                            color: 'white',
                            lineHeight: 0.95,
                            maxWidth: '700px',
                        }}>
                            Contact Us
                        </h1>
                    </div>
                </div>

                {/* Main content */}
                <div className="contact-grid px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* Form */}
                    <div>
                        <h2 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 900,
                            fontSize: '1.4rem',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em',
                            color: 'white',
                            marginBottom: '0.5rem',
                        }}>
                            Send Us a Message
                        </h2>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                            Have a question about a product, need a bulk order quote, or want advice on compliance requirements? Fill in the form and we&apos;ll get back to you within 1–2 business days.
                        </p>
                        <ContactForm />
                    </div>

                    {/* Contact info sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {[
                            {
                                icon: 'mail',
                                label: 'Email',
                                value: 'info@ssssafety.co.za',
                                link: 'mailto:info@ssssafety.co.za',
                            },
                            {
                                icon: 'phone',
                                label: 'Phone',
                                value: '+27 (0) 11 000 0000',
                                link: 'tel:+27110000000',
                            },
                            {
                                icon: 'location_on',
                                label: 'Address',
                                value: 'Johannesburg, Gauteng, South Africa',
                                link: null,
                            },
                            {
                                icon: 'schedule',
                                label: 'Business Hours',
                                value: 'Mon – Fri, 08:00 – 17:00 SAST',
                                link: null,
                            },
                        ].map(item => (
                            <div
                                key={item.label}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'flex-start',
                                    padding: '1.5rem 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--primary-fixed)', marginTop: '0.1rem', flexShrink: 0 }}>
                                    {item.icon}
                                </span>
                                <div>
                                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.25rem' }}>
                                        {item.label}
                                    </p>
                                    {item.link ? (
                                        <a href={item.link} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                                            {item.value}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
