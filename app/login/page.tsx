'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function LoginForm() {
    const router = useRouter();
    const params = useSearchParams();
    const registered = params.get('registered');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.ok) {
            router.push('/');
            router.refresh();
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 1.5rem 4rem' }}>
                <div style={{ width: '100%', maxWidth: '440px' }}>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <Link href="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary-fixed)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
                            ← SSS SAFETY
                        </Link>
                        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.75rem' }}>
                            SIGN IN
                        </h1>
                        <div style={{ width: '3rem', height: '4px', backgroundColor: 'var(--primary-fixed)' }} />
                    </div>

                    {registered && (
                        <div style={{ background: 'rgba(255, 121, 54, 0.12)', border: '1px solid var(--primary-fixed)', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: 'var(--primary-fixed)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Account created — sign in below.
                        </div>
                    )}

                    {error && (
                        <div style={{ background: 'rgba(179, 27, 37, 0.12)', border: '1px solid #b31b25', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#fb5151', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                style={inputStyle}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-fixed)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={inputStyle}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-fixed)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <a href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-fixed)', textDecoration: 'none' }}>
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', marginTop: '0.25rem', fontSize: '0.9rem', opacity: loading ? 0.7 : 1 }}
                            disabled={loading}
                        >
                            {loading ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    </div>

                    <p style={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" style={{ color: 'var(--primary-fixed)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}>
                            Create Account
                        </Link>
                    </p>
                </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <>
            <Header />
            <Suspense>
                <LoginForm />
            </Suspense>
            <Footer />
        </>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#aaaaaa',
    marginBottom: '0.5rem',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 0,
    padding: '0.85rem 1rem',
    color: 'white',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    transition: 'border-color 0.2s ease',
    outline: 'none',
};
