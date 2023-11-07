import React from 'react';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';

import styles from './addAdvertisement.module.scss';

const AddAdvertisement = () => {
    return (
        <div className={styles.add_ads_container}>
            <TitleWithBackButton title='Back to Advertisements' pageURL='/admin-advertisement' />
            <div className={styles.add_ads}>
                Add Advertisement
            </div>
        </div>
    );
};

export default AddAdvertisement;