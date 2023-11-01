import React, { ReactElement } from 'react';

import Image from "next/image";

import styles from './modalCard.module.scss';

interface ICancelTripCard {
    title: string;
    subtitle: string;
    button_1: string;
    button_2: string | ReactElement;
    imageURL: string;
    greenButton: boolean;
    confirmClick: () => void;
    cancelClick: () => void;
}

const ModalCard: React.FC<ICancelTripCard> = ({ title, subtitle, button_1, button_2, imageURL, confirmClick, cancelClick, greenButton }) => {
    return (
        <div className={styles.container} onClick={cancelClick}>
            <div className={styles.cancel_trip_menu} onClick={(e) => e.stopPropagation()}>
                <Image
                    src={imageURL}
                    alt={'warning'}
                    width={120}
                    height={120}
                    className={styles.cancel_trip_avatar}
                />
                <p className={styles.cancel_trip_title}>{title}</p>
                <p className={styles.cancel_trip_subtitle}>{subtitle}</p>
                <div className='line' />
                <div className={styles.cancel_trip_buttons}>
                    <button
                        onClick={cancelClick}
                        className={styles.cancel_button}
                    >
                        {button_1}
                    </button>
                    <button
                        onClick={confirmClick}
                        className={greenButton ? styles.confirm_button_green : styles.confirm_button_red}
                    >
                        {button_2}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCard;