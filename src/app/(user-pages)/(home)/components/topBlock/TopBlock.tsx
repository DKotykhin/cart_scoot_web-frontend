import React from 'react';

import Image from 'next/image';
import PickupForm from './pickupForm/PickupForm';

import styles from './topBlock.module.scss';

const TopBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.main_box}>
                <div className={styles.text_box}>
                    <h1>
                        Make An Order, Find A Cart,
                        <span>
                            Travel Far!
                            <Image
                                src={'/line.svg'}
                                alt={'line'}
                                width={349}
                                height={12}
                            />
                        </span>
                    </h1>
                    <h2>
                        Ignite your love for transportation with our services that make your trip much more convenient!
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