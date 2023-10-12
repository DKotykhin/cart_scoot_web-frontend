"use client";

import React from 'react';

import Image from "next/image";

import StarsBox from '../../../components/starsBox/StarsBox';
import { useUserStore } from 'stores/userStore';
import { uploadAvatar } from 'apollo/services/uploadAvatar';
import { avatarLetters } from 'utils/avatarLetters';

import { licenseStatusTypes } from 'types/userTypes';

import styles from './profileBox.module.scss';

const ProfileBox: React.FC = () => {

    const { addUser, userData } = useUserStore();

    const onChange = async (e: any) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0], e.target.files[0].name);
        const newUser = await uploadAvatar(formData);
        addUser(newUser);
    };

    return (
        <div className={styles.profile_box}>
            <div className={styles.logo_wrapper}>
                <div className={styles.logo_box}>
                    {userData?.avatarURL ?
                        <Image
                            src={userData?.avatarURL}
                            alt={'avatar'}
                            width={80}
                            height={80}
                            loader={({ src, width: w, quality }) => {
                                const q = quality || 75;
                                return `${src}?w=${w}&q=${q}`;
                            }}
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
                {(userData?.license.status === licenseStatusTypes.approved) ?
                    <p className={`${styles.status} ${styles.approved}`}>Verified</p>
                    : (userData?.license.status === licenseStatusTypes.waiting) ?
                        <p className={`${styles.status} ${styles.waiting}`}>Waiting For Approve</p>
                        : (userData?.license.status === licenseStatusTypes.rejected) ?
                            <p className={`${styles.status} ${styles.rejected}`}>Invalid Documents</p>
                            :
                            <p className={`${styles.status} ${styles.pending}`}>Unverified</p>
                }
            </div>
            <StarsBox />
        </div>
    );
};

export default ProfileBox;