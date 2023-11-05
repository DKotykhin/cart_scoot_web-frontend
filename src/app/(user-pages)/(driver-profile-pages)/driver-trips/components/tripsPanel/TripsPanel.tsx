"use client";

import React, { useState } from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REQUESTS_BY_DRIVER } from 'apollo/queries/request';

import SearchForm, { ISearchData } from 'components/requests/searchForm/SearchForm';
import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';
import EmptyList from 'components/emptyList/EmptyList';
import TripsTable from '../tripsTable/TripsTable';
import TripMobileCard from '../tripMobileCard/TripMobileCard';

import { IRequestWithRiderPopulatedFields } from 'types/requestTypes';

import styles from './tripsPanel.module.scss';

const TripsPanel = () => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<ISearchData>({
        searchRequestCode: "",
        dateFrom: undefined,
        dateTo: undefined,
        status: null,
    });

    const { data }: { data: { getRequestsByDriver: { requests: [IRequestWithRiderPopulatedFields], totalCount: number } } } = useSuspenseQuery(GET_REQUESTS_BY_DRIVER, {
        variables: {
            getRequestsByFiltersInput: { ...searchData, page }
        }
    });

    const formData = (data: ISearchData) => {
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
            <TitleWithAmount title='Trips' amount={data?.getRequestsByDriver.totalCount} />
            {data?.getRequestsByDriver.totalCount ?
                <div className={styles.trips_panel_wrapper}>
                    <div className={styles.trips_panel}>
                        <SearchForm formData={formData} />
                        <div className={styles.desktop_trips}>
                            <TripsTable trips={data?.getRequestsByDriver.requests} />
                        </div>
                        <div className={styles.mobile_trips}>
                            {data?.getRequestsByDriver.requests.map(request => (
                                <TripMobileCard request={request} key={request._id} />
                            ))}
                        </div>
                        {(data?.getRequestsByDriver.totalCount > 6 && data?.getRequestsByDriver.totalCount !== data?.getRequestsByDriver.requests.length) &&
                            <LoadMoreButton loadMoreClick={loadMoreClick} />}
                    </div>
                </div>
                :
                <div className={styles.empty_container}>
                    <SearchForm formData={formData} />
                    <EmptyList
                        title='Trips List is Empty!'
                        subtitle='You didn&apos;t get any trip yet.'
                    />
                </div>
            }
        </div>
    );
};

export default TripsPanel;