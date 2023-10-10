import React from 'react';

import { getUserByToken } from 'apollo/services/getUserByToken';
import { getWaitingLicenses } from 'apollo/services/getWaitingLicenses';
import { getAllRequests } from 'apollo/services/getAllRequests';

import UserBox from './components/userBox/UserBox';
import StatisticBox from './components/statisticBox/StatisticBox';
import TripsList from './components/tripsList/TripsList';
import LicensesList from './components/licensesList/LicensesList';

import styles from './adminDashboard.module.scss';

const AdminDashboardPage = async () => {

    const userData = await getUserByToken();
    const licensesData = await getWaitingLicenses();
    const requestsData = await getAllRequests();

    return (
        <div className={styles.wrapper}>
            <div className={styles.title_box}>
                <h2 className={styles.title}>Dashboard</h2>
                <UserBox user={userData?.getUserByToken} />
            </div>
            <div className={styles.dashboard_box}>
                <div className={styles.statistic_wrapper}>
                    <StatisticBox totalCount={requestsData?.getAllRequests.totalCount}/>
                    <TripsList requests={requestsData?.getAllRequests.requests}/>
                </div>
                {licensesData?.getWaitingLicenses.length &&
                    <LicensesList users={licensesData.getWaitingLicenses} />
                }
            </div>
        </div>
    );
};

export default AdminDashboardPage;