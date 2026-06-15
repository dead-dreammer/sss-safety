'use client';

import React from 'react';
import SectionCard from './SectionCard';

const BulkOrdering = () => {
    const handleBulkOrderingClick = () => {
        window.location.href = '#bulk-quote';
    };

    const handleDeploymentServicesClick = () => {
        window.location.href = '#deployment-services';
    };

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2">
            <SectionCard
                title="BULK ORDERING"
                accentColor="black"
                description="Outfit your entire workforce with standardized precision. Enterprise-level logistics for massive deployments."
                buttonText="REQUEST QUOTE"
                backgroundColor="white"
                onButtonClick={handleBulkOrderingClick}
            />
            <SectionCard
                title="DEPLOYMENT SERVICES"
                accentColor="orange"
                description="We don't just ship gear. We oversee onsite training and compliance protocols for complex industrial environments."
                buttonText="VIEW SERVICES"
                backgroundColor="light-gray"
                onButtonClick={handleDeploymentServicesClick}
            />
        </section>
    );
};

export default BulkOrdering;
