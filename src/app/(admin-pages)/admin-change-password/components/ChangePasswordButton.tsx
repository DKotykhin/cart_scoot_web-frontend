"use client";

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import ChangePasswordCard from 'components/userPanel/changePasswordCard/ChangePasswordCard';
import { useUserStore } from 'stores/userStore';

import styles from './changePasswordButton.module.scss';

const ChangePasswordButton = () => {

    const [openChangePasswordCard, setOpenChangePasswordCard] = useState(false);

    const router = useRouter();

    const { setUserEmpty } = useUserStore();

    const changePasswordClick = () => {
        console.log('change');
        setOpenChangePasswordCard(prev => !prev);
        Cookies.remove('token');
        router.push('/login');
        setUserEmpty();
    };
    const openChangePasswordClick = () => setOpenChangePasswordCard(prev => !prev);

    return (
        <>
            <div className={styles.container}>
                <button
                    className='button-green-filled'
                    onClick={() => setOpenChangePasswordCard(true)}
                >
                    Change Password
                </button>
            </div>
            {openChangePasswordCard &&
                <ChangePasswordCard
                    changePasswordClick={changePasswordClick}
                    openChangePasswordClick={openChangePasswordClick}
                />
            }
        </>
    );
};

export default ChangePasswordButton;