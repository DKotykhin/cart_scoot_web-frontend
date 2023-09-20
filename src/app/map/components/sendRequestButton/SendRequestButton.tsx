import React from 'react';

import styles from './sendRequestButton.module.scss';

const SendRequestButton = () => {

    const sendClick = () => console.log('send');

    return (
        <div className={styles.wrapper} onClick={sendClick}>
            <p className={styles.text}>Send Request to all</p>
        </div>
    );
};

export default SendRequestButton;