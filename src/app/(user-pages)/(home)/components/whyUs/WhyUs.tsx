import React from 'react';

import Image from "next/image";

import styles from './whyUs.module.scss';

const WhyUs = () => {
    return (
        <section className={styles.container}>
            <div className={styles.title_box}>
                <h3 className='block-title'>
                    Why Us?
                </h3>
                <p className='block-subtitle'>
                    We are your community, We are your neighbors
                </p>
            </div>
            <div className={styles.card_box}>
                <div className={styles.card}>
                    <Image
                        src={'/icons/money.svg'}
                        alt={'money'}
                        width={32}
                        height={32}
                    />
                    <div className={styles.text_box}>
                        <h4>Free to use</h4>
                        <h5>Your Golf Companion, Always Free to Use</h5>
                    </div>
                </div>
                {/* <div className={styles.card}>
                    <Image
                        src={'/icons/headset.svg'}
                        alt={'money'}
                        width={32}
                        height={32}
                    />
                    <div className={styles.text_box}>
                        <h4>Online support</h4>
                        <h5>24/7 Online Support - Ready to Assist You</h5>
                    </div>
                </div> */}
                <div className={styles.card}>
                    <Image
                        src={'/icons/deviceMobile.svg'}
                        alt={'money'}
                        width={32}
                        height={32}
                    />
                    <div className={styles.text_box}>
                        <h4>Mobile friendly</h4>
                        <h5>Mobile-Friendly Platform for when you on the Go!</h5>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyUs;