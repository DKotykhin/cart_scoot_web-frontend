import React from 'react';

import { getUserByToken } from 'apollo/services/getUserByToken';

import styles from './adminDashboard.module.scss';

const AdminDashboardPage = async () => {

    const data = await getUserByToken();

    return (
        <div className={styles.wrapper}>
            <div className={styles.title_box}>
                <h2 className={styles.title}>Dashboard</h2>

            </div>
        </div>
    );
};

export default AdminDashboardPage;