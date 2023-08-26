import React from 'react';

import Footer from 'components/footer/Footer';
import { FirstBlock, ForthBlock, LastBlock, SecondBlock, ThirdBlock, TopBlock } from './components/_index';

const HomePage = () => {
    return (
        <>
            <TopBlock />
            {/* <div style={{ backgroundColor: 'white', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'white', maxWidth: '1440px' }}> */}
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <ForthBlock />
            <LastBlock />
            {/* </div> */}
            {/* </div> */}
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default HomePage;
