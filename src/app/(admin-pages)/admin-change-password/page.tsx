import React from 'react';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminChangePassword.module.scss';
import ChangePasswordButton from './components/ChangePasswordButton';

const AdminChangePasswordPage = () => {
    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Change Password' hideAmount={true} />
            <ChangePasswordButton />
        </div>
    );
};

export default AdminChangePasswordPage;