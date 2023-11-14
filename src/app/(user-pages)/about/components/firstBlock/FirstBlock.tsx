import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './firstBlock.module.scss';

const FirstBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.text_box}>
                    <h3 className='block-title'>
                        Enjoy your trip with CartScoot
                    </h3>
                    <p className='block-subtitle'>
                        CartScoot uses the latest technology and implements strict safety measures, enhancing each journey with a seamlessly secure and memorable experience. The drivers are professionals and all our cars are safe to drive and contemporary.
                    </p>
                    <div className='line' />
                    <div className={styles.link_box}>
                        <Link href={'/map'} className={styles.link}>
                            <Image
                                src={'/icons/bell.svg'}
                                alt={'bell'}
                                width={48}
                                height={48}
                            />
                            <span>Book Golf Car</span>
                        </Link>
                        <Link href={'/register'} className={styles.link}>
                            <Image
                                src={'/icons/driver.svg'}
                                alt={'driver'}
                                width={48}
                                height={48}
                            />
                            <span>Become a Driver</span>
                        </Link>
                    </div>
                </div>
                <div>
                    <Image
                        src={'/mapAbout.svg'}
                        alt={'map'}
                        width={536}
                        height={536}
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default FirstBlock;