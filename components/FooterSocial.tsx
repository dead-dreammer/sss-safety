import React from 'react';

const FooterSocial: React.FC = () => {
    return (
        <div className="flex gap-4">
            <button className="text-orange-600 hover:scale-110 transition-transform text-xl">📊</button>
            <button className="text-orange-600 hover:scale-110 transition-transform text-xl">🛡️</button>
        </div>
    );
};

export default FooterSocial;
