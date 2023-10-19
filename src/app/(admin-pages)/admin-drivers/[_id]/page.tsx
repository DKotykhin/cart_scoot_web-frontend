import React from 'react';

import DriverDetails from '../components/driverDetails/DriverDetails';

const TripDetailsPage = ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    return <DriverDetails driverId={params._id} />;
};

export default TripDetailsPage;