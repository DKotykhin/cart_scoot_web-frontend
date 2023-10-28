import React from 'react';

import Image from "next/image";

import styles from './usersSaying.module.scss';

const UsersSaying = () => {
    return (
        <section className={styles.container}>
            <div className={styles.block}>
                <div className={styles.text_box}>
                    <h3 className='block-title'>
                        What are
                        the users saying?
                    </h3>
                    <p className='block-subtitle'>
                        Words From Our Delighted
                        Golfers Praises, Smiles, and Unforgettable
                        Stories Shared by the Car Scoot Community
                    </p>
                </div>
                <div className={styles.card_wrapper}>
                    <div className={styles.card}>
                        <div className={styles.card_title}>
                            <Image
                                src={'/avatars/Sarah.svg'}
                                alt={'Sarah avatar'}
                                width={48}
                                height={48}
                            />
                            <p>Sarah Thompson</p>
                        </div>
                        <p>
                            Car Scoot has truly elevated my golfing experiences! As an avid golfer, I appreciate their seamless booking process and the wide selection of golf carts available.
                        </p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_title}>
                            <Image
                                src={'/avatars/Sarah.svg'}
                                alt={'Sarah avatar'}
                                width={48}
                                height={48}
                            />
                            <p>Sarah Thompson</p>
                        </div>
                        <p>
                            Car Scoot has truly elevated my golfing experiences! As an avid golfer, I appreciate their seamless booking process and the wide selection of golf carts available.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UsersSaying;