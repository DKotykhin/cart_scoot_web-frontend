"use client";

import React from 'react';

import styles from './titleBox.module.scss';
import StarsBox from 'app/(driver-profile)/components/starsBox/StarsBox';

const TitleBox = () => {
    return (
        <div className={styles.title_box}>
            <h2 className={styles.profile_title}>Rate & comments</h2>
            <StarsBox />
        </div>
    );
};

export default TitleBox;