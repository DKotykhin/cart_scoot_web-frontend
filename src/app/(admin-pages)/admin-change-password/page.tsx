import React from 'react';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminChangePassword.module.scss';

const AdminChangePasswordPage = () => {
    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Change Password' hideAmount={true} />

        </div>
    );
};

export default AdminChangePasswordPage;