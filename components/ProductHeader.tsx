import React from 'react';

interface ProductHeaderProps {
    sortBy: string;
    onSortChange: (value: string) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ sortBy, onSortChange }) => {
    return (
        <header className="mb-16">
            <h2 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter mb-16">THE UTILITY FORGE</h2>
            <div className="w-32 h-1 bg-orange-500 mb-16"></div>
            <div className="flex justify-between items-center mb-8">
                <p className="text-white text-lg">Sort by:</p>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="bg-black text-white px-4 py-2 border border-orange-600 rounded"
                >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>
        </header>
    );
};

export default ProductHeader;
