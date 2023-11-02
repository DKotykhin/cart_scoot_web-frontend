import React from 'react';

import { getUserByToken } from 'apollo/services/getUserByToken';

import RequestPanel from './components/requestPanel/RequestPanel';
import RequestTitle from './components/requestTitle/RequestTitle';

import styles from './requests.module.scss';

const DriverRequestsPage = async () => {

    const userData = await getUserByToken();

    return (
        <div className={styles.wrapper}>
            <RequestTitle />
            <RequestPanel
                driver={userData?.getUserByToken}
            />
        </div>
    );
};

export default DriverRequestsPage;