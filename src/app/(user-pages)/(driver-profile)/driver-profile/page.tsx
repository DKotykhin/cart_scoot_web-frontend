import React from 'react';

import { getUserByToken } from 'apollo/services/getUserByToken';

import ProfileBox from './components/profileBox/ProfileBox';
import UploadGuide from './components/uploadGuide/UploadGuide';
import UploadService from './components/uploadService/UploadService';
import UserInfo from './components/userInfo/UserInfo';
import UpdateInfoForm from './components/updateInfoForm/UpdateInfoForm';

import { licenseStatusTypes } from 'types/userTypes';

import styles from './profile.module.scss';

const DriverProfilePage = async () => {

    const data = await getUserByToken();

    return (
        <div className={styles.wrapper}>
            <div className={styles.title_box}>
                <h2 className={styles.profile_title}>Profile</h2>
                {data?.getUserByToken.license.status !== licenseStatusTypes.approved &&
                    <h4 className={styles.profile_subtitle}>
                        Please complete your profile to start your Journey
                    </h4>
                }
            </div>
            <ProfileBox user={data?.getUserByToken} />
            <div className={styles.line_box}>
                <div className={styles.line} />
            </div>
            {(data?.getUserByToken.license.status === licenseStatusTypes.pending || data?.getUserByToken.license.status === licenseStatusTypes.rejected) ?
                <div className={styles.document_box}>
                    <p className={styles.document_title}>Your Documents</p>
                    <UploadGuide />
                    <UploadService user={data?.getUserByToken} />
                </div>
                :
                <div className={styles.document_box}>
                    <UserInfo user={data?.getUserByToken} />
                    <UploadService user={data?.getUserByToken} />
                    <UpdateInfoForm user={data?.getUserByToken} />
                </div>
            }
        </div>
    );
};

export default DriverProfilePage;