"use client";

import React, { useState } from 'react';

import Image from "next/image";

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REVIEWS_BY_DRIVER_ID } from 'apollo/queries/review';

import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import ReviewTable from '../reviewTable/ReviewTable';
import SearchForm, { ISearchData } from '../searchForm/SearchForm';

import { IUser } from 'types/userTypes';
import { IReview } from 'types/reviewTypes';

import styles from './reviewPanel.module.scss';

const ReviewPanel: React.FC<{ user?: IUser }> = ({ user }) => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<ISearchData>({
        searchRequestCode: "",
        dateFrom: undefined,
        dateTo: undefined,
    });

    const { data }: { data: { getReviewsByDriverId: [IReview] } } = useSuspenseQuery(GET_REVIEWS_BY_DRIVER_ID, {
        variables: {
            getReviewsByDriverIdInput: {
                driverId: user?._id,
                page,
                ...searchData,
            }
        }
    });
    // console.log(data?.getReviewsByDriverId);

    const loadMoreClick = () => setPage(page + 1);

    const formData = (data: ISearchData) => {
        // console.log(data);
        const { searchRequestCode, dateFrom, dateTo } = data;
        setSearchData({
            searchRequestCode,
            dateFrom,
            dateTo,
        });
    };

    return data?.getReviewsByDriverId.length ?
        <div className={styles.review_panel_wrapper}>
            <div className={styles.review_panel}>
                <SearchForm formData={formData} />
                <ReviewTable reviews={data?.getReviewsByDriverId} />
                {data?.getReviewsByDriverId.length > 6 && <LoadMoreButton loadMoreClick={loadMoreClick} />}
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
                <h3 className={styles.empty_title}>Comments List is Empty!</h3>
                <p className={styles.empty_p}>
                    You didn&apos;t get any comment yet.
                </p>
            </div>
        </div>;
};

export default ReviewPanel;