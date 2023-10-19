import React from 'react';

import styles from './sendRequestButton.module.scss';

interface ISendRequestButton {
    driversAmount: number,
    sendAllRequestClick: () => void,
}

const SendRequestButton: React.FC<ISendRequestButton> = ({ driversAmount, sendAllRequestClick }) => {

    return driversAmount > 1 ? (
        <div className={styles.wrapper} onClick={sendAllRequestClick}>
            <p className={styles.text}>Send Request to all</p>
        </div>
    ) : null;
};

export default SendRequestButton;