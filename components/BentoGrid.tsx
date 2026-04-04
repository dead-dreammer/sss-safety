'use client';

import React from 'react';
import BentoLargeCard from './BentoLargeCard';
import BentoCard from './BentoCard';

const BentoGrid = () => {
    const handleShopNow = () => {
        window.location.href = '/products';
    };

    return (
        <div className="bento-grid">
            <BentoLargeCard
                label="SYSTEM 01"
                title="IRON WORKER KIT"
                description="Complete upper body and head protection for high-altitude steel workers."
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuC0prQSJKtNPAB78G9DjEvZnaYL8DQOX0Bjn6aPcPnhlT3ASktYxv6AHqNA_6pKtyu1oUeNjRiBGN8OES23td679JIBDGTNcZLEChMGOCJ2z34nn71bntcXh1myDsuNFKuX-3QSuw2ifBTc3IYLVzSlwWss2qVv_ug4ZB6enKMp51l0E01oeYQ27Ij-yG69RWIPEBNjpMv0YmpVflTDNHTQEMlx43jfaZAnfw-O4vU3TX_hpXTy19uR912BhIp6xuUjEtQ2Z2L69p8"
                onAction={handleShopNow}
            />
            <BentoCard
                label="NEW RELEASE"
                title="THERMAL RECON"
                description="Advanced thermal optics for nighttime industrial safety."
                background="#1f1f1f"
            />
            <BentoCard
                label="GLOVE"
                title="SYSTEMS"
                icon="12"
                background="#2a2a2a"
            />
            <BentoCard
                label="PPE"
                title="PROTOCOLS"
                icon="v.2"
                background="#ff7936"
            />
        </div>
    );
};

export default BentoGrid;
