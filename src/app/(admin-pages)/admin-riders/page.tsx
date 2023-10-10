import React from 'react';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminRiders.module.scss';

const AdminRidersPage = async () => {

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Riders' amount={10} />

        </div>
    );
};

export default AdminRidersPage;