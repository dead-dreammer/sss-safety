import React from 'react';

interface Category {
    id: number;
    title: string;
    image: string;
}

interface CategoryCardProps {
    category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    return (
        <div className="category-card">
            <img src={category.image} alt={category.title} />
            <div className="category-label">
                <h3>{category.title}</h3>
            </div>
        </div>
    );
};

export default CategoryCard;
