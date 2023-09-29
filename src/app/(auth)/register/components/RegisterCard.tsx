"use client";

import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { REGISTER } from 'apollo/mutations/user';

import { EmailInput, PasswordInput, RadioButtons, UserNameInput } from 'components/inputs/_index';
import { RegisterFormValidation } from 'validation/userValidation';
import { useUserStore } from 'stores/userStore';

import { IUserRegister } from 'types/userTypes';

import styles from './registerCard.module.scss';

interface IUserData extends IUserRegister {
    terms: string;
}

const RegisterCard = () => {

    const [register] = useMutation(REGISTER);
    const router = useRouter();
    const { addUser } = useUserStore();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IUserData>(RegisterFormValidation);

    const onSubmit = async (data: IUserData): Promise<void> => {
        // console.log('Register: ', data);
        const { email, password, userName, role, terms } = data;
        if (terms) {
            try {
                const { data } = await register({
                    variables: {
                        registerUserInput: {
                            email,
                            password,
                            userName,
                            role,
                        }
                    },
                });
                Cookies.set('token', data.registerByEmail.token, {
                    expires: 1,
                });
                addUser(data.registerByEmail.user);
                router.push('/');
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
                        error={errors.userName}
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
            <div className='line'/>
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