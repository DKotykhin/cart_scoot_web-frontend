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
                        Like to ride. Meet new people. Get to know your neighbors while providing needed and fun service. If you legally can operate a golf cart then read on and click “Register”
                    </p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.step_box}>
                    <Image
                        src={'/icons/user-black.svg'}
                        alt={'user'}
                        width={24}
                        height={24}
                    />
                    <p className={styles.step_text}>
                        Register as a driver
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
                        Provide times you are available
                    </p>
                </div>
                <div className={styles.step_box}>
                    <Image
                        src={'/icons/magnifyingGlass.svg'}
                        alt={'cursor'}
                        width={24}
                        height={24}
                    />
                    <p className={styles.step_text}>
                        Connect with the rider
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
                        Provide excellent service and have fun
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WorksForDrivers;