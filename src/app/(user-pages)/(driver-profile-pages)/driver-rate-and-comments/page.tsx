import React from 'react';

import ReviewPanel from './components/reviewPanel/ReviewPanel';

import { getUserByToken } from 'apollo/services/getUserByToken';

const DriverCommentsPage = async () => {

    const data = await getUserByToken();

    return <ReviewPanel driverId={data?.getUserByToken._id} />;
};

export default DriverCommentsPage;