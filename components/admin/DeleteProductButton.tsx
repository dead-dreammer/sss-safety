'use client';

import { useRouter } from 'next/navigation';

export default function DeleteProductButton({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Delete this product? This cannot be undone.')) return;
        await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
        router.refresh();
    };

    return (
        <button
            onClick={handleDelete}
            style={{
                padding: '0.4rem 0.8rem',
                border: '1px solid rgba(185,28,28,0.4)',
                background: 'transparent',
                color: 'rgba(239,68,68,0.8)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(185,28,28,0.15)';
                (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(239,68,68,0.8)';
            }}
        >
            Delete
        </button>
    );
}
