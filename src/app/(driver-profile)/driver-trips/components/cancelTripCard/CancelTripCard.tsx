import React from 'react';

import Image from "next/image";

import styles from './cancelTripCard.module.scss';

interface ICancelTripCard {
    confirmClick: () => void;
    cancelClick: () => void;
}

const CancelTripCard: React.FC<ICancelTripCard> = ({ confirmClick, cancelClick }) => {
    return (
        <div className={styles.container} onClick={cancelClick}>
            <div className={styles.cancel_trip_menu} onClick={(e) => e.stopPropagation()}>
                <Image
                    src={'/avatars/warningAvatar.svg'}
                    alt={'warning'}
                    width={120}
                    height={120}
                    className={styles.cancel_trip_avatar}
                />
                <p className={styles.cancel_trip_title}>Cancel the trip</p>
                <p className={styles.cancel_trip_subtitle}>Are you sure to cancel the trip? Please select cancelation reason</p>
                <div className='line' />
                <div className={styles.cancel_trip_buttons}>
                    <button
                        onClick={cancelClick}
                    >
                        Back
                    </button>
                    <button
                        onClick={confirmClick}
                    >
                        Cancel Trip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelTripCard;