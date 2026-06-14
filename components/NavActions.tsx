import React from 'react';
import Link from 'next/link';

const NavActions: React.FC = () => {
    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
                <button
                    className="hover:text-orange-600 transition-colors active:scale-95 cursor-pointer"
                    style={{ color: '#000', display: 'flex', alignItems: 'center' }}
                    aria-label="Account"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>person</span>
                </button>
                <button
                    className="hover:text-orange-600 transition-colors active:scale-95 cursor-pointer"
                    style={{ color: '#000', display: 'flex', alignItems: 'center' }}
                    aria-label="Cart"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>shopping_cart</span>
                </button>
            </div>
            <Link href="/products" className="btn btn-primary">
                GET PROTECTED
            </Link>
        </div>
    );
};

export default NavActions;
