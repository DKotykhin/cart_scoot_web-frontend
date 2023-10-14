"use client";

import React, { useState } from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_REQUESTS } from 'apollo/queries/admin';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';
import EmptyList from 'components/emptyList/EmptyList';
import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import SearchForm, { ISearchData } from 'components/requests/searchForm/SearchForm';
import TripsTable from '../tripsTable/TripsTable';

import { IRequestWithAllUsersPopulatedFields } from 'types/requestTypes';

import styles from './tripsPanel.module.scss';

const TripsPanel = () => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<ISearchData>({
        searchRequestCode: "",
        dateFrom: undefined,
        dateTo: undefined,
        status: null,
    });

    const { data }: { data?: { getAllRequests: { requests: [IRequestWithAllUsersPopulatedFields]; totalCount: number } } } = useSuspenseQuery(GET_ALL_REQUESTS, {
        variables: {
            getAllRequestsInput: {
                pageNumber: page,
                ...searchData,
            }
        }
    });

    const formData = (data: ISearchData) => {
        // console.log(data);
        const { searchRequestCode, dateFrom, dateTo, status } = data;
        setSearchData({
            searchRequestCode,
            dateFrom,
            dateTo,
            status,
        });
    };

    const loadMoreClick = () => setPage(page + 1);

    return (
        <div className={styles.trips_panel}>
            <TitleWithAmount title='Trips' amount={data?.getAllRequests.totalCount} />
            {data?.getAllRequests.totalCount ?
                <div className={styles.trips_panel_container}>
                    <div className={styles.trips_panel_wrapper}>
                        <SearchForm formData={formData} />
                        <TripsTable trips={data.getAllRequests.requests} />
                        {(data?.getAllRequests.totalCount > 7 && data?.getAllRequests.totalCount !== data?.getAllRequests.requests.length) &&
                            <LoadMoreButton loadMoreClick={loadMoreClick} />}
                    </div>
                </div>
                :
                <div className={styles.empty_container}>
                    <SearchForm formData={formData} />
                    <EmptyList
                        title='Trip List is Empty!'
                        subtitle='There is no trip yet!'
                    />
                </div>
            }
        </div>
    );
};

export default TripsPanel;