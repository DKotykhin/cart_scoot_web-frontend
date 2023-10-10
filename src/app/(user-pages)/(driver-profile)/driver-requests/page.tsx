import React from 'react';

import { getPendingRequests } from 'apollo/services/getPendingRequests';
import { getUserByToken } from 'apollo/services/getUserByToken';

import RequestPanel from './components/requestPanel/RequestPanel';
import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './requests.module.scss';

const DriverRequestsPage = async () => {

    const requestData = await getPendingRequests();
    const userData = await getUserByToken();

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount
                title='Requests'
                amount={requestData?.getPendingRequests.length}
            />
            <RequestPanel
                requests={requestData?.getPendingRequests}
                driver={userData?.getUserByToken}
            />
        </div>
    );
};

export default DriverRequestsPage;