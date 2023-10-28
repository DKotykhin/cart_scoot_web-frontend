import React from 'react';

import type { Metadata } from 'next';

import Footer from 'components/footer/Footer';
import { WorksForRiders, WorksForDrivers, WhyUs, UsersSaying, ProvideService, AdvancedFeatures, TopBlock } from './components/_index';
import { mainPageMetaData } from 'metadata/metadata';

export const metadata: Metadata = mainPageMetaData;

const HomePage = () => {
    return (
        <>
            <TopBlock />
            <WorksForRiders />
            <ProvideService />
            {/* <AdvancedFeatures /> */}
            <WorksForDrivers />
            <WhyUs />
            <UsersSaying />
            <Footer />
        </>
    );
};

export default HomePage;
