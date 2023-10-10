import React from 'react';

import { getAllRiders } from 'apollo/services/getAllRiders';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminRiders.module.scss';

const AdminRidersPage = async () => {

    const data = await getAllRiders();

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Riders' amount={data?.getAllRiders.totalCount} />

        </div>
    );
};

export default AdminRidersPage;