"use client";

import React, { useState } from 'react';

import Image from "next/image";
import Link from 'next/link';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REQUESTS_BY_RIDER } from 'apollo/queries/request';

import SearchForm, { ISearchData } from '../searchForm/SearchForm';
import RequestsTable from '../requestsTable/RequestsTable';

import { IRequestWithDriverPopulatedFields } from 'types/requestTypes';

import styles from './requestsPanel.module.scss';

const Table = () => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<ISearchData>({
        searchRequestCode: "",
        dateFrom: undefined,
        dateTo: undefined,
        status: null,
    });

    const { data }: { data: { getRequestsByRider: [IRequestWithDriverPopulatedFields] } } = useSuspenseQuery(GET_REQUESTS_BY_RIDER, {
        variables: {
            getRequestsByFiltersInput: { ...searchData, page }
        }
    });

    const formData = (data: ISearchData) => {
        console.log(data);
        const { searchRequestCode, dateFrom, dateTo, status } = data;
        setSearchData({
            searchRequestCode,
            dateFrom,
            dateTo,
            status,
        });
    };

    return data?.getRequestsByRider.length ?
        <div className={styles.container}>
            <SearchForm formData={formData} />
            <RequestsTable requestData={data?.getRequestsByRider} />
            {data?.getRequestsByRider.length > 6 &&
                <button className={styles.find_button} onClick={() => setPage(page + 1)}>
                    Load More
                    <Image
                        src={'/icons/caretDown-green.svg'}
                        alt={'caret'}
                        width={24}
                        height={24}
                    />
                </button>
            }
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