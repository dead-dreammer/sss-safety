import React from 'react';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    tags: string[];
    image: string;
}

interface ProductGridProps {
    products: Product[];
}

const ProductGridComponent: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <div className="category-grid">
            {products.map((product) => (
                <div key={product.id} className="category-card">
                    <img src={product.image} alt={product.title} />
                    <div className="category-label">
                        <h3>{product.title}</h3>
                        <p className="text-orange-400 font-bold">R{product.price}</p>
                        <p className="text-xs text-white uppercase">{product.category}</p>
                        <div className="flex gap-2 flex-wrap mb-2">
                            {product.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-black text-xs font-headline font-bold uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <button className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGridComponent;
