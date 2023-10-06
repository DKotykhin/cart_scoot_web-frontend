"use client";

import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './askLoginCard.module.scss';

interface IAskLoginCard {
    closeLoginModal: () => void;
    openPhoneCard: () => void;
}

const AskLoginCard: React.FC<IAskLoginCard> = ({ closeLoginModal, openPhoneCard }) => {

    return (
        <div className={styles.container} onClick={closeLoginModal}>
            <div
                className={styles.wrapper}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.upperBox}>
                    <Image
                        src={'/avatars/userAvatar.svg'}
                        alt={'avatar'}
                        width={120}
                        height={120}
                    />
                    <h2 className='title'>Login</h2>
                    <p className='subtitle'>Dear user, Please login to your account or sign up for free in order to use CartScoot services.</p>
                </div>
                <div className='line'/>
                <div className={styles.lowerBox}>
                    <Link href={'/login'}>
                        <button className='button-green-filled'>Login with email</button>
                    </Link>
                    <button 
                        className='button-green-outlined'
                        onClick={openPhoneCard}
                    >
                        Login with Phone number
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AskLoginCard;