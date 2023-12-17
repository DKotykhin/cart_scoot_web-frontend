import Image from "next/image";

// import MiniCard from 'components/miniCard/MiniCard';

import styles from './secondBlock.module.scss';

const SecondBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                {/* <div className={styles.miniCard_box}>
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
                </div> */}
                <div className={styles.image_box}>
                    <Image
                        src={'/about-1.png'}
                        alt={'carts'}
                        width={536}
                        height={400}
                    />
                </div>
                <div className={styles.text_box}>
                    <h3 className='block-title'>
                        Welcome to CartScoot. Your neighborhood Golf Cart Connection.
                    </h3>
                    <p className='block-subtitle'>
                        We provide the service of connecting people in the community who want a golf cart ride and those who would like to provide one. This service is complimentary and the drivers are your friends and neighbors.
                    </p>
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
                                <span>Suits for anybody </span>
                            </div>
                            <div className={styles.link}>
                                <Image
                                    src={'/icons/checkCircle-green.svg'}
                                    alt={'check circle'}
                                    width={24}
                                    height={24}
                                />
                                <span>Total comfort</span>
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
                                <span>Absolute safety</span>
                            </div>
                            <div className={styles.link}>
                                <Image
                                    src={'/icons/checkCircle-green.svg'}
                                    alt={'check circle'}
                                    width={24}
                                    height={24}
                                />
                                <span>Trustable drivers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecondBlock;