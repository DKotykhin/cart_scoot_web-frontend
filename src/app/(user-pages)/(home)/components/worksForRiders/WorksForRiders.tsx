import React from 'react';

import Image from 'next/image';

import styles from './worksForRiders.module.scss';

const WorksForRiders = () => {
    return (
        <section className={styles.container}>
            <div className={styles.block}>
                <div className={styles.main_box}>
                    <h3 className='block-title'>
                        How it works for riders?
                    </h3>
                    <p className='block-subtitle'>
                        The best and fun way to do it is in a golf cart. The best and fun way to do it is in a golf cart.
                    </p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.step_box}>
                    <Image
                        src={'/icons/flag-black.svg'}
                        alt={'flag'}
                        width={24}
                        height={24}
                    />
                    <p className={styles.step_text}>
                        Put the destination and time
                    </p>
                </div>
                <div className={styles.step_box}>
                    <Image
                        src={'/icons/cursor.svg'}
                        alt={'cursor'}
                        width={24}
                        height={24}
                    />
                    <p className={styles.step_text}>
                        Select and confirm a driver you like
                    </p>
                </div>
                <div className={styles.step_box}>
                    <Image
                        src={'/icons/checkCircle.svg'}
                        alt={'circle'}
                        width={24}
                        height={24}
                    />
                    <p className={styles.step_text}>
                        Enjoy the ride
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WorksForRiders;