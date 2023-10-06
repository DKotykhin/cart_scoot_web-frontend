import React from 'react';

import { getPendingRequests } from 'apollo/services/getPendingRequests';
import RequestPanel from './components/requestPanel/RequestPanel';
import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './requests.module.scss';

const DriverRequestsPage = async () => {

    const data = await getPendingRequests();  

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Requests' amount={data?.getPendingRequests.length}/>
            <RequestPanel requests={data?.getPendingRequests}/>
        </div>
    );
};

export default DriverRequestsPage;