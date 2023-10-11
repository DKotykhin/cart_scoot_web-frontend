import React from 'react';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';

import styles from './tripDetails.module.scss';

const TripDetails: React.FC<{ _id: string }> = ({ _id }) => {
    return (
        <div className={styles.wrapper}>
            <TitleWithBackButton title='Back to Trips' pageURL='/admin-trips' />
        </div>
    );
};

export default TripDetails;