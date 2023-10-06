import React from 'react';

import type { Metadata } from 'next';

import Footer from 'components/footer/Footer';
import TopBlock from './components/topBlock/TopBlock';
import MiddleBlock from './components/middleBlock/MiddleBlock';
import Accordion from './components/accordion/Accordion';

import { aboutPageMetaData } from 'metadata/metadata';

export const metadata: Metadata = aboutPageMetaData;

const AboutPage = () => {
    return (
        <>
            <TopBlock />
            <MiddleBlock />
            <Accordion />
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default AboutPage;