import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './thirdBlock.module.scss';

const ThirdBlock = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card_box}>
                <div className={styles.card}>
                    <Image
                        src={'/avatars/John.svg'}
                        alt={'John avatar'}
                        width={56}
                        height={56}
                    />
                    <Image
                        src={'/avatars/car.svg'}
                        alt={'car'}
                        width={56}
                        height={56}
                    />
                    <div className={styles.text}>
                        <p>John Smith</p>
                        <p>Yamaha - White</p>
                    </div>
                    <Image
                        src={'/icons/rate.svg'}
                        alt={'rate'}
                        width={135}
                        height={46}                        
                    />
                </div>
                <div className={styles.card}>
                    <Image
                        src={'/avatars/Emily.svg'}
                        alt={'Emily avatar'}
                        width={56}
                        height={56}
                    />
                    <Image
                        src={'/avatars/car.svg'}
                        alt={'car'}
                        width={56}
                        height={56}
                    />
                    <div className={styles.text}>
                        <p>Emily Johnson</p>
                        <p>Yamaha - Red</p>
                    </div>
                    <Image
                        src={'/icons/rate.svg'}
                        alt={'rate'}
                        width={135}
                        height={46}                        
                    />
                </div>
                <div className={styles.card}>
                    <Image
                        src={'/avatars/Michael.svg'}
                        alt={'Michael avatar'}
                        width={56}
                        height={56}
                    />
                    <Image
                        src={'/avatars/car.svg'}
                        alt={'car'}
                        width={56}
                        height={56}
                    />
                    <div className={styles.text}>
                        <p>Michael Brown</p>
                        <p>Yamaha - Black</p>
                    </div>
                    <Image
                        src={'/icons/rate.svg'}
                        alt={'rate'}
                        width={135}
                        height={46}                       
                    />
                </div>
            </div>
            <div className={styles.text_box}>
                <h3 className='block-title'>
                    Car Scoot&apos;s <br />
                    Advanced Features and <br />
                    Commitment to Golf Cart Safety
                </h3>
                <p className='block-subtitle'>
                    Harnessing Cutting-Edge Technology and Embracing Rigorous <br />
                    Safety Protocols, We Strive to Redefine Golf Cart Rentals, <br />
                    Elevating Every Golfer&apos;s Journey into a Seamlessly Secure and <br />
                    Unforgettable Experience on the Green.
                </p>
                <div className={styles.line}></div>
                <div className={styles.link_box}>
                    <div className={styles.link}>
                        <Image
                            src={'/icons/checkCircle-green.svg'}
                            alt={'check circle'}
                            width={24}
                            height={24}
                        />
                        <span>Safe Cars</span>
                    </div>
                    <div className={styles.link}>
                        <Image
                            src={'/icons/checkCircle-green.svg'}
                            alt={'check circle'}
                            width={24}
                            height={24}
                        />
                        <span>Trusted Drivers</span>
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
                        <span>Modern Cars</span>
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
                <Link href={'/about'}>
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
        </div>
    );
};

export default ThirdBlock;