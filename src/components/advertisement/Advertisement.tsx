import React from 'react';

import Link from 'next/link';
import { IAdvertisement } from 'types/advertisementTypes';

import styles from './advertisement.module.scss';

const Advertisement: React.FC<{ advertisement?: IAdvertisement }> = ({ advertisement }) => {
    return (
        <div className={styles.ads_container}>
            {advertisement?._id ?
                <Link href={advertisement?.link} className={styles.ads_wrapper} target='_blank'>
                    <h3 className={styles.title}>{advertisement?.title}</h3>
                    <h5 className={styles.description}>{advertisement?.description}</h5>
                </Link>
                :
                <div className={styles.ads_empty_wrapper}>
                    <h3 className={styles.ads}>
                        Your Ads Can Be Here
                    </h3>
                    <Link href={'/contact'}>
                        <p className={styles.ask_link}>
                            Ask administrator for details
                        </p>
                    </Link>
                </div>
            }
        </div>
    );
};

export default Advertisement;