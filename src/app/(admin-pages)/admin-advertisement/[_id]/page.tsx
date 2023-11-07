import React from 'react';

import AdsDetail from '../components/adsDetail/AdsDetail';

const TripDetailsPage = ({
    params,
}: {
    params: {
        _id: string;
    };
}) => {
    return <AdsDetail _id={params._id} />;
};

export default TripDetailsPage;