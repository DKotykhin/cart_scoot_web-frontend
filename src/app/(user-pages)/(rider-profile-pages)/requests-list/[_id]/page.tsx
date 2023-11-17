import React from 'react';

import Advertisement from 'components/advertisement/Advertisement';
import RequestDetails from '../components/requestDetails/RequestDetails';

import { getPageAdvertisement } from 'apollo/services/getPageAdvertisement';
import { PageTypes } from 'types/advertisementTypes';

import styles from './requestPage.module.scss';

const RequestDetailsPage = async ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    const advertisement = await getPageAdvertisement(PageTypes.trip);

    return (
        <div className={styles.requestPage_wrapper}>
            <div className={styles.requestPage_ads}>
                <Advertisement advertisement={advertisement?.getPageAdvertisement} />
            </div>
            <RequestDetails _id={params._id} />
        </div>
    );
};

export default RequestDetailsPage;