'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductFormData {
    id?: string;
    title: string;
    price: number;
    category: string;
    tags: string[];
    image: string;
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '2px',
    padding: '0.75rem 1rem',
    color: 'white',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.5rem',
};

export default function ProductForm({ product }: { product?: ProductFormData }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        title: product?.title ?? '',
        price: product?.price?.toString() ?? '',
        category: product?.category ?? '',
        tags: product?.tags?.join(', ') ?? '',
        image: product?.image ?? '',
    });

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(prev => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        const data = {
            title: form.title.trim(),
            price: parseFloat(form.price),
            category: form.category.trim(),
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            image: form.image.trim(),
        };

        if (!data.title || isNaN(data.price) || !data.category || !data.image) {
            setError('All fields except tags are required.');
            setSaving(false);
            return;
        }

        const res = product?.id
            ? await fetch(`/api/admin/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            : await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

        if (!res.ok) {
            setError('Something went wrong. Please try again.');
            setSaving(false);
            return;
        }

        router.push('/admin/products');
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
            {error && (
                <div style={{
                    background: 'rgba(185,28,28,0.15)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#ef4444',
                    padding: '0.75rem 1rem',
                    borderRadius: '2px',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                }}>
                    {error}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Title */}
                <div>
                    <label style={labelStyle}>Product Title</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={set('title')}
                        placeholder="e.g. Ballistic Vest Level IIIA"
                        required
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--primary-fixed)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                </div>

                {/* Price + Category row */}
                <div className="admin-form-2col">
                    <div>
                        <label style={labelStyle}>Price (R)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.price}
                            onChange={set('price')}
                            placeholder="0.00"
                            required
                            style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = 'var(--primary-fixed)')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Category</label>
                        <input
                            type="text"
                            value={form.category}
                            onChange={set('category')}
                            placeholder="e.g. BODY ARMOUR"
                            required
                            style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = 'var(--primary-fixed)')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label style={labelStyle}>Tags <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(comma-separated)</span></label>
                    <input
                        type="text"
                        value={form.tags}
                        onChange={set('tags')}
                        placeholder="e.g. NIJ CERTIFIED, LIGHTWEIGHT, TACTICAL"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--primary-fixed)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label style={labelStyle}>Image URL</label>
                    <input
                        type="url"
                        value={form.image}
                        onChange={set('image')}
                        placeholder="https://..."
                        required
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--primary-fixed)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                    {form.image && (
                        <div style={{ marginTop: '0.75rem', width: '100px', height: '100px', overflow: 'hidden', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                    style={{ opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
                >
                    {saving ? 'Saving...' : product?.id ? 'Save Changes' : 'Create Product'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => router.push('/admin/products')}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
