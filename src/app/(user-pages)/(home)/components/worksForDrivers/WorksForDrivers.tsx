import React from 'react';

import Image from 'next/image';

import styles from './worksForDrivers.module.scss';

const WorksForDrivers = () => {
    return (
        <section className={styles.container}>
            <div className={styles.block}>
                <div className={styles.main_box}>
                    <h3 className='block-title'>
                        How it works for drivers?
                    </h3>
                    <p className='block-subtitle'>
                        Like to ride. Meet new people. Provide service. If you legally can operate a golf cart in Florida then read on
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
                        Take and Enjoy the ride
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WorksForDrivers;