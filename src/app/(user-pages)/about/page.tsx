import React from 'react';

import type { Metadata } from 'next';

import TopBlock from './components/topBlock/TopBlock';
import SolutionBlock from './components/solutionBlock/SolutionBlock';
import JourneyBlock from './components/journeyBlock/JourneyBlock';
import Accordion from './components/accordion/Accordion';
import Footer from 'components/footer/Footer';

import { aboutPageMetaData } from 'metadata/metadata';

export const metadata: Metadata = aboutPageMetaData;

const AboutPage = () => {
    return (
        <>
            <TopBlock />
            <SolutionBlock />
            <JourneyBlock />
            <Accordion />
            <Footer />
        </>
    );
};

export default AboutPage;