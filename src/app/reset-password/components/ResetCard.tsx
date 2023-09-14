"use client";

import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from 'apollo/mutations/user';

import { ResetFormValidation } from 'validation/userValidation';
import { EmailInput } from 'components/inputs/_index';

import styles from './resetCard.module.scss';

interface IResetData {
    email: string;
}

const ResetCard = () => {

    const router = useRouter();
    const [resetPassword] = useMutation(RESET_PASSWORD);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IResetData>(ResetFormValidation);

    const onSubmit = async (data: IResetData): Promise<void> => {
        // console.log(data);
        const { email } = data;
        try {
            const { data } = await resetPassword({
                variables: {
                    email,
                },
            });
            if (data.resetPassword.status) {
                toast.success(data.resetPassword.message, {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
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