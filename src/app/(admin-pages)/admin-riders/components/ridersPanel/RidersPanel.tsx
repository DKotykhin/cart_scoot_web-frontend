"use client";

import React, { useState } from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_RIDERS } from 'apollo/queries/admin';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';
import EmptyList from 'components/emptyList/EmptyList';
import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import RiderSearchForm, { IRiderSearchData } from '../riderSearchForm/RiderSearchForm';
import RidersTable from '../ridersTable/RidersTable';

import { IRider } from 'types/userTypes';

import styles from './ridersPanel.module.scss';

const RidersPanel = () => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<IRiderSearchData>({
        searchUserName: "",
    });

    const { data }: { data?: { getAllRiders: { users: [IRider]; totalCount: number } } } = useSuspenseQuery(GET_ALL_RIDERS, {
        variables: {
            getAllUsersInput: {
                pageNumber: page,
                ...searchData,
            }
        },
    });

    const formData = (data: IRiderSearchData) => {
        // console.log(data);
        const { searchUserName } = data;
        setSearchData({
            searchUserName,
        });
    };

    const loadMoreClick = () => setPage(page + 1);

    return (
        <div className={styles.riders_panel}>
            <TitleWithAmount title='Riders' amount={data?.getAllRiders.totalCount} />
            {data?.getAllRiders.totalCount ?
                <div className={styles.riders_panel_container}>
                    <div className={styles.riders_panel_wrapper}>
                        <RiderSearchForm formData={formData} />
                        <RidersTable riders={data?.getAllRiders.users} />
                        {(data?.getAllRiders.totalCount > 7 && data?.getAllRiders.totalCount !== data?.getAllRiders.users.length) &&
                            <LoadMoreButton loadMoreClick={loadMoreClick} />}
                    </div>
                </div>
                :
                <div className={styles.empty_container}>
                    <RiderSearchForm formData={formData} />
                    <EmptyList
                        title='Rider List is Empty!'
                        subtitle='There is no rider yet!'
                    />
                </div>
            }
        </div>
    );
};

export default RidersPanel;