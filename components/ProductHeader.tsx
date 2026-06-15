import React from 'react';

interface ProductHeaderProps {
    sortBy: string;
    onSortChange: (value: string) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ sortBy, onSortChange }) => {
    return (
        <header style={{ marginBottom: '3rem' }}>
            <h2
                style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: '1rem',
                }}
            >
                THE UTILITY FORGE
            </h2>
            <div
                style={{
                    width: '5rem',
                    height: '4px',
                    backgroundColor: 'var(--primary-fixed)',
                    marginBottom: '2.5rem',
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: '#aaaaaa', fontSize: '0.9rem', fontWeight: 500 }}>
                    {6} products
                </p>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    style={{
                        background: '#0d0d0d',
                        color: 'white',
                        padding: '0.6rem 1rem',
                        border: '1px solid var(--primary-fixed)',
                        borderRadius: 0,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                >
                    <option value="name">Sort: Name</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                </select>
            </div>
        </header>
    );
};

export default ProductHeader;
