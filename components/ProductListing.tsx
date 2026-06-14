'use client';

import React, { useState, useMemo } from 'react';
import ProductListingSidebar from './ProductListingSidebar';
import ProductHeader from './ProductHeader';
import ProductGridComponent from './ProductGridComponent';

interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    tags: string[];
    image: string;
}

interface ProductListingProps {
    products: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ products }) => {
    const [filters, setFilters] = useState({
        structuralLoad: ['INDUSTRIAL GRADE'],
        visibilityRange: 'CLASS 2: MEDIUM',
    });
    const [sortBy, setSortBy] = useState('name');

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            if (sortBy === 'name') return a.title.localeCompare(b.title);
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0;
        });
    }, [products, sortBy]);

    const handleFilterChange = (filterType: string, value: string | string[]) => {
        setFilters((prev) => ({ ...prev, [filterType]: value }));
    };

    return (
        <div className="section-dark" style={{ minHeight: '100vh' }}>
            <div
                className="flex flex-col md:flex-row gap-12"
                style={{ maxWidth: '88rem', margin: '0 auto', padding: '7rem 3rem 5rem' }}
            >
                <ProductListingSidebar filters={filters} onFilterChange={handleFilterChange} />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <ProductHeader sortBy={sortBy} onSortChange={setSortBy} />
                    <ProductGridComponent products={sortedProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
