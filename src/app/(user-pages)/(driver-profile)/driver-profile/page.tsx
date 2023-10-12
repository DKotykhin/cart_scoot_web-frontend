"use client";

import React from 'react';

import ProfileBox from './components/profileBox/ProfileBox';
import UploadGuide from './components/uploadGuide/UploadGuide';
import UploadService from './components/uploadService/UploadService';
import UserInfo from './components/userInfo/UserInfo';
import UpdateInfoForm from './components/updateInfoForm/UpdateInfoForm';
import AddCoordinates from './components/addCoordinates/AddCoordinates';

import { useUserStore } from 'stores/userStore';

import { licenseStatusTypes } from 'types/userTypes';

import styles from './profile.module.scss';

const DriverProfilePage = () => {

    const { userData } = useUserStore();

    return (
        <div className={styles.wrapper}>
            <div className={styles.title_box}>
                <h2 className={styles.profile_title}>Profile</h2>
                {userData.license.status !== licenseStatusTypes.approved &&
                    <h4 className={styles.profile_subtitle}>
                        Please complete your profile to start your Journey
                    </h4>
                }
            </div>
            <ProfileBox />
            <div className={styles.line_box}>
                <div className={styles.line} />
            </div>
            {(userData.license.status === licenseStatusTypes.pending || userData.license.status === licenseStatusTypes.rejected) ?
                <div className={styles.document_box}>
                    <p className={styles.document_title}>Your Documents</p>
                    <UploadGuide />
                    <UploadService user={userData} />
                </div>
                :
                <div className={styles.document_box}>
                    <UserInfo user={userData} />
                    <UploadService user={userData} />
                    <AddCoordinates />
                    <UpdateInfoForm user={userData} />
                </div>
            }
        </div>
    );
};

export default DriverProfilePage;