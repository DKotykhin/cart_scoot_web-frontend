import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import MiniCard from 'components/miniCard/MiniCard';

import styles from './secondBlock.module.scss';

const SecondBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.text_box}>
                <h3 className='block-title'>
                    Our Journey<br />
                    from Fairway Dreams<br />
                    to Car Scoot&apos;s Tee-rrific Vision
                </h3>
                <p className='block-subtitle'>
                    At Car Scoot, We Pave the Way for Boundless Golfing <br />
                    Excursions, Guided by Passion, Fueled by Precision, and <br />
                    Driven by the Desire to Elevate Every Swing into an <br />
                    Unparalleled Journey of Joy and Discovery.
                </p>
                <div className={styles.line}></div>
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
                            alt={'bell'}
                            width={48}
                            height={48}
                        />
                        <span>Sign up as Driver</span>
                    </Link>
                </div>
                <Link href={'/about'} className={styles.read_more_link}>
                    <button>
                        Read More
                        <Image
                            src={'/icons/caretRight-green.svg'}
                            alt={'arrow'}
                            width={24}
                            height={24}
                        />
                    </button>
                </Link>
            </div>
            <div className={styles.miniCard_box}>
                <div>
                    <MiniCard
                        src='/icons/driver.svg'
                        alt='driver avatar'
                        title='260 +'
                        subtitle='Drivers'
                    />
                    <MiniCard
                        src='/icons/driver.svg'
                        alt='driver avatar'
                        title='260 +'
                        subtitle='Drivers'
                    />
                </div>
                <div className={styles.second_box}>
                    <MiniCard
                        src='/icons/driver.svg'
                        alt='driver avatar'
                        title='260 +'
                        subtitle='Drivers'
                    />
                    <MiniCard
                        src='/icons/driver.svg'
                        alt='driver avatar'
                        title='260 +'
                        subtitle='Drivers'
                    />
                </div>
            </div>
        </section>
    );
};

export default SecondBlock;