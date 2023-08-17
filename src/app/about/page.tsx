import React from 'react';

import Footer from 'components/footer/Footer';
import TopBlock from './components/topBlock/TopBlock';
import MiddleBlock from './components/middleBlock/MiddleBlock';
import Accordion from './components/accordion/Accordion';

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