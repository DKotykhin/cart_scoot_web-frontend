import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './logoutCard.module.scss';

interface ILogoutCard {
    logoutClick: () => void;
    logoutCancelClick: () => void;
}

const LogoutCard: React.FC<ILogoutCard> = ({ logoutClick, logoutCancelClick }) => {

    return (
        <div className={styles.container}>
            <div className={styles.logout_background}></div>
            <div className={styles.logout_menu}>
                <Image
                    src={'/avatars/logoutAvatar.svg'}
                    alt={'logout'}
                    width={120}
                    height={120}
                    className={styles.logout_avatar}
                />
                <p className={styles.logout_title}>Logout</p>
                <p className={styles.logout_subtitle}>Are you sure to logout?</p>
                <div className='line'></div>
                <div className={styles.logout_buttons}>
                    <button
                        onClick={logoutCancelClick}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={logoutClick}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutCard;