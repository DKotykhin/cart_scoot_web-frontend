"use client";

import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './requestSentCard.module.scss';

const RequestSentCard: React.FC<{ code: string }> = ({ code }) => {
    return (
        <div className={styles.container}>

            <div className={styles.upperBox}>
                <Image
                    src={'/avatars/checkAvatar.svg'}
                    alt={'avatar'}
                    width={120}
                    height={120}
                />
                <h2 className='title'>Request Sent</h2>
                <p className={styles.first_subtitle}>Your request has been sent successfully and if driver accepts we will notify you</p>
                <p className={styles.second_subtitle}>Request Number: <span>{code}</span></p>
            </div>
            <div className='line'></div>
            <div className={styles.lowerBox}>
                <Link href={'/requests-list'}>
                    <button className='button-green-filled'>Requests</button>
                </Link>
                <Link href={'/'}>
                    <button className='button-green-outlined'>Home</button>
                </Link>
            </div>

        </div>
    );
};

export default RequestSentCard;