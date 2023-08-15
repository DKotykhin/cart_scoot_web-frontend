"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

import { useForm, Controller } from "react-hook-form";

import { EmailInput, PasswordInput, RadioButtons, UserNameInput } from 'components/inputs/_index';
import { RegisterFormValidation } from 'validation/userValidation';
import { IUserRegister } from 'types/userTypes';

import styles from './registerCard.module.scss';

interface IUserData extends IUserRegister {
    terms: string;
}

const RegisterCard = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IUserData>(RegisterFormValidation);

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
                <p className='title'>Welcome to CartScoop!</p>
                <p className='subtitle'>Please fill out below form in order to registration</p>
                <div className={styles.firstInputLine}>
                    <UserNameInput
                        error={errors.email}
                        control={control}
                    />
                    <EmailInput
                        error={errors.email}
                        control={control}
                    />
                </div>
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
                <div className={styles.checkbox}>
                    <Controller
                        name="terms"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type='checkbox' />
                        )}
                    />
                    <label htmlFor='checkbox'>
                        I&apos;m over <span>16</span> and also I&apos;ve read and accept
                        <Link href={'/'}>&nbsp;Terms and condition</Link>
                    </label>
                </div>
            </div>
            <div className='line'></div>
            <div className={styles.lowerBox}>
                <button type='submit' className='button'>Register</button>
                <p className='link'>Already have an account?
                    <Link href={'/login'}>
                        <span>&nbsp;Login</span>
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default RegisterCard;