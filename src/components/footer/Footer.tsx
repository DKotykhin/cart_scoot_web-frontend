import React from 'react';
import Image from "next/image";
import Link from 'next/link';

import { navLinks } from 'constants/navLinks';

import styles from './footer.module.scss';

const Footer = () => {

    return (
        <footer className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.ellipse}></div>
                <Image
                    src={'/logo.svg'}
                    alt={'logo'}
                    width={80}
                    height={80}
                    priority
                />
                <p className={styles.logo}>Cart<span>Scoot</span></p>
                <p className={styles.subtitle}>Share the Ride!</p>
                <div className={styles.social}>
                    <Link href={'https://google.com'}>
                        <Image
                            src={'/icons/youtube.svg'}
                            alt={'youtube'}
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link href={'https://google.com'}>
                        <Image
                            src={'/icons/twitter.svg'}
                            alt={'twitter'}
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link href={'https://google.com'}>
                        <Image
                            src={'/icons/telegram.svg'}
                            alt={'telegram'}
                            width={24}
                            height={24}
                        />
                    </Link>
                </div>
                <div className={styles.line}></div>
                <div className={styles.navigation}>
                    {navLinks.map(item => (
                        <Link href={item.url} key={item.name}>
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className={styles.line}></div>
                <div className={styles.last_block}>
                    <p>Designed by <a href={'https://webxwiz.com'}>WebXwiz</a></p>
                    <p>Privacy policy - 2023</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;