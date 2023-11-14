import React from 'react';

import type { Metadata } from 'next';

import Footer from 'components/footer/Footer';
import Advertisement from 'components/advertisement/Advertisement';
import { WorksForRiders, WorksForDrivers, WhyUs, UsersSaying, ProvideService, AdvancedFeatures, TopBlock } from './components/_index';

import { mainPageMetaData } from 'metadata/metadata';
import { getPageAdvertisement } from 'apollo/services/getPageAdvertisement';
import { PageTypes } from 'types/advertisementTypes';

export const metadata: Metadata = mainPageMetaData;

import styles from './homePage.module.scss';

const HomePage = async () => {

    const advertisement = await getPageAdvertisement(PageTypes.main);

    return (
        <>
            <TopBlock />
            <WorksForRiders />
            <ProvideService />
            <AdvancedFeatures />
            <WorksForDrivers />
            <div className={styles.advertisement}>
                <Advertisement advertisement={advertisement?.getPageAdvertisement} />
            </div>
            <WhyUs />
            <UsersSaying />
            <Footer />
        </>
    );
};

export default HomePage;
