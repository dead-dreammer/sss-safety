'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    tags: string[];
    image: string;
}

interface ProductGridProps {
    products: Product[];
}

function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem({ id: product.id, title: product.title, price: product.price, image: product.image, category: product.category });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <button
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.75rem', transition: 'all 0.2s' }}
            onClick={handleAdd}
        >
            {added ? '✓ Added' : 'Add to Cart'}
        </button>
    );
}

const ProductGridComponent: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <div className="category-grid">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-card-image"
                    />
                    <div className="product-card-body">
                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: 'var(--primary-fixed)',
                        }}>
                            {product.category}
                        </p>
                        <h3 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 900,
                            fontSize: '1.1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em',
                            color: 'white',
                            lineHeight: 1.2,
                        }}>
                            {product.title}
                        </h3>
                        <div className="product-card-tags">
                            {product.tags.map((tag, idx) => (
                                <span key={idx} className="product-card-tag">{tag}</span>
                            ))}
                        </div>
                        <div className="product-card-footer">
                            <p style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 900,
                                fontSize: '1.25rem',
                                color: 'var(--primary-fixed)',
                                letterSpacing: '-0.01em',
                            }}>
                                R{product.price.toFixed(2)}
                            </p>
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGridComponent;
