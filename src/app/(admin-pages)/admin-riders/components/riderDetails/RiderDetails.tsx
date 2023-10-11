import React from 'react';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';

import styles from './riderDetails.module.scss';

const RiderDetails: React.FC<{ _id: string }> = ({ _id }) => {
    return (
        <div className={styles.wrapper}>
            <TitleWithBackButton title='Back to Riders' pageURL='/admin-riders' />
        </div>
    );
};

export default RiderDetails;