"use client";

import React from 'react';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';
import DriverAvatarBox from '../driverAvatarBox/DriverAvatarBox';
import DriverInfoBox from '../driverInfoBox/DriverInfoBox';
import VerifyButtons from '../verifyButtons/VerifyButtons';
import DriverScheduleInfo from '../driverScheduleInfo/DriverScheduleInfo';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_DRIVER_WITH_RATING } from 'apollo/queries/admin';
import { IUser, licenseStatusTypes } from 'types/userTypes';

import styles from './driverDetails.module.scss';

interface IGetUserById {
    getDriverWithRating: {
        driver: IUser,
        rating: number,
        totalCount: number,
    };
}

const DriverDetails: React.FC<{ driverId: string }> = ({ driverId }) => {

    const { data }: { data?: IGetUserById } = useSuspenseQuery(GET_DRIVER_WITH_RATING, {
        variables: {
            driverId,
        },
    });

    return (
        <div className={styles.wrapper}>
            <TitleWithBackButton title='Back to Drivers' pageURL='/admin-drivers' />
            <DriverAvatarBox driverWithRating={data?.getDriverWithRating} />
            <div className={styles.line_box}>
                <div className={styles.line} />
            </div>
            <DriverInfoBox driver={data?.getDriverWithRating.driver} />
            {data?.getDriverWithRating.driver.license.status === licenseStatusTypes.approved ?
                <DriverScheduleInfo driver={data?.getDriverWithRating.driver} />
                : null
            }
            {data?.getDriverWithRating.driver.license.status === licenseStatusTypes.waiting ?
                <VerifyButtons driverId={data?.getDriverWithRating.driver._id} />
                : null
            }
        </div>
    );
};

export default DriverDetails;