import React from 'react';
import { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            <img src={`/images/${product.image}`} alt={product.title} />
            <h3>{product.title}</h3>
            <p>R{product.price}</p>
            <button className="btn">Add to Cart</button>
        </div>
    );
};

export default ProductCard;