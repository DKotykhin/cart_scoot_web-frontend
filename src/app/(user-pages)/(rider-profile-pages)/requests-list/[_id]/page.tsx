import React from 'react';

import Advertisement from 'components/advertisement/Advertisement';
import RequestDetails from '../components/requestDetails/RequestDetails';

import { getPageAdvertisement } from 'apollo/services/getPageAdvertisement';
import { PageTypes } from 'types/advertisementTypes';

const RequestDetailsPage = async ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    const advertisement = await getPageAdvertisement(PageTypes.trip);

    return (
        <div style={{ width: '100vw' }}>
            <Advertisement advertisement={advertisement?.getPageAdvertisement} />
            <RequestDetails _id={params._id} />
        </div>
    );
};

export default RequestDetailsPage;