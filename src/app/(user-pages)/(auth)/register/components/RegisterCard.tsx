"use client";

import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { REGISTER_BY_EMAIL, FULL_REGISTER_BY_PHONE } from 'apollo/mutations/user';

import ConfirmCodeCard from 'components/confirmCodeCard/ConfirmCodeCard';
import { EmailInput, PasswordInput, PhoneField, UserNameInput } from 'components/inputs/_index';
import { RegisterFormValidation, RegisterMobileValidation } from 'validation/userValidation';
import { useUserStore } from 'stores/userStore';

import { IUserRegister, userTypes } from 'types/userTypes';

import styles from './registerCard.module.scss';

interface IUserData extends IUserRegister {
    terms: string;
}
interface IFullRegisterMobileData {
    userName: string;
    phone: string;
    terms: string;
}

const RegisterCard = () => {

    const [userTypeIndex, setUserTypeIndex] = useState(false);
    const [mobileLogin, setMobileLogin] = useState(false);
    const [openConfirmCard, setOpenConfirmCard] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [registerByEmail, { loading: emailLoading }] = useMutation(REGISTER_BY_EMAIL);
    const [fullRegisterByPhone, { loading: phoneFullLoading }] = useMutation(FULL_REGISTER_BY_PHONE);

    const router = useRouter();
    const { addUser } = useUserStore();

    const {
        control: emailControl,
        handleSubmit: emailHandleSubmit,
        formState: { errors: emailErrors },
    } = useForm<IUserData>(RegisterFormValidation);

    const {
        control: phoneControl,
        handleSubmit: phoneHandleSubmit,
        formState: { errors: phoneErrors },
    } = useForm<IFullRegisterMobileData>(RegisterMobileValidation);

    const onEmailSubmit = async (data: IUserData): Promise<void> => {
        const { email, password, userName, terms } = data;
        if (terms) {
            try {
                const { data } = await registerByEmail({
                    variables: {
                        registerUserInput: {
                            email,
                            password,
                            userName,
                            role: userTypeIndex ? userTypes.driver : userTypes.rider,
                        }
                    },
                });
                Cookies.set('token', data.registerByEmail.token, {
                    expires: 2,
                });
                addUser(data.registerByEmail.user);
                if (data.registerByEmail.user.role === userTypes.driver) router.push('/driver-profile');
                else router.push('/');
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
        } else toast.warn('Please, read and agree with Terms and conditions', {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        });
    };

    const onPhoneSubmit = async (formData: IFullRegisterMobileData): Promise<void> => {
        const { userName, terms } = formData;
        const phone = `+${formData?.phone}`;
        if (terms) {
            setPhoneNumber(phone);
            try {
                const { data } = await fullRegisterByPhone({
                    variables: {
                        fullRegisterByPhoneInput: {
                            userName,
                            phone,
                            role: userTypeIndex ? userTypes.driver : userTypes.rider,
                        }
                    },
                });
                if (data.fullRegisterByPhone.user._id) setOpenConfirmCard(true);
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
        } else toast.warn('Please, read and agree with Terms and conditions', {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        });
    };

    const closeModal = () => router.push('/');

    const riderClick = () => {
        if (userTypeIndex) setUserTypeIndex(prev => !prev);
    };
    const driverClick = () => {
        if (!userTypeIndex) setUserTypeIndex(prev => !prev);
    };

    return openConfirmCard ?
        <ConfirmCodeCard
            closeModal={closeModal}
            phoneNumber={phoneNumber}
        />
        :
        <form className={styles.form} onSubmit={mobileLogin ? phoneHandleSubmit(onPhoneSubmit) : emailHandleSubmit(onEmailSubmit)}>
            <div className={styles.upperBox}>
                <div className={styles.user_box}>
                    <button
                        className={userTypeIndex ? styles.user_button : styles.user_button_active}
                        onClick={riderClick}
                        type='button'
                    >
                        Rider
                    </button>
                    <button
                        className={userTypeIndex ? styles.user_button_active : styles.user_button}
                        onClick={driverClick}
                        type='button'
                    >
                        Driver
                    </button>
                </div>
                <Image
                    src={'/avatars/userAvatar.svg'}
                    alt={'avatar'}
                    width={120}
                    height={120}
                    className={styles.avatar}
                />
                <p className='title'>Welcome to CartScoop!</p>
                <p className='subtitle'>Please fill out below form in order to registration</p>
                {mobileLogin ?
                    <>
                        <UserNameInput
                            error={phoneErrors.userName}
                            control={phoneControl}
                        />
                        <PhoneField
                            error={phoneErrors.phone}
                            control={phoneControl}
                        />
                        <div className={styles.checkbox}>
                            <Controller
                                name="terms"
                                control={phoneControl}
                                render={({ field }) => (
                                    <input {...field} type='checkbox' />
                                )}
                            />
                            <label htmlFor='checkbox'>
                                I&apos;m over <span>15</span> and also I&apos;ve read and accept
                                <Link href={'/'}>&nbsp;Terms and condition</Link>
                            </label>
                        </div>
                    </>
                    :
                    <>
                        <div className={styles.firstInputLine}>
                            <UserNameInput
                                error={emailErrors.userName}
                                control={emailControl}
                            />
                            <EmailInput
                                error={emailErrors.email}
                                control={emailControl}
                            />
                        </div>
                        <PasswordInput
                            error={emailErrors.password}
                            control={emailControl}
                            placeholder='Password'
                            name='password'
                        />
                        <PasswordInput
                            error={emailErrors.confirmPassword}
                            control={emailControl}
                            placeholder='Repeat Password'
                            name='confirmPassword'
                        />
                        <div className={styles.checkbox}>
                            <Controller
                                name="terms"
                                control={emailControl}
                                render={({ field }) => (
                                    <input {...field} type='checkbox' />
                                )}
                            />
                            <label htmlFor='checkbox'>
                                I&apos;m over <span>15</span> and also I&apos;ve read and accept
                                <Link href={'/'}>&nbsp;Terms and condition</Link>
                            </label>
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
                        {mobileLogin ? 'Register with Email' : 'Register with phone number'}
                    </button>
                    <button type='submit' className='button-green-filled'>
                        {emailLoading || phoneFullLoading ?
                            <Image
                                src={'/spinner.svg'}
                                alt={'spinner'}
                                width={48}
                                height={48}
                            />
                            : userTypeIndex ? 'Register as a driver' : 'Register as a rider'
                        }
                    </button>
                </div>
                <button className='link'>Already have an account?
                    <Link href={'/login'}>
                        <span>&nbsp;Login</span>
                    </Link>
                </button>
            </div>
        </form>;
};

export default RegisterCard;