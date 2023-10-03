import React from 'react';

import { getPendingRequests } from 'apollo/services/getPendingRequests';

import styles from './requests.module.scss';
import RequestPanel from './components/requestPanel/RequestPanel';

const DriverRequestsPage = async () => {

    const data = await getPendingRequests();
  

    return (
        <div className={styles.wrapper}>
            <div className={styles.title_box}>
                <h2 className={styles.profile_title}>Requests</h2>
                <div className={styles.request_amount}>{data?.getPendingRequests.length}</div>
            </div>
            <RequestPanel requests={data?.getPendingRequests}/>
        </div>
    );
};

export default DriverRequestsPage;