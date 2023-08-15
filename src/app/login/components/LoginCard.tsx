"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';

import { useForm, Controller } from "react-hook-form";

import { EmailInput, PasswordInput, RadioButtons } from 'components/inputs/_index';
import { LoginFormValidation } from 'validation/userValidation';

import { IUserLogin } from 'types/userTypes';

import styles from './loginCard.module.scss';

interface IUserData extends IUserLogin {
    rememberMe: string;
}

const LoginCard = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IUserData>(LoginFormValidation);

    const onSubmit = (data: IUserData): void => {
        console.log(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.upperBox}>
                <RadioButtons
                    control={control}
                />
                <Image
                    src={'/avatars/userAvatar.svg'}
                    alt={'avatar'}
                    width={120}
                    height={120}
                    className={styles.avatar}
                />
                <p className='title'>Welcome Back!</p>
                <p className='subtitle'>Please enter your email and password</p>
                <EmailInput
                    error={errors.email}
                    control={control}
                />
                <PasswordInput
                    error={errors.password}
                    control={control}
                    placeholder='Password'
                    name='password'
                />
                <div className={styles.box}>
                    <div className={styles.checkbox}>
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => (
                                <input {...field} type='checkbox' />
                            )}
                        />
                        <label htmlFor='checkbox'>
                            Remember Me
                        </label>
                    </div>
                    <Link href={'/reset'}>
                        <p>Reset Password</p>
                    </Link>
                </div>
            </div>
            <div className='line'></div>
            <div className={styles.lowerBox}>
                <button type='submit' className='button'>Login</button>
                <p className='link'>Don&apos;t have an account yet?
                    <Link href={'/register'}>
                        <span>&nbsp;Register</span>
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginCard;