import React from 'react';

import Advertisement from 'components/advertisement/Advertisement';
import RequestDetails from '../components/requestDetails/RequestDetails';

const RequestDetailsPage = ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    return (
        <div style={{ width: '100vw' }}>
            <Advertisement />
            <RequestDetails _id={params._id} />
        </div>
    );
};

export default RequestDetailsPage;