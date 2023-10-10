import React from 'react';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import { IUser } from 'types/userTypes';

import styles from './userBox.module.scss';

const UserBox: React.FC<{ user?: IUser }> = ({ user }) => {
    return (
        <div className={styles.user_box}>
            <DriverAvatar
                driverName={user?.userName}
                driverAvatarURL={user?.avatarURL}
                hideName={true}
            />
            <div className={styles.admin_text_box}>
                <p className={styles.admin_name}>{user?.userName}</p>
                <p className={styles.admin_email}>{user?.email}</p>
            </div>
        </div>
    );
};

export default UserBox;