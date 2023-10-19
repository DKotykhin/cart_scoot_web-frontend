"use client";

import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import styles from './titleWithBackButton.module.scss';

interface ITitleWithBackButton {
    title: string,
    pageURL: string
}

const TitleWithBackButton: React.FC<ITitleWithBackButton> = ({ title, pageURL }) => {

    const router = useRouter();

    return (
        <div
            className={styles.title_box}
            onClick={() => router.push(pageURL)}
        >
            <Image
                src={'/icons/caretLeft-big.svg'}
                alt={'caret'}
                width={32}
                height={32}
            />
            <h2 className={styles.profile_title}>{title}</h2>
        </div>
    );
};

export default TitleWithBackButton;