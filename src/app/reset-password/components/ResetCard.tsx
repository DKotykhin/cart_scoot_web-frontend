"use client";

import React from 'react';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

import { useForm } from "react-hook-form";

import { ResetFormValidation } from 'validation/userValidation';
import { EmailInput } from 'components/inputs/_index';

import styles from './resetCard.module.scss';

interface IResetData {
    email: string;
}

const ResetCard = () => {

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IResetData>(ResetFormValidation);

    const onSubmit = (data: IResetData): void => {
        console.log(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.upperBox}>
                <div className={styles.imageBox}>
                    <Image
                        src={'/icons/button.svg'}
                        alt={'button'}
                        width={48}
                        height={48}
                        onClick={() => router.push('/login')}
                    />
                    <Image
                        src={'/avatars/lockAvatar.svg'}
                        alt={'avatar'}
                        width={120}
                        height={120}
                    />
                    <Image
                        src={'/icons/button.svg'}
                        alt={'button'}
                        width={48}
                        height={48}
                    />
                </div>
                <p className='title'>Reset Password</p>
                <p className='subtitle'>Please enter your email address</p>
                <EmailInput
                    error={errors.email}
                    control={control}
                />
            </div>
            <div className={styles.line}></div>
            <div className={styles.lowerBox}>
                <button type='submit' className='button'>Send</button>
                <p className='link'>Don&apos;t have an account yet?
                    <Link href={'/register'}>
                        <span>&nbsp;Register</span>
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default ResetCard;