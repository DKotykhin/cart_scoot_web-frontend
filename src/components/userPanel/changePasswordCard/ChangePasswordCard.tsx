"use client";

import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'apollo/mutations/user';

import { PasswordInput } from 'components/inputs/PasswordInput';
import { ChangePasswordFormValidation } from 'validation/userValidation';

import styles from './changePassword.module.scss';

interface IPasswordData {
    currentPassword: string,
    password: string,
    confirmPassword: string,
}

interface IChangePasswordCard {
    openChangePasswordClick: () => void;
    changePasswordClick: () => void;

}

const ChangePasswordCard: React.FC<IChangePasswordCard> = ({ changePasswordClick, openChangePasswordClick }) => {

    const [changePassword] = useMutation(CHANGE_PASSWORD);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(ChangePasswordFormValidation);

    const onSubmit = async (data: IPasswordData): Promise<void> => {
        const { currentPassword, password } = data;
        if (currentPassword === password) {
            toast.error('The same password!', {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else {
            try {
                const { data } = await changePassword({
                    variables: {
                        changePasswordInput: {
                            password,
                            currentPassword,
                        }
                    },
                });
                if (data.changePassword.status) {
                    toast.success(data.changePassword.message, {
                        bodyClassName: "right-toast",
                        icon: <Image
                            src={'/icons/right-code.svg'}
                            alt='icon'
                            width={56}
                            height={56}
                        />
                    });
                    changePasswordClick();
                }
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

    return (
        <div className={styles.container} onClick={openChangePasswordClick}>
            <form
                className={styles.password_form}
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.upper_box}>
                    <Image
                        src={'/avatars/keyAvatar.svg'}
                        alt={'key'}
                        width={120}
                        height={120}
                    />
                    <p className={styles.password_title}>Change Password</p>
                    <p className={styles.password_subtitle}>Please enter your Current & new password</p>
                    <PasswordInput
                        error={errors.currentPassword}
                        control={control}
                        placeholder='Current Password'
                        name='currentPassword'
                    />
                    <PasswordInput
                        error={errors.password}
                        control={control}
                        placeholder='New Password'
                        name='password'
                    />
                    <PasswordInput
                        error={errors.confirmPassword}
                        control={control}
                        placeholder='Repeat New Password'
                        name='confirmPassword'
                    />
                    <Link href={'/reset-password'}>
                        <p className={styles.reset}>Forgot Password?</p>
                    </Link>
                </div>
                <div className='line' />
                <div className={styles.lower_box}>
                    <button onClick={openChangePasswordClick}>Cancel</button>
                    <button type='submit'>Change Password</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordCard;