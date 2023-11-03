"use client";

import ErrorCard from 'components/errorCard/ErrorCard';

const Error = () => {

    return (
        <ErrorCard
            title='Something went wrong!'
            subtitle='Please try again and then reload the website'
        />
    );
};

export default Error;