import React from 'react';

import RiderDetails from '../components/riderDetails/RiderDetails';

const TripDetailsPage = ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    return <RiderDetails _id={params._id} />;
};

export default TripDetailsPage;