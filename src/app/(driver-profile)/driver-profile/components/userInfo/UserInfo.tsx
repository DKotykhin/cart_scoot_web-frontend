import React from 'react';

import { IUser } from 'types/userTypes';

import styles from './userInfo.module.scss';

const UserInfo: React.FC<{ user?: IUser }> = ({ user }) => {
    
    return (
        <div>UserInfo</div>
    );
};

export default UserInfo;