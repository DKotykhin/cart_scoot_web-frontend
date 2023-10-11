"use client";

import React, { useState } from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_DRIVERS } from 'apollo/queries/admin';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';
import EmptyList from 'components/emptyList/EmptyList';
import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import DriversTable from '../driversTable/DriversTable';
import DriverSearchForm, { IDriverSearchData } from '../driverSearchForm/DriverSearchForm';

import { IUser } from 'types/userTypes';

import styles from './driversPanel.module.scss';

const DriversPanel = () => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<IDriverSearchData>({
        searchUserName: "",
        status: null,
    });

    const { data }: { data?: { getAllDrivers: { users: [IUser]; totalCount: number } } } = useSuspenseQuery(GET_ALL_DRIVERS, {
        variables: {
            getAllUsersInput: {
                pageNumber: page,
                ...searchData,
            }
        }
    });

    const formData = (data: IDriverSearchData) => {
        // console.log(data);
        const { searchUserName, status } = data;
        setSearchData({
            searchUserName,
            status,
        });
    };

    const loadMoreClick = () => setPage(page + 1);

    return (
        <div className={styles.drivers_panel}>
            <TitleWithAmount title='Drivers' amount={data?.getAllDrivers.totalCount} />
            {data?.getAllDrivers.totalCount ?
                <div className={styles.drivers_panel_container}>
                    <div className={styles.drivers_panel_wrapper}>
                        <DriverSearchForm formData={formData} />
                        <DriversTable drivers={data.getAllDrivers.users} />
                        {(data?.getAllDrivers.totalCount > 7 && data?.getAllDrivers.totalCount !== data?.getAllDrivers.users.length) &&
                            <LoadMoreButton loadMoreClick={loadMoreClick} />}
                    </div>
                </div>
                :
                <div className={styles.empty_container}>
                    <DriverSearchForm formData={formData} />
                    <EmptyList
                        title='Driver List is Empty!'
                        subtitle='There is no driver yet!'
                    />
                </div>
            }
        </div>
    );
};

export default DriversPanel;