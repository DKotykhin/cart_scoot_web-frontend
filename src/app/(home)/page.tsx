import React from 'react';

import Footer from 'components/footer/Footer';
import TopBlock from './components/topBlock/TopBlock';
import MiddleBlock from './components/middleBlock/MiddleBlock';

const HomePage = () => {
    return (
        <>
            <TopBlock />
            <MiddleBlock />
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default HomePage;
