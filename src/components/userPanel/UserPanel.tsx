import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './userPanel.module.scss';

interface IUserPanel {
    changePasswordClick: () => void;
    logoutModalClick: () => void;
}

const UserPanel: React.FC<IUserPanel> = ({ logoutModalClick, changePasswordClick }) => {
    return (
        <div className={styles.user_panel}>
            <Image
                src={'/avatars/John.svg'}
                alt={'avatar'}
                width={56}
                height={56}
                className={styles.user_logo}
            />
            <p className={styles.user_title}>Jimmy Dalton</p>
            <p className={styles.user_subtitle}>Jimmy@gmail.com</p>
            <div className={styles.user_list}>
                <div className={styles.list_item}>
                    <span>Trips & Requests</span>
                    <Image
                        src={'/icons/caretRight.svg'}
                        alt={'right'}
                        width={24}
                        height={24}
                    />
                </div>
                <div className={styles.list_item}>
                    <span>Notification</span>
                    <div className={styles.badge_box}>
                        <span className={styles.list_badge}>
                            1
                        </span>
                        <Image
                            src={'/icons/caretRight.svg'}
                            alt={'right'}
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
                <div 
                    className={styles.list_item}
                    onClick={changePasswordClick}
                >
                    <span>Change Password</span>
                    <Image
                        src={'/icons/caretRight.svg'}
                        alt={'right'}
                        width={24}
                        height={24}
                    />
                </div>
            </div>
            <div
                className={styles.user_logout}
                onClick={logoutModalClick}
            >
                <Image
                    src={'/icons/signOut.svg'}
                    alt={'out'}
                    width={24}
                    height={24}
                />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default UserPanel;