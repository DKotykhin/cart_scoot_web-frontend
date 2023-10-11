import React from 'react';
import TripDetails from '../components/tripDetails/TripDetails';

const TripDetailsPage = ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    return <TripDetails _id={params._id} />;
};

export default TripDetailsPage;