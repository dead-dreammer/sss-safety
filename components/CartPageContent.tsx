'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartPageContent() {
    const { items, removeItem, updateQuantity, clearCart, total, itemCount, mounted } = useCart();

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
                    shopping_cart
                </span>
                <h2 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: 'white',
                    marginBottom: '0.75rem',
                }}>
                    Your cart is empty
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '2rem', fontFamily: "'Inter', sans-serif" }}>
                    Browse our industrial safety equipment and add items to get started.
                </p>
                <Link href="/products" className="btn btn-primary">
                    Shop Equipment
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-layout">
            {/* Cart items */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h1 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        color: 'white',
                    }}>
                        Cart <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                    </h1>
                    <button
                        onClick={clearCart}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.3)',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.72rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}
                    >
                        Clear all
                    </button>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    {items.map(item => (
                        <div key={item.id} style={{
                            display: 'grid',
                            gridTemplateColumns: '80px 1fr auto',
                            gap: '1.25rem',
                            padding: '1.5rem 0',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            alignItems: 'center',
                        }}>
                            {/* Image */}
                            <div style={{ width: '80px', height: '80px', background: '#1a1a1a', overflow: 'hidden', flexShrink: 0 }}>
                                {item.image && (
                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </div>

                            {/* Details */}
                            <div>
                                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary-fixed)', marginBottom: '0.25rem' }}>
                                    {item.category}
                                </p>
                                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'white', marginBottom: '0.75rem' }}>
                                    {item.title}
                                </h3>
                                {/* Quantity controls */}
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0', border: '1px solid rgba(255,255,255,0.12)' }}>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        −
                                    </button>
                                    <span style={{ width: '36px', textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'white', borderLeft: '1px solid rgba(255,255,255,0.12)', borderRight: '1px solid rgba(255,255,255,0.12)', lineHeight: '32px' }}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Price + Remove */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: 'white' }}>
                                    R{(item.price * item.quantity).toFixed(2)}
                                </span>
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                                    R{item.price.toFixed(2)} each
                                </span>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>delete</span>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <Link href="/products" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
                        Continue Shopping
                    </Link>
                </div>
            </div>

            {/* Order summary */}
            <div className="cart-summary" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', padding: '2rem' }}>
                <h2 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: '1.5rem',
                }}>
                    Order Summary
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', flex: 1, marginRight: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.title} × {item.quantity}
                            </span>
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
                                R{(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>Subtotal</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>R{total.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>Shipping</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>Calculated at checkout</span>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white' }}>Total</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1.4rem', color: 'var(--primary-fixed)' }}>R{total.toFixed(2)}</span>
                    </div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                    Proceed to Checkout
                </button>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: '1rem' }}>
                    Secure checkout · Orders fulfilled within 3–5 business days
                </p>
            </div>
        </div>
    );
}
