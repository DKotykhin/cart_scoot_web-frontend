import React from 'react';
import RequestSentCard from '../components/RequestSentCard';

const RequestSentMessagePage = ({
    params,
}: {
    params: {
        code: string;
    };
}) => {
    return <RequestSentCard code={params.code} />;
};

export default RequestSentMessagePage;