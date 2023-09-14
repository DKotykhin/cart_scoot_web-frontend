import React from 'react';

import RequestsPanel from './components/requestsPanel/RequestsPanel';

import styles from './request-list.module.scss';

const RequestListPage = () => {
    return (
        <div className={styles.container}>
            <h2>Trips and Requests</h2>
            <RequestsPanel />
        </div>
    );
};

export default RequestListPage;