import Image from "next/image";
import Link from 'next/link';

import styles from './topBlock.module.scss';

const TopBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.titleContainer}>
                <h4>About us</h4>
                <h1>Navigate Life, Share the Ride!</h1>
                <h2>
                    Explore the Secrets of the Greens: Embark on Unforgettable Golf Cart Expeditions, Tailored For Your Enjoyment.
                </h2>
            </div>
            <div className={styles.cardContainer}>
                <article className={styles.card}>
                    <Image
                        src={'/icons/user-green.svg'}
                        alt={'avatar'}
                        width={24}
                        height={24}
                        className={styles.logo}
                    />
                    <h4>Find and book a cart</h4>
                    <p>Book a cart and pay in cash</p>
                    <Link href={'/register'}>
                        <button>
                            <span className={styles.button_title_desktop}>Register as user</span>
                            <span className={styles.button_title_mobile}>Register</span>
                            <Image
                                src={'/icons/caretRight.svg'}
                                alt={'arrow'}
                                width={24}
                                height={24}
                            />
                        </button>
                    </Link>
                </article>
                <article className={styles.card}>
                    <Image
                        src={'/icons/driver.svg'}
                        alt={'avatar'}
                        width={24}
                        height={24}
                        className={styles.logo}
                    />
                    <h4>Become a driver</h4>
                    <p>Register as driver and earn money</p>
                    <Link href={'/register'}>
                        <button>
                            <span className={styles.button_title_desktop}>Become a driver</span>
                            <span className={styles.button_title_mobile}>Register</span>
                            <Image
                                src={'/icons/caretRight.svg'}
                                alt={'arrow'}
                                width={24}
                                height={24}
                            />
                        </button>
                    </Link>
                </article>
            </div>
        </section>
    );
};

export default TopBlock;