import React from 'react';

import { getUserByTokenRedirect } from 'apollo/services/getUserByToken';
import RequestsPanel from './components/requestsPanel/RequestsPanel';

import styles from './request-list.module.scss';

const RequestListPage = async () => {

    const data = await getUserByTokenRedirect('/login');

    return data ? (
        <div className={styles.container}>
            <h2>Trips and Requests</h2>
            <RequestsPanel />
        </div>
    ) : null;
};

export default RequestListPage;