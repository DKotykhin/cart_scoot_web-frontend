import React from 'react';

import Image from "next/image";

import MiniCard from 'components/miniCard/MiniCard';

import styles from './middleBlock.module.scss';

const MiddleBlock = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.text_box}>
                    <h3 className='block-title'>
                        Your Premier <br />
                        Golf Cart Rental Solution
                    </h3>
                    <p className='block-subtitle'>
                        Unlock Unparalleled Convenience and Style on the Fairway <br />
                        with Our Top-of-the-Line Golf Cart Rentals. <br />
                        Discover Luxury and Ease with Our Golf Cart Rental Services. <br />
                        our Ideal Golf Cart Awaits at Our Rental Hub <br />
                    </p>
                </div>
                <Image
                    src={'/mapAbout.svg'}
                    alt={'map'}
                    width={536}
                    height={536}
                />
            </div>
            <div className={styles.container}>
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
                        <div className={styles.link}>
                            <Image
                                src={'/icons/bell.svg'}
                                alt={'bell'}
                                width={48}
                                height={48}
                            />
                            <span>Book Golf Car</span>                            
                        </div>
                        <div className={styles.link}>
                            <Image
                                src={'/icons/driver.svg'}
                                alt={'bell'}
                                width={48}
                                height={48}
                            />
                            <span>Sign up as Driver</span>                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MiddleBlock;