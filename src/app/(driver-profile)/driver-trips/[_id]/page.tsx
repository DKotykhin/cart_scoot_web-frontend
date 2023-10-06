import React from 'react';
import TripDetail from '../components/tripDetail/TripDetail';

const TripDetailsPage = ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    return <TripDetail _id={params._id} />;
};

export default TripDetailsPage;