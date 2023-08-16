import React from 'react';

import Image from 'next/image';

import Header from 'components/header/Header';

import styles from './aboutPage.module.scss';
import Footer from 'components/footer/Footer';

const AboutPage = () => {
    return (
        <>
            <div>About Page</div>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default AboutPage;