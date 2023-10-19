import React from 'react';

import Image from "next/image";

import styles from './emptyList.module.scss';

interface IEmptyList {
    title: string,
    subtitle: string,
}

const EmptyList: React.FC<IEmptyList> = ({ title, subtitle }) => {
    return (
        <div className={styles.empty_wrapper}>
            <Image
                src={'/emptyList.svg'}
                alt={'empty'}
                width={196}
                height={192}
                className={styles.empty_image}
            />
            <h3 className={styles.empty_title}>{title}</h3>
            <p className={styles.empty_p}>{subtitle}</p>
        </div>
    );
};

export default EmptyList;