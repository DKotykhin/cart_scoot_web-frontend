"use client";

import React from 'react';

import UserBox from '../userBox/UserBox';
import { IUser } from 'types/userTypes';

import styles from './licensesList.module.scss';

const LicensesList: React.FC<{ users: [IUser] }> = ({ users }) => {

    const detailsClick = (user: IUser) => {
        console.log(user);
    };

    return (
        <div className={styles.licenses_list}>
            <p className={styles.licenses_list_title}>Verify Requests</p>
            {users?.map(user => (
                <div key={user._id} className={styles.licenses_list_item_box}>
                    <UserBox user={user} />
                    <button
                        className='button-green-outlined'
                        onClick={() => detailsClick(user)}
                    >
                        Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LicensesList;