'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        setError('');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const body = await res.json();
                throw new Error(body.error ?? 'Something went wrong');
            }
            setStatus('success');
            form.reset();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
            setStatus('error');
        }
    }

    const inputStyle: React.CSSProperties = {
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.9rem',
        padding: '0.85rem 1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
        marginBottom: '0.5rem',
    };

    if (status === 'success') {
        return (
            <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '3rem 2rem',
                textAlign: 'center',
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--primary-fixed)', display: 'block', marginBottom: '1rem' }}>
                    check_circle
                </span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'white', marginBottom: '0.5rem' }}>
                    Message Sent
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)' }}>
                    We&apos;ll get back to you within 1–2 business days.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: 'var(--primary-fixed)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                >
                    Send Another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                    <label htmlFor="name" style={labelStyle}>Full Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Smith"
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary-fixed)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                </div>
                <div>
                    <label htmlFor="email" style={labelStyle}>Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary-fixed)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" style={labelStyle}>Subject</label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Product enquiry, bulk order, compliance question..."
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary-fixed)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
            </div>

            <div>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us how we can help..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary-fixed)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
            </div>

            {status === 'error' && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', padding: '0.75rem 1rem' }}>
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', opacity: status === 'loading' ? 0.6 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
            >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
