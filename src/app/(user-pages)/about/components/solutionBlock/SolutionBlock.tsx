import Image from "next/image";

import styles from './solutionBlock.module.scss';

const SolutionBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.text_box}>
                    <h3 className='block-title'>
                        Your Premier <br />
                        Golf Cart Rental Solution
                    </h3>
                    <p className='block-subtitle'>
                        Unlock Unparalleled Convenience and Style on the Fairway
                        with Our Top-of-the-Line Golf Cart Rentals. <br />
                        Discover Luxury and Ease with Our Golf Cart Rental Services. <br />
                        Our Ideal Golf Cart Awaits at Our Rental Hub
                    </p>
                </div>
                <div>
                    <Image
                        src={'/mapAbout.svg'}
                        alt={'map'}
                        width={536}
                        height={536}
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default SolutionBlock;