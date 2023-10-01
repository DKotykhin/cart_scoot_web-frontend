"use client";

import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'apollo/mutations/user';

import { EmailInput, PasswordInput, RadioButtons } from 'components/inputs/_index';
import { LoginFormValidation } from 'validation/userValidation';
import { useUserStore } from 'stores/userStore';

import { IUserLogin } from 'types/userTypes';

import styles from './loginCard.module.scss';

interface IUserData extends IUserLogin {
    rememberMe: string;
}

const LoginCard = () => {

    const [login] = useMutation(LOGIN);
    const router = useRouter();
    const { addUser } = useUserStore();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IUserData>(LoginFormValidation);

    const onSubmit = async (data: IUserData): Promise<void> => {
        // console.log('Login: ', data);
        const { email, password, rememberMe } = data;
        try {
            const { data } = await login({
                variables: {
                    email,
                    password,
                },
            });
            if (rememberMe) {
                Cookies.set('token', data.loginByEmail.token, {
                    expires: 14,
                });
            } else {
                Cookies.set('token', data.loginByEmail.token, {
                    expires: 1,
                });
            }
            router.push('/');
            addUser(data.loginByEmail.user);
        } catch (err: any) {
            toast.warn(err.message, {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        }
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
                    <Link href={'/reset-password'}>
                        <p>Forgot Password?</p>
                    </Link>
                </div>
            </div>
            <div className='line'/>
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