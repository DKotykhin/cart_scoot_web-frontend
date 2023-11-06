import React, { ReactNode } from 'react';
import Image from "next/image";

import styles from './detailsItem.module.scss';

interface IDetailsItem {
    imageURL: string;
    title: string;
    value: string | ReactNode;
}

const DetailsItem: React.FC<IDetailsItem> = ({ imageURL, title, value }) => {
    return (
        <div className={styles.tip_box}>
            <div className={styles.tip_title_box}>
                <Image
                    src={imageURL}
                    alt={'pin'}
                    width={24}
                    height={24}
                />
                <p>{title}</p>
            </div>
            <div className={styles.tip_value}>
                {value}
            </div>
        </div>
    );
};

export default DetailsItem;