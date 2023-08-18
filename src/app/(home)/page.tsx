import React from 'react';

import Footer from 'components/footer/Footer';
import { FirstBlock, ForthBlock, LastBlock, SecondBlock, ThirdBlock, TopBlock } from './components/_index';

const HomePage = () => {
    return (
        <>
            <TopBlock />
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <ForthBlock />
            <LastBlock />
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default HomePage;
