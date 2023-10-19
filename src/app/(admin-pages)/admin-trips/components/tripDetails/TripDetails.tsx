import React from 'react';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';
import DetailsMap from '../detailsMap/DetailsMap';
import DetailsCard from '../detailsCard/DetailsCard';

import { getRequestById } from 'apollo/services/getRequestById';
import { getReviewByRequestCode } from 'apollo/services/getReviewByRequestCode';

import styles from './tripDetails.module.scss';

const TripDetails: React.FC<{ _id: string }> = async ({ _id }) => {

    const requestData = await getRequestById(_id);
    const reviewData = await getReviewByRequestCode(requestData?.getRequest.request.requestCode || "");

    return (
        <div className={styles.wrapper}>
            <TitleWithBackButton title='Back to Trips' pageURL='/admin-trips' />
            <div className={styles.details_wrapper}>
                <DetailsMap requestData={requestData?.getRequest} />
                <DetailsCard requestData={requestData?.getRequest} reviewData={reviewData?.getReviewByRequestCode} />
            </div>
        </div>
    );
};

export default TripDetails;