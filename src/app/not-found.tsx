import React from 'react';

import Header from 'components/header/Header';
import ErrorCard from 'components/errorCard/ErrorCard';
import { getUserByToken } from "apollo/services/getUserByToken";

const NotFound = async () => {

    const data = await getUserByToken();

    return (
        <>
            <header style={{ width: '100%' }}>
                <Header user={data?.getUserByToken} />
            </header>
            <ErrorCard
                title='Page not found'
                subtitle='Please go to the existing page'
            />
        </>
    );
};

export default NotFound;