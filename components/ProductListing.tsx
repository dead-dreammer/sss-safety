'use client';

import React, { useState, useMemo } from 'react';
import ProductListingSidebar from './ProductListingSidebar';
import ProductHeader from './ProductHeader';
import ProductGridComponent from './ProductGridComponent';

const ProductListing = () => {
    const [filters, setFilters] = useState({
        structuralLoad: ['INDUSTRIAL GRADE'],
        visibilityRange: 'CLASS 2: MEDIUM'
    });
    const [sortBy, setSortBy] = useState('name');

    const products = [
        {
            id: 1,
            title: 'Apex Sentinel V2 Helmet',
            price: 189.00,
            category: 'Industrial Grade',
            tags: ['Carbon Fiber', 'Class E'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHzKDbC1AVSFgHWp_t2eC3p0JoKnDqrjOQTpDyLiHEkca-kmjbhTsk9pk7AzDatFI95oiI_A0CZCwFaFNI14R1tgsyBJFfHJzb6ZyUDzYCBvVBtJ1_ql6tBygy6l_K0yPHFuxX-wZRYNS0BFx8BaPmbCUCRgiz22pPSq_zqUzBHttr0RbiweRD2Fj0Jy_LftmOGMkVCfMjVs6RehJjNcLtyxm072G8JYqDeRCvoN5fBJ-pzpLCDdQiI-GGps9yD0wB35JddMmCk4c'
        },
        {
            id: 2,
            title: 'Photon Flux Rig Vest',
            price: 74.50,
            category: 'Visibility Class 3',
            tags: ['3M Reflective', 'Multi-Pocket'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeiahvgdjODYJqUcZ0YUtU1DZAX0eMneAXb_0U3Qx4r6t1_kcOVmQN4S4l4sZ4UCOvdZHmqI0G-65Rol_Q093dzgEZ9b4KUVfoxx_aG8YpGsUhNmpzDxsTpuxuinLXXs69BvtRYUAJW7jgOoYJ3N20gYkXHZmTpiSD7Oy5R5eLofKsy70y9pnpVJ2A-ioOVM4cA2sA0sjFV6523UyNQWQvR7jDq_zsiVXQOA6GMUpRfzYq2HFWwb2dhCa9PTCWEjZwgaM7JxSkC7U'
        },
        {
            id: 3,
            title: 'Ocular Guard G-1000',
            price: 112.00,
            category: 'Technical Specs',
            tags: ['Anti-Fog', 'ANSI Z87.1'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoICf_F4G8_F8X6_XPnN3X2_tdfcurhjS03f_1C-u_uaHQvMm6pmC4i2jF3CJIhmqldAo95UHMHatyAvo42usOS8AFKDDlY2bdW4eBPvmgQT7m23mzoQcqBYIHOMnEl6ar3Z30l1Hl_ELMSokSvQfBXCkuN7LO5FcADwuMrrLYl9V1gkDhIhX8nw3EF2Df3ZiyrCKfmCuD6cpAbQg0JlwQmCuMdywj3ocuunQ9w0cVY1Q3NxVBYVC5sjNfpBizlvmz2HdaqIkccL8'
        },
        {
            id: 4,
            title: 'Titan Grip Work Boots',
            price: 245.00,
            category: 'Heavy Duty',
            tags: ['Steel Toe', 'EH Rated'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0prQSJKtNPAB78G9DjEvZnaYL8DQOX0Bjn6aPcPnhlT3ASktYxv6AHqNA_6pKtyu1oUeNjRiBGN8OES23td679JIBDGTNcZLEChMGOCJ2z34nn71bntcXh1myDsuNFKuX-3QSuw2ifBTc3IYLVzSlwWss2qVv_ug4ZB6enKMp51l0E01oeYQ27Ij-yG69RWIPEBNjpMv0YmpVflTDNHTQEMlx43jfaZAnfw-O4vU3TX_hpXTy19uR912BhIp6xuUjEtQ2Z2L69p8'
        },
        {
            id: 5,
            title: 'Guardian Flex Gloves',
            price: 38.00,
            category: 'Technical Specs',
            tags: ['Leather Reinforced', 'Dexterity+'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFMJb_6ABYxzjPJMDcm4unjYwJQdjdx67YsZoLSC8o3JB1bAo3Z4epDjovIe5Sj4e9m6pEMLvHtnMrvs7qvG86ffKA6NoVUIidO-XMiMgi1mQpGL4ukzfzGZw4ua5SUJ5aqtlkwMfzTDrGw2EJArygMd348oIXvV55jXKs6F2Q1TfLpH4jfBH_BeT81eeFHFrFdWq2REUUsVRjjh08MSRqPtTn6S-vXRm8d7Vi8m9lp6hPl7gUVaAdBcylPbPnzbSONEq0hpATlo0'
        },
        {
            id: 6,
            title: 'Nexus Shield Harness',
            price: 299.99,
            category: 'Heavy Duty',
            tags: ['5-Point System', 'ANSI Z359.11'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFMJb_6ABYxzjPJMDcm4unjYwJQdjdx67YsZoLSC8o3JB1bAo3Z4epDjovIe5Sj4e9m6pEMLvHtnMrvs7qvG86ffKA6NoVUIidO-XMiMgi1mQpGL4ukzfzGZw4ua5SUJ5aqtlkwMfzTDrGw2EJArygMd348oIXvV55jXKs6F2Q1TfLpH4jfBH_BeT81eeFHFrFdWq2REUUsVRjjh08MSRqPtTn6S-vXRm8d7Vi8m9lp6hPl7gUVaAdBcylPbPnzbSONEq0hpATlo0'
        }
    ];

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            if (sortBy === 'name') return a.title.localeCompare(b.title);
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0;
        });
    }, [sortBy]);

    const handleFilterChange = (filterType: string, value: string | string[]) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    return (
        <main className="section-dark max-w-7xl mx-auto px-12 py-24 flex flex-col md:flex-row gap-12">
            <ProductListingSidebar filters={filters} onFilterChange={handleFilterChange} />
            <div className="flex-1">
                <ProductHeader sortBy={sortBy} onSortChange={handleSortChange} />
                <ProductGridComponent products={sortedProducts} />
            </div>
        </main>
    );
};

export default ProductListing;
