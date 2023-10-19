import React from 'react';

import Image from "next/image";

import styles from './starsBox.module.scss';

const starArray = [1, 2, 3, 4, 5];

interface IStarsBox {
    avgRating?: number,
    totalCount?: number
}

const StarsBox: React.FC<IStarsBox> = ({ avgRating, totalCount }) => {

    return (
        <div className={styles.star_box_wrapper}>
            {totalCount ?
                <p>{`By ${totalCount} riders`}</p>
                :
                <p>No reviews</p>
            }
            <div className={styles.star_box}>
                {starArray.map(star => (
                    <div key={star}>
                        {avgRating !== 0 ?
                            Math.round(avgRating || 0) >= star ?
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