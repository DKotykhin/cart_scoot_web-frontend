import React from 'react';

import Image from "next/image";

import styles from './miniCard.module.scss';

interface IMiniCard {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
}

const MiniCard: React.FC<IMiniCard> = ({ src, alt, title, subtitle }) => {
    return (
        <div className={styles.container}>
            <Image
                src={src}
                alt={alt}
                width={48}
                height={48}
            />
            <p>{title}</p>
            <p>{subtitle}</p>
        </div>
    );
};

export default MiniCard;