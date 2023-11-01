"use client";

import React, { useState } from 'react';

import Image from "next/image";
import Link from 'next/link';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REQUESTS_BY_RIDER } from 'apollo/queries/request';

import SearchForm, { ISearchData } from 'components/requests/searchForm/SearchForm';
import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import RequestsTable from '../requestsTable/RequestsTable';

import { IRequestWithDriverPopulatedFields } from 'types/requestTypes';

import styles from './requestsPanel.module.scss';
import RequestCard from '../requestCard/RequestCard';

const Table = () => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<ISearchData>({
        searchRequestCode: "",
        dateFrom: undefined,
        dateTo: undefined,
        status: null,
    });

    const { data }: { data: { getRequestsByRider: { requests: [IRequestWithDriverPopulatedFields], totalCount: number } } } = useSuspenseQuery(GET_REQUESTS_BY_RIDER, {
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

    return data?.getRequestsByRider.totalCount ?
        <div className={styles.container}>
            <SearchForm formData={formData} />
            <div className={styles.desktopView}>
                <RequestsTable requestData={data?.getRequestsByRider.requests} />
            </div>
            <div className={styles.mobileView}>
                {data?.getRequestsByRider.requests.map(request => (
                    <RequestCard request={request} key={request._id} />
                ))}
            </div>
            {(data?.getRequestsByRider.totalCount > 6 && data?.getRequestsByRider.totalCount !== data?.getRequestsByRider.requests.length) &&
                <LoadMoreButton loadMoreClick={loadMoreClick} />}
        </div>
        :
        <div className={styles.empty_container}>
            <SearchForm formData={formData} />
            <div className={styles.empty_wrapper}>
                <Image
                    src={'/emptyList.svg'}
                    alt={'empty'}
                    width={196}
                    height={192}
                    className={styles.empty_image}
                />
                <h3 className={styles.title}>Trips List is Empty!</h3>
                <p className={styles.empty_p}>
                    You didn&apos;t send a trip request yet. Get started by clicking on “Find a car” button
                </p>
                <Link href={'/map'}>
                    <button className={styles.empty_button}>Find a car</button>
                </Link>
            </div>
        </div>;

};

export default Table;