import React from 'react';

interface SidebarProps {
    filters: {
        structuralLoad: string[];
        visibilityRange: string;
    };
    onFilterChange: (filterType: string, value: string | string[]) => void;
}

const ProductListingSidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
    const handleCheckboxChange = (value: string) => {
        const current = filters.structuralLoad;
        if (current.includes(value)) {
            onFilterChange('structuralLoad', current.filter(item => item !== value));
        } else {
            onFilterChange('structuralLoad', [...current, value]);
        }
    };

    const handleRadioChange = (value: string) => {
        onFilterChange('visibilityRange', value);
    };

    return (
        <aside style={{ width: '17rem', flexShrink: 0, background: '#0d0d0d', color: 'white', padding: '2rem' }}>
            <div style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div>
                    <h3
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 900,
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: 'white',
                            marginBottom: '1.25rem',
                        }}
                    >
                        Structural Load
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                        {['HEAVY DUTY', 'INDUSTRIAL GRADE', 'TECHNICAL SPECS'].map((option) => (
                            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={filters.structuralLoad.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                    style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--primary-fixed)', cursor: 'pointer' }}
                                />
                                <span
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        color: 'white',
                                    }}
                                >
                                    {option}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 900,
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: 'white',
                            marginBottom: '1.25rem',
                        }}
                    >
                        Visibility Range
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                        {['CLASS 1: LOW', 'CLASS 2: MEDIUM', 'CLASS 3: ULTRA-HIGH'].map((option) => (
                            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="visibility"
                                    checked={filters.visibilityRange === option}
                                    onChange={() => handleRadioChange(option)}
                                    style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--primary-fixed)', cursor: 'pointer' }}
                                />
                                <span
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        color: 'white',
                                    }}
                                >
                                    {option}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        background: '#0d0d0d',
                        padding: '1.25rem',
                        borderLeft: '4px solid var(--primary-fixed)',
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.7rem',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: 'var(--primary-fixed)',
                            marginBottom: '0.5rem',
                        }}
                    >
                        Compliance Alert
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#aaaaaa', lineHeight: 1.6 }}>
                        All gear listed meets OSHA 1926.100(a) standards for industrial head and eye protection.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default ProductListingSidebar;
