import React from 'react';

import { getPendingRequestsByDriver } from 'apollo/services/getPendingRequestsByDriver';
import { getUserByToken } from 'apollo/services/getUserByToken';

import RequestPanel from './components/requestPanel/RequestPanel';
import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './requests.module.scss';

const DriverRequestsPage = async () => {

    const requestData = await getPendingRequestsByDriver();
    const userData = await getUserByToken();

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount
                title='Requests'
                amount={requestData?.getPendingRequestsByDriver.length}
            />
            <RequestPanel
                requests={requestData?.getPendingRequestsByDriver}
                driver={userData?.getUserByToken}
            />
        </div>
    );
};

export default DriverRequestsPage;