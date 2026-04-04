import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductGrid = () => {
    return (
        <div className="category-grid">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;