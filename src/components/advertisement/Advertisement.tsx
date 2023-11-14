"use client";

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from "next/image";

import useScreenSize from 'hooks/useScreenWidth';
import { IAdvertisement } from 'types/advertisementTypes';

import styles from './advertisement.module.scss';

const Advertisement: React.FC<{ advertisement?: IAdvertisement }> = ({ advertisement }) => {

    const [imageURL, setImageURL] = useState<string | undefined>('');

    const width = useScreenSize();

    useEffect(() => {
        // const width = window.innerWidth;
        if (width < 768) setImageURL(advertisement?.imageURL.mobile);
        else if (width > 999) setImageURL(advertisement?.imageURL.desktop);
        else setImageURL(advertisement?.imageURL.tablet);
    }, [advertisement?.imageURL.desktop, advertisement?.imageURL.mobile, advertisement?.imageURL.tablet, width]);

    return (
        <div className={styles.ads_container}>
            {advertisement?._id ?
                imageURL ?
                    <Link href={advertisement?.link} target='_blank' className={styles.background_box}>
                        <Image
                            src={imageURL}
                            alt={'upload'}
                            width={1320}
                            height={300}
                            priority
                            className={styles.background_image}
                        />
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