import React from 'react';

import Image from "next/image";

import { IUser } from 'types/userTypes';

import styles from './userInfo.module.scss';

const UserInfo: React.FC<{ user?: IUser }> = ({ user }) => {

    return (
        <div className={styles.userInfo}>
            <p className={styles.userInfo_title}>Your Information</p>
            <div className={styles.info_box}>
                <div className={styles.info_item}>
                    <Image
                        src={'/icons/user.svg'}
                        alt='user'
                        width={24}
                        height={24}
                    />
                    <p className={styles.item_text}>{user?.userName}</p>
                    <p className={styles.item_title}>Full Name</p>
                </div>
                <div className={styles.info_item}>
                    <Image
                        src={'/icons/envelope.svg'}
                        alt='user'
                        width={24}
                        height={24}
                    />
                    <p className={styles.item_text}>{user?.email}</p>
                    <p className={styles.item_title}>Email Address</p>
                </div>
                <div className={styles.info_item}>
                    <Image
                        src={'/icons/phone.svg'}
                        alt='user'
                        width={24}
                        height={24}
                    />
                    <p className={styles.item_text}>{user?.phone.number}</p>
                    <p className={styles.item_title}>Phone Number</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;