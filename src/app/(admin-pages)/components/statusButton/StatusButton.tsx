"use client";

import React from 'react';

import styles from './statusButton.module.scss';

interface IStatusButton {
    banned: boolean,
    banStatusClick: () => void,
}

const StatusButton: React.FC<IStatusButton> = ({ banned, banStatusClick }) => {

    return banned ?
        <div className={styles.status_button_wrapper}>
            <p className={styles.status_text}>Banned</p>
            <div className={styles.status_button} onClick={banStatusClick}>
                <div className={styles.status_button_round} />
            </div>
        </div>
        :
        <div className={styles.status_button_wrapper}>
            <p className={styles.status_text}>Active</p>
            <div className={styles.status_button_active} onClick={banStatusClick}>
                <div className={styles.status_button_round} />
            </div>
        </div>;
};

export default StatusButton;