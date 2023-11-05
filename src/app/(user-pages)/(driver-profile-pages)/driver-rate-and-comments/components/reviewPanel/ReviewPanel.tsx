"use client";

import React, { useState } from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REVIEWS_BY_DRIVER_ID } from 'apollo/queries/review';

import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import EmptyList from 'components/emptyList/EmptyList';
import SearchForm, { ISearchData } from 'components/rateAndComments/searchForm/SearchForm';
import ReviewTable from 'components/rateAndComments/reviewTable/ReviewTable';
import TitleBox from '../titleBox/TitleBox';

import { IReviewData } from 'types/reviewTypes';

import styles from './reviewPanel.module.scss';
import ReviewMobile from 'components/rateAndComments/reviewMobile/ReviewMobile';

const ReviewPanel: React.FC<{ driverId?: string }> = ({ driverId }) => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<ISearchData>({
        searchRequestCode: "",
        dateFrom: undefined,
        dateTo: undefined,
    });

    const { data }: { data: IReviewData } = useSuspenseQuery(GET_REVIEWS_BY_DRIVER_ID, {
        variables: {
            getReviewsByDriverIdInput: {
                driverId,
                page,
                ...searchData,
            }
        }
    });

    const loadMoreClick = () => setPage(page + 1);

    const formData = (data: ISearchData) => {
        const { searchRequestCode, dateFrom, dateTo } = data;
        setSearchData({
            searchRequestCode,
            dateFrom,
            dateTo,
        });
    };

    return (
        <div className={styles.wrapper}>
            <TitleBox totalCount={data?.getReviewsByDriverId.totalCount} />
            {data?.getReviewsByDriverId.totalCount ?
                <div className={styles.review_panel_wrapper}>
                    <div className={styles.review_panel}>
                        <SearchForm formData={formData} />
                        <div className={styles.desktop_review}>
                            <ReviewTable reviews={data?.getReviewsByDriverId.reviews} />
                        </div>
                        <div className={styles.mobile_review}>
                            {data?.getReviewsByDriverId.reviews.map(review => (
                                <ReviewMobile review={review} key={review._id} />
                            ))}
                        </div>
                        {(data?.getReviewsByDriverId.totalCount > 6 && data?.getReviewsByDriverId.totalCount !== data?.getReviewsByDriverId.reviews.length) &&
                            <LoadMoreButton loadMoreClick={loadMoreClick} />}
                    </div>
                </div>
                :
                <div className={styles.empty_container}>
                    <SearchForm formData={formData} />
                    <EmptyList
                        title='Comments List is Empty!'
                        subtitle='You didn&apos;t get any comment yet.'
                    />
                </div>}
        </div>
    );
};

export default ReviewPanel;