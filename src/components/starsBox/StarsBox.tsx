import React from 'react';
import Image from "next/image";

import styles from './starsBox.module.scss';

const starArray = [1, 2, 3, 4, 5];
interface IStarsBox {
    rating?: number,
    totalCount?: number,
    comment?: boolean,
}

const StarsBox: React.FC<IStarsBox> = ({ rating, totalCount, comment }) => {

    return (
        <div className={styles.star_box_wrapper}>
            {comment ?
                totalCount ?
                    <p>{`By ${totalCount} riders`}</p>
                    :
                    <p>No reviews</p>
                : null
            }
            <div className={rating ? styles.star_box_green : styles.star_box_grey}>
                {starArray.map(star => (
                    <div key={star} className={styles.stars_wrapper}>
                        {rating ?
                            Math.round(rating) >= star ?
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