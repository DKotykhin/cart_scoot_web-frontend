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
                    <Link href={process.env.NEXT_PUBLIC_FACEBOOK || '#'} target='_blank'>
                        <Image
                            src={'/icons/facebook.svg'}
                            alt={'facebook'}
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link href={process.env.NEXT_PUBLIC_TWITTER || '#'} target='_blank'>
                        <Image
                            src={'/icons/twitter.svg'}
                            alt={'twitter'}
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link href={process.env.NEXT_PUBLIC_INSTAGRAM || '#'} target='_blank'>
                        <Image
                            src={'/icons/instagram.svg'}
                            alt={'instagram'}
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
                    <p>
                        Designed by <a href={'https://webxwiz.com'} target='_blank'>WebXwiz</a>
                    </p>
                    <Link href={process.env.NEXT_PUBLIC_PRIVACY_POLICY || '#'} target='_blank'>
                        <p>Privacy policy - 2023</p>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;