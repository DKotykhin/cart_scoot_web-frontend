import React from 'react';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminAdvertisement.module.scss';

const AdminAdvertisementPage = () => {
    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Advertisement' hideAmount={true} />

        </div>
    );
};

export default AdminAdvertisementPage;