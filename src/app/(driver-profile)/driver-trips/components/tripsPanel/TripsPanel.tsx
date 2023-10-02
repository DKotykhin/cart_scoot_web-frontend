"use client";

import React, { useState } from 'react';

import Image from "next/image";
import Link from 'next/link';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REQUESTS_BY_DRIVER } from 'apollo/queries/request';

import SearchForm, { ISearchData } from 'components/searchForm/SearchForm';
import TripsTable from '../tripsTable/TripsTable';
import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';

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

    const { data }: { data: { getRequestsByDriver: [IRequestWithRiderPopulatedFields] } } = useSuspenseQuery(GET_REQUESTS_BY_DRIVER, {
        variables: {
            getRequestsByFiltersInput: { ...searchData, page }
        }
    });
    // console.log(data?.getRequestsByDriver);

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
            <div className={styles.title_box}>
                <h2 className={styles.profile_title}>Trips</h2>
                <div className={styles.trips_amount}>{data?.getRequestsByDriver.length}</div>
            </div>
            {data?.getRequestsByDriver.length ?
                <div className={styles.trips_panel_wrapper}>
                    <div className={styles.trips_panel}>
                        <SearchForm formData={formData} />
                        <TripsTable trips={data?.getRequestsByDriver}/>
                        {data?.getRequestsByDriver.length > 6 && <LoadMoreButton loadMoreClick={loadMoreClick} />}
                    </div>
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
                        <h3 className={styles.empty_title}>Trips List is Empty!</h3>
                        <p className={styles.empty_p}>
                            You didn&apos;t get any trip yet.
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default TripsPanel;