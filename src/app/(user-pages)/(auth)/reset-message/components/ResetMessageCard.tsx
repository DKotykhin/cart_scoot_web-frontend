import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import styles from './resetMessageCard.module.scss';

const ResetMessageCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.upperBox}>
                <Image
                    src={'/avatars/resetAvatar.svg'}
                    alt={'avatar'}
                    width={120}
                    height={120}
                    className={styles.avatar}
                />
                <p className='title'>Password Reset</p>
                <p className='subtitle'>Your password has been reset successfully</p>
            </div>
            <div className='line'/>
            <div className={styles.lowerBox}>
                <Link href={'/login'}>
                    <button className='button-green-filled'>Login</button>
                </Link>
            </div>
        </div>
    );
};

export default ResetMessageCard;