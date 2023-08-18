import React from 'react';

import Image from "next/image";

import styles from './forthBlock.module.scss';

const ForthBlock = () => {
    return (
        <div className={styles.container}>
            <h3 className='block-title'>Why Us?</h3>
            <p  className='block-subtitle'>
                Discover a Golfer&apos;s Haven - Personalized Tee Time Selections
            </p>
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
                <div className={`${styles.card} ${styles.margin}`}>
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
                </div>
                <div className={styles.card}>
                    <Image
                        src={'/icons/deviceMobile.svg'}
                        alt={'money'}
                        width={32}
                        height={32}
                    />
                    <div className={styles.text_box}>
                        <h4>Mobile friendly</h4>
                        <h5>Embrace Green Seamlessly with Mobile-Friendly platform</h5>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ForthBlock;