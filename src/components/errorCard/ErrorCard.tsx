import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './errorCard.module.scss';

interface IErrorCard {
    title: string;
    subtitle: string;
}

const ErrorCard: React.FC<IErrorCard> = ({ title, subtitle }) => {

    return (
        <div className={styles.error_container}>
            <div className={styles.error_wrapper}>
                <Image
                    src={'/avatars/wrongAvatar.svg'}
                    alt={'error'}
                    width={192}
                    height={192}
                    className={styles.error_image}
                />
                <p className={styles.error_title}>{title}</p>
                <p className={styles.error_subtitle}>{subtitle}</p>
                <Link href={'/'}>
                    Back to home
                </Link>
            </div>
        </div>
    );
};

export default ErrorCard;