import React from 'react';

import type { Metadata } from 'next';

import TopBlock from './components/topBlock/TopBlock';
import FirstBlock from './components/firstBlock/FirstBlock';
import SecondBlock from './components/secondBlock/SecondBlock';
import Accordion from './components/accordion/Accordion';
import Footer from 'components/footer/Footer';

import { aboutPageMetaData } from 'metadata/metadata';

export const metadata: Metadata = aboutPageMetaData;

const AboutPage = () => {
    return (
        <>
            <TopBlock />
            <FirstBlock />
            <SecondBlock />
            <Accordion />
            <Footer />
        </>
    );
};

export default AboutPage;