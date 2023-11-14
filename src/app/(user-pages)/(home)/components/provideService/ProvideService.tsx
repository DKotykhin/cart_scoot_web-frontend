import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import MiniCard from 'components/miniCard/MiniCard';

import styles from './provideService.module.scss';

const ProvideService = () => {
    return (
        <section className={styles.container}>
            <div className={styles.text_box}>
                <h3 className='block-title'>
                    Our Journey <br />
                    from Fairway Dreams <br />
                    to Car Scoot&apos;s Tee-rrific Vision
                </h3>
                <p className='block-subtitle'>
                    With Car Scoot, We Lay The Path For Limitless Road And Golf Adventures, Led by Enthusiasm, Powered By Accuracy, Motivated by The Aim to Transform Each Swing Into Happiness!
                </p>
                <div className='line' />
                <div className={styles.link_box}>
                    <Link href={'/map'} className={styles.link}>
                        <Image
                            src={'/icons/bell.svg'}
                            alt={'bell'}
                            width={48}
                            height={48}
                        />
                        <span>Book Golf Car</span>
                    </Link>
                    <Link href={'/register'} className={styles.link}>
                        <Image
                            src={'/icons/driver.svg'}
                            alt={'bell'}
                            width={48}
                            height={48}
                        />
                        <span>Become a Driver</span>
                    </Link>
                </div>
                <Link href={'/about'} className={styles.read_more_link}>
                    <button>
                        Read More
                        <Image
                            src={'/icons/caretRight-green.svg'}
                            alt={'arrow'}
                            width={24}
                            height={24}
                        />
                    </button>
                </Link>
            </div>
            <div className={styles.miniCard_box}>
                <div className={styles.first_box}>
                    <MiniCard
                        src='/icons/driver.svg'
                        alt='driver'
                        title='100 +'
                        subtitle='Drivers'
                    />
                    <MiniCard
                        src='/icons/carSimple.svg'
                        alt='car'
                        title='2'
                        subtitle='Type of Cars'
                    />
                </div>
                <div className={styles.second_box}>
                    <MiniCard
                        src='/icons/user-green-thin.svg'
                        alt='user'
                        title='5k +'
                        subtitle='Active users'
                    />
                    <MiniCard
                        src='/icons/mapPin-green.svg'
                        alt='location'
                        title='10 +'
                        subtitle='Locations & Cities'
                    />
                </div>
            </div>
        </section>
    );
};

export default ProvideService;