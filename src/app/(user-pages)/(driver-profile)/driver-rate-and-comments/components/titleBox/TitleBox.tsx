"use client";

import React from 'react';

import StarsBox from '../../../components/starsBox/StarsBox';

import styles from './titleBox.module.scss';

const TitleBox: React.FC<{ totalCount?: number }> = ({ totalCount }) => {

    return (
        <div className={styles.title_container}>
            <div className={styles.title_box}>
                <h2 className={styles.profile_title}>Rate & comments</h2>
                <div className={styles.review_amount}>{totalCount}</div>
            </div>
            <StarsBox />
        </div>
    );
};

export default TitleBox;


//.filter(item => Boolean(item.text))