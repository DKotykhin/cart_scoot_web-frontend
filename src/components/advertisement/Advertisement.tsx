import React from 'react';

import styles from './advertisement.module.scss';

const Advertisement = () => {
    return (
        <div className={styles.ads_container}>
            <div className={styles.ads_wrapper}>
                <h3 className={styles.ads}>Your Ads Is Here</h3>
            </div>
        </div>
    );
};

export default Advertisement;