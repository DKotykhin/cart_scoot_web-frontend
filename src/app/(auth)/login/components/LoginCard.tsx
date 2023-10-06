"use client";

import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { LOGIN_BY_EMAIL, REGISTER_BY_PHONE } from 'apollo/mutations/user';

import ConfirmCodeCard from 'components/confirmCodeCard/ConfirmCodeCard';
import { EmailInput, PasswordInput, PhoneField } from 'components/inputs/_index';
import { LoginFormValidation, LoginMobileValidation } from 'validation/userValidation';
import { useUserStore } from 'stores/userStore';

import { IUserLogin } from 'types/userTypes';

import styles from './loginCard.module.scss';

interface IUserData extends IUserLogin {
    rememberMe: string;
}
interface IRegisterMobileData {
    phone: string;
    rememberMe: string;
}

const LoginCard = () => {

    const [mobileLogin, setMobileLogin] = useState(false);
    const [openConfirmCard, setOpenConfirmCard] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [loginByEmail] = useMutation(LOGIN_BY_EMAIL);
    const [registerByPhone] = useMutation(REGISTER_BY_PHONE);

    const router = useRouter();
    const { addUser } = useUserStore();

    const {
        control: emailControl,
        handleSubmit: emailHandleSubmit,
        formState: { errors: emailErrors },
    } = useForm<IUserData>(LoginFormValidation);

    const {
        control: phoneControl,
        handleSubmit: phoneHandleSubmit,
        formState: { errors: phoneErrors },
    } = useForm<IRegisterMobileData>(LoginMobileValidation);

    const onEmailSubmit = async (data: IUserData): Promise<void> => {
        // console.log('Email login: ', data);
        const { email, password, rememberMe } = data;
        try {
            const { data } = await loginByEmail({
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

    const onPhoneSubmit = async (data: IRegisterMobileData): Promise<void> => {
        // console.log('Phone login: ', data);
        const phone = `+${data?.phone}`;
        setPhoneNumber(phone);
        try {
            const { data } = await registerByPhone({
                variables: {
                    registerByPhoneInput: {
                        phone,
                    }
                },
            });
            if (data.registerByPhone.user._id) setOpenConfirmCard(true);
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

    const resendCode = async () => {
        if (phoneNumber) {
            try {
                await registerByPhone({
                    variables: {
                        phone: phoneNumber,
                    },
                });
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
        }
    };

    const closeModal = () => router.push('/');

    return openConfirmCard ?
        <ConfirmCodeCard
            resendCode={resendCode}
            closeModal={closeModal}
            phoneNumber={phoneNumber}
        />
        : <form className={styles.form} onSubmit={mobileLogin ? phoneHandleSubmit(onPhoneSubmit) : emailHandleSubmit(onEmailSubmit)}>
            <div className={styles.upperBox}>
                <Image
                    src={'/avatars/userAvatar.svg'}
                    alt={'avatar'}
                    width={120}
                    height={120}
                    className={styles.avatar}
                />
                <p className='title'>Welcome Back!</p>
                <p className='subtitle'>Please enter your Phone number</p>
                {mobileLogin ?
                    <>
                        <PhoneField
                            error={phoneErrors.phone}
                            control={phoneControl}
                        />
                        <div className={styles.box}>
                            <div className={styles.checkbox}>
                                <Controller
                                    name="rememberMe"
                                    control={phoneControl}
                                    render={({ field }) => (
                                        <input {...field} type='checkbox' />
                                    )}
                                />
                                <label htmlFor='checkbox'>
                                    Remember Me
                                </label>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <EmailInput
                            error={emailErrors.email}
                            control={emailControl}
                        />
                        <PasswordInput
                            error={emailErrors.password}
                            control={emailControl}
                            placeholder='Password'
                            name='password'
                        />
                        <div className={styles.box}>
                            <div className={styles.checkbox}>
                                <Controller
                                    name="rememberMe"
                                    control={emailControl}
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
                    </>
                }
            </div>
            <div className='line' />
            <div className={styles.lowerBox}>
                <div className={styles.login_button_box}>
                    <button
                        type='button'
                        className='button-green-outlined'
                        onClick={() => setMobileLogin(prev => !prev)}
                    >
                        {mobileLogin ? 'Login with Email and Password' : 'Login with phone number'}
                    </button>
                    <button type='submit' className='button-green-filled'>Login</button>
                </div>
                <p className='link'>Don&apos;t have an account yet?
                    <Link href={'/register'}>
                        <span>&nbsp;Register</span>
                    </Link>
                </p>
            </div>
        </form>;
};

export default LoginCard;