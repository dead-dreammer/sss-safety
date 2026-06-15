import React from 'react';
import { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="category-card">
            <img src={`/images/${product.image}`} alt={product.title} />
            <div className="category-label">
                <h3>{product.title}</h3>
                <p className="text-orange-400 font-bold">R{product.price}</p>
                <button className="btn mt-2">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;