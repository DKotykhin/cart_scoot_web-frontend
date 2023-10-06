"use client";

import React from 'react';

import Image from "next/image";

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_DRIVER_RATING } from 'apollo/queries/review';

import styles from './starsBox.module.scss';

const starArray = [1, 2, 3, 4, 5];

const StarsBox = () => {

    const { data }: { data: { getDriverRating: { avgRating: number, totalCount: number } } } = useSuspenseQuery(GET_DRIVER_RATING);

    return (
        <div className={styles.star_box_wrapper}>
            {data?.getDriverRating.totalCount ?
                <p>{`By ${data.getDriverRating.totalCount} riders`}</p>
                :
                <p>No reviews</p>
            }
            <div className={styles.star_box}>
                {starArray.map(star => (
                    <div key={star}>
                        {data?.getDriverRating.avgRating !== 0 ?
                            Math.round(data?.getDriverRating.avgRating) >= star ?
                                <Image
                                    src={'/icons/star-green.svg'}
                                    alt={'star'}
                                    width={20}
                                    height={20}
                                /> :
                                <Image
                                    src={'/icons/star-empty.svg'}
                                    alt={'star'}
                                    width={20}
                                    height={20}
                                />
                            :
                            <Image
                                src={'/icons/star-grey.svg'}
                                alt={'star'}
                                width={20}
                                height={20}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StarsBox;