import React from 'react';

import SetNewCard from '../components/SetNewCard';

const TokenPage = ({
    params,
}: {
    params: {
        token: string;
    };
}) => {
    return <SetNewCard token={params.token} />;
};

export default TokenPage;