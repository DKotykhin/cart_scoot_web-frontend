import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './topBlock.module.scss';

const TopBlock = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h4>About us</h4>
                <h1>Your Golf Cart Booking Solution</h1>
                <h2>
                    Discover the Story Behind the Greens: A Commitment to Exceptional Golf Cart Journeys, Crafted Just For You
                </h2>
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <Image
                        src={'/icons/user.svg'}
                        alt={'avatar'}
                        width={48}
                        height={48}
                        className={styles.logo}
                    />
                    <h4>Find and book a cart</h4>
                    <p>Book a cart and pay in cash</p>
                    <Link href={'/register'}>
                        <button>
                            Register as user
                            <Image
                                src={'/icons/caretRight.svg'}
                                alt={'arrow'}
                                width={24}
                                height={24}
                            />
                        </button>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Image
                        src={'/icons/driver.svg'}
                        alt={'avatar'}
                        width={48}
                        height={48}
                        className={styles.logo}
                    />
                    <h4>Become a driver</h4>
                    <p>Register as driver and earn money</p>
                    <Link href={'/register'}>
                        <button>
                            Become a driver
                            <Image
                                src={'/icons/caretRight.svg'}
                                alt={'arrow'}
                                width={48}
                                height={48}
                                className={styles.logo}
                            />
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default TopBlock;