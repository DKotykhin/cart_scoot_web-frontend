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
                    Welcome to CartScoot a golf cart connection, here we connect neighborhood riders and drivers.
                </h3>
                <p className='block-subtitle'>
                    Live in a community with a golf cart as another means of transportation, then this service is for you.
                    Join many of our Golf Cart riders, owners and drivers, who are willing to provide their volunteer services of offering rides to their neighbors.
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
                        <span>Book a Golf Cart</span>
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