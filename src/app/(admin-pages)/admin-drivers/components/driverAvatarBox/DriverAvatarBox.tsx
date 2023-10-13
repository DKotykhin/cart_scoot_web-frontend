import React from 'react';

import Image from "next/image";

import StarsBox from 'components/starsBox/StarsBox';
import { avatarLetters } from 'utils/avatarLetters';
import { IUser, licenseStatusTypes } from 'types/userTypes';

import styles from './driverAvatarBox.module.scss';

interface IDriverAvatarBox {
    driverWithRating?: {
        driver?: IUser,
        rating?: number,
        totalCount?: number,
    }
}

const DriverAvatarBox: React.FC<IDriverAvatarBox> = ({ driverWithRating }) => {

    return (
        <div className={styles.profile_box}>
            <div className={styles.logo_box}>
                {driverWithRating?.driver?.avatarURL ?
                    <Image
                        src={driverWithRating?.driver?.avatarURL}
                        alt={'avatar'}
                        width={80}
                        height={80}
                    />
                    :
                    <div className={styles.empty_avatar}>
                        {avatarLetters(driverWithRating?.driver?.userName || 'C S')}
                    </div>
                }
            </div>
            <div className={styles.name_wrapper}>
                <p className={styles.name_title}>{driverWithRating?.driver?.userName}</p>
                {(driverWithRating?.driver?.license.status === licenseStatusTypes.approved) ?
                    <p className={`${styles.status} ${styles.approved}`}>Verified</p>
                    : (driverWithRating?.driver?.license.status === licenseStatusTypes.waiting) ?
                        <p className={`${styles.status} ${styles.waiting}`}>Waiting For Approve</p>
                        : (driverWithRating?.driver?.license.status === licenseStatusTypes.rejected) ?
                            <p className={`${styles.status} ${styles.rejected}`}>Invalid Documents</p>
                            :
                            <p className={`${styles.status} ${styles.pending}`}>Unverified</p>
                }
            </div>
            <StarsBox avgRating={driverWithRating?.rating} totalCount={driverWithRating?.totalCount} />
        </div>
    );
};

export default DriverAvatarBox;