"use client";

import React from 'react';
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'js-cookie';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client';
import { LOGIN_BY_PHONE } from 'apollo/mutations/user';
import { useUserStore } from 'stores/userStore';

import styles from './confirmCodeCard.module.scss';
import { userTypes } from 'types/userTypes';

interface IConfirmCodeCard {
    resendCode: () => void;
    closeModal: () => void;
    phoneNumber: string;
}
interface IAddCode {
    smsCode: string;
}

const ConfirmCodeCard: React.FC<IConfirmCodeCard> = ({ resendCode, closeModal, phoneNumber }) => {

    const [loginByPhone] = useMutation(LOGIN_BY_PHONE);
    const { addUser } = useUserStore();

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IAddCode>({
        defaultValues: {
            smsCode: ""
        }
    });

    const onSubmit = async (formData: IAddCode): Promise<void> => {
        // console.log('Login Code: ', formData);
        const { smsCode } = formData;
        try {
            const { data } = await loginByPhone({
                variables: {
                    loginByPhoneInput: {
                        phone: phoneNumber,
                        smsCode,
                    }
                },
            });
            if (data.loginByPhone.user._id) {
                closeModal();
                Cookies.set('token', data.loginByPhone.token, {
                    expires: 2,
                });
                addUser(data.loginByPhone.user);
                if (data.loginByPhone.user.role === userTypes.driver) router.push('/driver-profile');
                toast.success('Code has been verified successfully', {
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
            toast.warn('Entered code is wrong, please try again', {
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

    const resendClick = () => resendCode();

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            onClick={(e) => e.stopPropagation()}
        >
            <div className={styles.upperBox}>
                <Image
                    src={'/avatars/userAvatar.svg'}
                    alt={'avatar'}
                    width={120}
                    height={120}
                />
                <h2 className='title'>Confirm Mobile Phone</h2>
                <p className='subtitle'>Enter your code</p>
                <div className={styles.smsCode}>
                    <Controller
                        name="smsCode"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                pattern="\d{6}"
                                placeholder='6-digit code*'
                                required
                            />
                        )}
                    />
                </div>
            </div>
            <div className='line'/>
            <div className={styles.lowerBox}>
                <button type='submit' className='button-green-filled'>Login</button>
                <button
                    type='button'
                    className='button-grey-outlined'
                    onClick={resendClick}
                >
                    Resend
                </button>
            </div>
        </form>
    );
};

export default ConfirmCodeCard;