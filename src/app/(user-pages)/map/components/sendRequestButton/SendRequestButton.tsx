import React from 'react';

import styles from './sendRequestButton.module.scss';

interface ISendRequestButton {
    active: boolean,
    sendAllRequestClick: () => void,
}

const SendRequestButton: React.FC<ISendRequestButton> = ({ active, sendAllRequestClick }) => {

    return (
        <button
            className={active ? styles.wrapper : `${styles.wrapper} ${styles.disabled}`}
            onClick={sendAllRequestClick}
            disabled={active ? false : true}
        >
            Send Request to all
        </button>
    );
};

export default SendRequestButton;