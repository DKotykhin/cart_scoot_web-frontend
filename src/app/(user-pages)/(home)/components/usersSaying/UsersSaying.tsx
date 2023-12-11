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
                        Stories Shared by the Cart Scoot Community
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
                            My trip was super fun! I enjoyed the comfort and I didn&apos;t have to worry about anything because I know that CartScoot&apos;s services are extremely safe.
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
                            My journey was amazing. The driver was amicable and kind to me. The car was modern and really comfortable, I could relax. Highly recommend.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UsersSaying;