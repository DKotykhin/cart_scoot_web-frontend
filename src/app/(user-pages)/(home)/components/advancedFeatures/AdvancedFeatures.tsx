import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './advancedFeatures.module.scss';

const starsArray = [1, 2, 3, 4, 5];

const AdvancedFeatures = () => {
    return (
        <section className={styles.container}>
            {/* <div className={styles.card_box}>
                <div className={styles.card}>
                    <div className={styles.avatar_wrapper}>
                        <Image
                            src={'/avatars/John.svg'}
                            alt={'John avatar'}
                            width={56}
                            height={56}
                            className={styles.avatar}
                        />
                        <Image
                            src={'/avatars/car.svg'}
                            alt={'car'}
                            width={56}
                            height={56}
                        />
                    </div>
                    <div className={styles.card_wrapper}>
                        <div className={styles.text}>
                            <p>John Smith</p>
                            <p>Yamaha - White</p>
                        </div>
                        <div className={styles.stars_wrapper}>
                            {starsArray.map(star => (
                                <Image
                                    src={'/icons/star-green.svg'}
                                    alt={'rate'}
                                    width={20}
                                    height={20}
                                    key={star}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.avatar_wrapper}>
                        <Image
                            src={'/avatars/Emily.svg'}
                            alt={'Emily avatar'}
                            width={56}
                            height={56}
                            className={styles.avatar}
                        />
                        <Image
                            src={'/avatars/car.svg'}
                            alt={'car'}
                            width={56}
                            height={56}
                        />
                    </div>
                    <div className={styles.card_wrapper}>
                        <div className={styles.text}>
                            <p>Emily Johnson</p>
                            <p>Yamaha - Red</p>
                        </div>
                        <div className={styles.stars_wrapper}>
                            {starsArray.map(star => (
                                <Image
                                    src={'/icons/star-green.svg'}
                                    alt={'rate'}
                                    width={20}
                                    height={20}
                                    key={star}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.avatar_wrapper}>
                        <Image
                            src={'/avatars/Michael.svg'}
                            alt={'Michael avatar'}
                            width={56}
                            height={56}
                            className={styles.avatar}
                        />
                        <Image
                            src={'/avatars/car.svg'}
                            alt={'car'}
                            width={56}
                            height={56}
                        />
                    </div>
                    <div className={styles.card_wrapper}>
                        <div className={styles.text}>
                            <p>Michael Brown</p>
                            <p>Yamaha - Black</p>
                        </div>
                        <div className={styles.stars_wrapper}>
                            {starsArray.map(star => (
                                <Image
                                    src={'/icons/star-green.svg'}
                                    alt={'rate'}
                                    width={20}
                                    height={20}
                                    key={star}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
            <div className={styles.image_box}>
                <Image
                    src={'/home-22.jpg'}
                    alt={'carts'}
                    width={800}
                    height={533}
                />
            </div>
            <div className={styles.text_box}>
                <h3 className='block-title'>
                    At CartScoot your adventure is just one click away. Request your ride and have fun.
                </h3>
                {/* <p className='block-subtitle'>
                    Harnessing Cutting-Edge Technology and Embracing Rigorous <br />
                    Safety Protocols, We Strive to Redefine Golf Cart Rentals, <br />
                    Elevating Every Golfer&apos;s Journey into a Seamlessly Secure and <br />
                    Unforgettable Experience on the Green.
                </p> */}
                <div className='line'></div>
                <div className={styles.link_wrapper}>
                    <div className={styles.link_box}>
                        <div className={styles.link}>
                            <Image
                                src={'/icons/checkCircle-green.svg'}
                                alt={'check circle'}
                                width={24}
                                height={24}
                            />
                            <span>Safe and Modern cars</span>
                        </div>
                        <div className={styles.link}>
                            <Image
                                src={'/icons/checkCircle-green.svg'}
                                alt={'check circle'}
                                width={24}
                                height={24}
                            />
                            <span>Super Convenience</span>
                        </div>
                    </div>
                    <div className={styles.link_box}>
                        <div className={styles.link}>
                            <Image
                                src={'/icons/checkCircle-green.svg'}
                                alt={'check circle'}
                                width={24}
                                height={24}
                            />
                            <span>Trusted Drivers</span>
                        </div>
                        <div className={styles.link}>
                            <Image
                                src={'/icons/checkCircle-green.svg'}
                                alt={'check circle'}
                                width={24}
                                height={24}
                            />
                            <span>Suitable for all need</span>
                        </div>
                    </div>
                </div>
                <Link href={'/map'}>
                    <button>
                        Book Now
                        <Image
                            src={'/icons/caretRight-green.svg'}
                            alt={'arrow'}
                            width={24}
                            height={24}
                        />
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default AdvancedFeatures;