import React from 'react';

import Image from 'next/image';

import styles from './topBlock.module.scss';
import PickupForm from './pickupForm/PickupForm';

const TopBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.main_box}>
                <div className={styles.text_box}>
                    <h1>
                        Tee Up,
                        Ride On, and
                        <span>
                            Play&nbsp;
                            <span>
                                Like a Pro!
                                <Image
                                    src={'/line.svg'}
                                    alt={'line'}
                                    width={349}
                                    height={12}
                                />
                            </span>
                        </span>
                    </h1>
                    <h2>
                        Unleash Your Golfing Passion with Seamless Tee Time Bookings and Effortless Transportation Services!
                    </h2>
                </div>
                <div className={styles.form_wrapper}>
                    <div className={styles.shadow_1} />
                    <div className={styles.shadow_2} />
                    <div className={styles.form_box}>
                        <PickupForm />
                    </div>
                </div>
            </div>
            <div className={styles.arrow_box}>
                <div className={styles.arrow}>
                    <Image
                        src={'/icons/caretDown.svg'}
                        alt={'line'}
                        width={24}
                        height={24}
                    />
                </div>
            </div>
        </section>
    );
};

export default TopBlock;