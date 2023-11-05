import React from 'react';

import StarsArray from 'components/starsArray/StarsArray';

import styles from './starsBox.module.scss';

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
            <StarsArray rating={avgRating} />
        </div>
    );
};

export default StarsBox;