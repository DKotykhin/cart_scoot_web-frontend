import React from 'react';

import Image from "next/image";

import StarsBox from 'components/starsBox/StarsBox';
import LicenseStatusBox from 'components/licenseStatusBox/LicenseStatusBox';

import { avatarLetters } from 'utils/avatarLetters';
import { IUser } from 'types/userTypes';

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
                <LicenseStatusBox status={driverWithRating?.driver?.license.status} />
            </div>
            <StarsBox
                rating={driverWithRating?.rating}
                totalCount={driverWithRating?.totalCount}
                comment={true}
            />
        </div>
    );
};

export default DriverAvatarBox;