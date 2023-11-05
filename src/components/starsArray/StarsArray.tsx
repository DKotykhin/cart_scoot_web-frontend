import React from 'react';

import Image from "next/image";

import styles from './starsArray.module.scss';

const starArray = [1, 2, 3, 4, 5];

const StarsArray: React.FC<{ rating?: number }> = ({ rating }) => {
    return (
        <div className={rating ? styles.star_box_green : styles.star_box_grey}>
            {starArray.map(star => (
                <div key={star}>
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
    );
};

export default StarsArray;