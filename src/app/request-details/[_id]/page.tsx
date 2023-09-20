import Advertisement from 'components/advertisement/Advertisement';
import React from 'react';
import RequestDetails from '../components/RequestDetails';

const RequestDetailsPage = ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    return (
        <>
            <Advertisement />
            <RequestDetails _id={params._id} />
        </>
    );
};

export default RequestDetailsPage;