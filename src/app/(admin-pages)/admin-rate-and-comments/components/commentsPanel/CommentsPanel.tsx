"use client";

import React, { useState } from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_REVIEWS } from 'apollo/queries/admin';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';
import EmptyList from 'components/emptyList/EmptyList';
import SearchForm, { ISearchData } from 'components/rateAndComments/searchForm/SearchForm';
import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import ReviewTable from 'components/rateAndComments/reviewTable/ReviewTable';

import { IReview } from 'types/reviewTypes';

import styles from './commentsPanel.module.scss';

const CommentsPanel = () => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState<ISearchData>({
        searchRequestCode: "",
        dateFrom: undefined,
        dateTo: undefined,
    });

    const { data }: { data: { getAllReviews: { reviews: [IReview]; totalCount: number } } } = useSuspenseQuery(GET_ALL_REVIEWS,
        {
            variables: {
                getAllReviewsInput: {
                    pageNumber: page,
                    ...searchData,
                }
            }
        });

    const formData = (data: ISearchData) => {
        // console.log(data);
        const { searchRequestCode, dateFrom, dateTo } = data;
        setSearchData({
            searchRequestCode,
            dateFrom,
            dateTo,
        });
    };

    const loadMoreClick = () => setPage(page + 1);

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Rate & Comments' amount={data?.getAllReviews.totalCount} />
            {data?.getAllReviews.totalCount ?
                <div className={styles.review_wrapper}>
                    <div className={styles.review_panel}>
                        <SearchForm formData={formData} />
                        <ReviewTable reviews={data?.getAllReviews.reviews} />
                        {(data?.getAllReviews.totalCount > 7 && data?.getAllReviews.totalCount !== data?.getAllReviews.reviews.length) &&
                            <LoadMoreButton loadMoreClick={loadMoreClick} />}
                    </div>
                </div>
                :
                <div className={styles.empty_container}>
                    <SearchForm formData={formData} />
                    <EmptyList
                        title='Comments List is Empty!'
                        subtitle='There is no comment yet!'
                    />
                </div>
            }
        </div>
    );
};

export default CommentsPanel;