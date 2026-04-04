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
        <aside className="w-full md:w-72 shrink-0 bg-black text-white p-6">
            <div className="sticky top-32 space-y-10">
                <section>
                    <h3 className="font-headline font-bold text-xs uppercase tracking-widest mb-6 text-white">Structural Load</h3>
                    <div className="space-y-4">
                        {['HEAVY DUTY', 'INDUSTRIAL GRADE', 'TECHNICAL SPECS'].map((option) => (
                            <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.structuralLoad.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                    className="w-5 h-5 border-2 border-orange-600 accent-orange-600"
                                />
                                <span className="font-headline text-sm font-bold tracking-tight group-hover:text-orange-600 transition-colors">
                                    {option}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="font-headline font-bold text-xs uppercase tracking-widest mb-6 text-white">Visibility Range</h3>
                    <div className="space-y-4">
                        {['CLASS 1: LOW', 'CLASS 2: MEDIUM', 'CLASS 3: ULTRA-HIGH'].map((option) => (
                            <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="visibility"
                                    checked={filters.visibilityRange === option}
                                    onChange={() => handleRadioChange(option)}
                                    className="w-5 h-5 border-2 border-orange-600 accent-orange-600"
                                />
                                <span className="font-headline text-sm font-bold tracking-tight">
                                    {option}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                <section className="bg-black p-6 border-l-4 border-orange-600">
                    <p className="font-headline text-xs font-black uppercase mb-2">Compliance Alert</p>
                    <p className="text-xs text-white leading-relaxed">
                        All gear listed meets OSHA 1926.100(a) standards for industrial head and eye protection.
                    </p>
                </section>
            </div>
        </aside>
    );
};

export default ProductListingSidebar;
