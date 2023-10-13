import React from 'react';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';
import DriverAvatarBox from '../driverAvatarBox/DriverAvatarBox';
import DriverInfoBox from '../driverInfoBox/DriverInfoBox';
import VerifyButtons from '../verifyButtons/VerifyButtons';

import { getDriverWithRating } from 'apollo/services/getDriverWithRating';
import { licenseStatusTypes } from 'types/userTypes';

import styles from './driverDetails.module.scss';

const DriverDetails: React.FC<{ _id: string }> = async ({ _id }) => {

    const driver = await getDriverWithRating(_id);

    return (
        <div className={styles.wrapper}>
            <TitleWithBackButton title='Back to Drivers' pageURL='/admin-drivers' />
            <DriverAvatarBox driverWithRating={driver?.getDriverWithRating} />
            <div className={styles.line_box}>
                <div className={styles.line} />
            </div>
            <DriverInfoBox driver={driver?.getDriverWithRating.driver} />
            {driver?.getDriverWithRating.driver.license.status === licenseStatusTypes.waiting ?
                <VerifyButtons driverId={driver?.getDriverWithRating.driver._id} />
                : null
            }
        </div>
    );
};

export default DriverDetails;