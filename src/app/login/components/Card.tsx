"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

import { useForm, Controller } from "react-hook-form";

import { IUserLogin } from 'types/userTypes';
import { LoginFormValidation } from 'validation/userValidation';

import styles from './card.module.scss';

interface IUserData extends IUserLogin {
    radio: string;
    rememberMe: string;
}

const Card = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [active, setActive] = useState(false);
    const handleClick = () => setShowPassword(!showPassword);

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
            <div className={styles.radioBox}>
                <div className={styles.radio} onClick={() => setActive(false)}>
                    <label>
                        <Controller
                            name="radio"
                            control={control}
                            defaultValue='user'
                            render={({ field }) => (
                                <input {...field} type="radio" name="radio" value='user' className={active ? '' : styles.active} />
                            )}
                        />
                        <span className={styles.label}>User</span>
                    </label>
                </div>
                <div className={styles.radio} onClick={() => setActive(true)}>
                    <label>
                        <Controller
                            name="radio"
                            control={control}
                            render={({ field }) => (
                                <input {...field} type="radio" name="radio" value='driver' className={active ? styles.active : ''} />
                            )}
                        />
                        <span className={styles.label}>Driver</span>
                    </label>
                </div>
            </div>
            <Image
                src={'/icons/avatar.svg'}
                alt={'avatar'}
                width={100}
                height={100}
                className={styles.avatar}
            />
            <p className='title'>Welcome Back!</p>
            <p className='subtitle'>Please enter your email and password</p>
            <div className={styles.input_box}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type='email'
                            placeholder='Email Address'
                            className={Boolean(errors.email) ? styles.active : ''}
                        />
                    )}
                />
                <p className={styles.error}>{errors.email?.message}</p>
                <Image
                    src={'/icons/envelope.svg'}
                    alt={'envelope'}
                    width={24}
                    height={24}
                    className={styles.placeholder_icon}
                />
            </div>
            <div className={styles.input_box}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className={Boolean(errors.password) ? styles.active : ''}
                        />
                    )}
                />
                <p className={styles.error}>{errors.password?.message}</p>
                <Image
                    src={'/icons/key.svg'}
                    alt={'key'}
                    width={24}
                    height={24}
                    className={styles.placeholder_icon}
                />
                <Image
                    src={'/icons/eye.svg'}
                    alt={'eye'}
                    width={24}
                    height={24}
                    className={styles.eye_icon}
                    onClick={handleClick}
                />
            </div>
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
            <div className={styles.line}></div>
            <button type='submit'>Login</button>
            <p className={styles.link}>Don&apos;t have an account yet?
                <Link href={'/register'}>
                    <span>&nbsp;Register</span>
                </Link>
            </p>
        </form>
    );
};

export default Card;