'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirm) {
            setError('Passwords do not match.');
            return;
        }
        if (form.password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setLoading(true);

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
        });

        if (!res.ok) {
            setLoading(false);
            const data = await res.json();
            setError(data.error || 'Signup failed. Please try again.');
            return;
        }

        // Auto sign-in after successful registration
        const result = await signIn('credentials', {
            email: form.email,
            password: form.password,
            redirect: false,
        });

        setLoading(false);

        if (result?.ok) {
            router.push('/');
            router.refresh();
        } else {
            router.push('/login?registered=1');
        }
    };

    const fields: { name: keyof typeof form; label: string; type: string; placeholder: string }[] = [
        { name: 'name',     label: 'Full Name',        type: 'text',     placeholder: 'John Smith' },
        { name: 'email',    label: 'Email Address',    type: 'email',    placeholder: 'you@example.com' },
        { name: 'password', label: 'Password',         type: 'password', placeholder: '8+ characters' },
        { name: 'confirm',  label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
    ];

    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 1.5rem 4rem' }}>
                <div style={{ width: '100%', maxWidth: '440px' }}>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <Link href="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary-fixed)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
                            ← SSS SAFETY
                        </Link>
                        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.75rem' }}>
                            CREATE ACCOUNT
                        </h1>
                        <div style={{ width: '3rem', height: '4px', backgroundColor: 'var(--primary-fixed)' }} />
                    </div>

                    {error && (
                        <div style={{ background: 'rgba(179, 27, 37, 0.12)', border: '1px solid #b31b25', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#fb5151', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {fields.map(({ name, label, type, placeholder }) => (
                            <div key={name}>
                                <label style={labelStyle}>{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-fixed)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                                />
                            </div>
                        ))}

                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#555', lineHeight: 1.6, marginTop: '-0.25rem' }}>
                            By creating an account you agree to our{' '}
                            <a href="#" style={{ color: 'var(--primary-fixed)', textDecoration: 'none' }}>Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" style={{ color: 'var(--primary-fixed)', textDecoration: 'none' }}>Privacy Policy</a>.
                        </p>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', marginTop: '0.25rem', fontSize: '0.9rem', opacity: loading ? 0.7 : 1 }}
                            disabled={loading}
                        >
                            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                        </button>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    </div>

                    <p style={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: 'var(--primary-fixed)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
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
