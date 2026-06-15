import React from 'react';
import CategoryCard from './CategoryCard';

interface Category {
    id: number;
    title: string;
    image: string;
}

interface CategoryGridProps {
    categories: Category[];
}

const CategoryGridComponent: React.FC<CategoryGridProps> = ({ categories }) => {
    return (
        <div className="category-grid">
            {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
            ))}
        </div>
    );
};

export default CategoryGridComponent;
