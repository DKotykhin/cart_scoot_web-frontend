import React from 'react';

import type { Metadata } from 'next';

import Footer from 'components/footer/Footer';
import { FirstBlock, ForthBlock, LastBlock, SecondBlock, ThirdBlock, TopBlock } from './components/_index';
import { mainPageMetaData } from 'metadata/metadata';

export const metadata: Metadata = mainPageMetaData;

const HomePage = () => {
    return (
        <>
            <TopBlock />
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <ForthBlock />
            <LastBlock />
            <Footer />
        </>
    );
};

export default HomePage;
