"use client";

import React, { useState } from 'react';

import Image from "next/image";

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_DRIVER_RATING } from 'apollo/queries/review';
import { uploadAvatar } from 'apollo/services/uploadAvatar';

import StarsBox from 'components/starsBox/StarsBox';
import LicenseStatusBox from 'components/licenseStatusBox/LicenseStatusBox';

import { useUserStore } from 'stores/userStore';
import { avatarLetters } from 'utils/avatarLetters';

import styles from './driverAvatarBox.module.scss';

const DriverAvatarBox: React.FC = () => {

    const [avatarLoading, setAvatarLoading] = useState(false);

    const { addUser, userData } = useUserStore();

    const { data }: { data: { getDriverRating: { avgRating: number, totalCount: number } } } = useSuspenseQuery(GET_DRIVER_RATING, {
        fetchPolicy: 'no-cache',
        refetchWritePolicy: 'overwrite',
    });

    const onChange = async (e: any) => {
        setAvatarLoading(true);
        const formData = new FormData();
        formData.append("avatar", e.target.files[0], e.target.files[0].name);
        const newUser = await uploadAvatar(formData);
        if (newUser) setAvatarLoading(false);
        addUser(newUser);
    };

    return (
        <div className={styles.profile_box}>
            <div className={styles.logo_wrapper}>
                <div className={styles.logo_box}>
                    {avatarLoading ?
                        <Image
                            src={'/spinner.svg'}
                            alt={'spinner'}
                            width={48}
                            height={48}
                        />
                        :
                        userData?.avatarURL ?
                            <Image
                                src={userData?.avatarURL}
                                alt={'avatar'}
                                width={80}
                                height={80}
                            />
                            :
                            <div className={styles.empty_avatar}>
                                {avatarLetters(userData?.userName || 'C S')}
                            </div>
                    }
                </div>
                <label htmlFor='avatar' onChange={onChange}>
                    <Image
                        src={"/icons/upload-image.svg"}
                        alt={'upload'}
                        width={20}
                        height={20}
                        className={styles.logo_upload}
                    />
                    <input type="file" id="avatar" name="avatar" accept="image/*" hidden />
                </label>
            </div>
            <div className={styles.name_wrapper}>
                <p className={styles.name_title}>{userData?.userName}</p>
                <LicenseStatusBox status={userData?.license.status} />
            </div>
            <StarsBox
                rating={data?.getDriverRating.avgRating}
                totalCount={data?.getDriverRating.totalCount}
                comment={true}
            />
        </div>
    );
};

export default DriverAvatarBox;