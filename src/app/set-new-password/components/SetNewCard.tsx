"use client";

import React from 'react';

import { useRouter } from 'next/navigation';
import Image from "next/image";

import { useForm } from "react-hook-form";
import { SetFormValidation } from 'validation/userValidation';
import { PasswordInput } from 'components/inputs/_index';

import styles from './setNewCard.module.scss';

interface IPasswordData {
    password: string;
    confirmPassword: string
}

const SetNewCard: React.FC<{ token: string }> = ({ token }) => {

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(SetFormValidation);

    const onSubmit = (data: IPasswordData): void => {
        const { password, confirmPassword } = data;
        if (password === confirmPassword) {
            const newData = { password, token};
            console.log(newData);            
        } else console.log("passwords don't match");
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
                        src={'/avatars/keyAvatar.svg'}
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
                <p className='title'>Set New Password</p>
                <p className='subtitle'>Please enter your new password</p>
                <PasswordInput
                    error={errors.password}
                    control={control}
                    placeholder='Password'
                    name='password'
                />
                <PasswordInput
                    error={errors.confirmPassword}
                    control={control}
                    placeholder='Repeat Password'
                    name='confirmPassword'
                />
            </div>
            <div className={styles.line}></div>
            <div className={styles.lowerBox}>
                <button type='submit' className='button'>Reset Password</button>
            </div>
        </form>
    );
};

export default SetNewCard;