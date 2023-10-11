import React from 'react';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';

import styles from './driverDetails.module.scss';

const DriverDetails: React.FC<{ _id: string }> = ({ _id }) => {
    return (
        <div className={styles.wrapper}>
            <TitleWithBackButton title='Back to Drivers' pageURL='/admin-drivers' />
        </div>
    );
};

export default DriverDetails;