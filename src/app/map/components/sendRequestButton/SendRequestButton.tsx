import React from 'react';

import styles from './sendRequestButton.module.scss';

const SendRequestButton: React.FC<{ sendAllRequestClick: () => void }> = ({ sendAllRequestClick }) => {

    return (
        <div className={styles.wrapper} onClick={sendAllRequestClick}>
            <p className={styles.text}>Send Request to all</p>
        </div>
    );
};

export default SendRequestButton;