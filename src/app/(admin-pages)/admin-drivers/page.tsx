import React from 'react';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminDrivers.module.scss';

const AdminDriversPage = async () => {

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Drivers' amount={10} />

        </div>
    );
};

export default AdminDriversPage;