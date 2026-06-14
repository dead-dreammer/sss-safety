import React from 'react';

const FooterSocial: React.FC = () => {
    return (
        <div className="flex gap-4">
            <button
                className="hover:scale-110 transition-transform"
                style={{ color: 'var(--primary-fixed)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                aria-label="Analytics"
            >
                <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>bar_chart</span>
            </button>
            <button
                className="hover:scale-110 transition-transform"
                style={{ color: 'var(--primary-fixed)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                aria-label="Compliance"
            >
                <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>security</span>
            </button>
        </div>
    );
};

export default FooterSocial;
