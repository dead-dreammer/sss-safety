import React from 'react';
import Link from 'next/link';

const NavActions: React.FC = () => {
    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-black">
                <button className="text-lg hover:text-orange-600 transition-colors active:scale-95 cursor-pointer">👤</button>
                <button className="text-lg hover:text-orange-600 transition-colors active:scale-95 cursor-pointer">🛒</button>
            </div>
            <Link href="/products" className="btn btn-primary">
                GET PROTECTED
            </Link>
        </div>
    );
};

export default NavActions;
