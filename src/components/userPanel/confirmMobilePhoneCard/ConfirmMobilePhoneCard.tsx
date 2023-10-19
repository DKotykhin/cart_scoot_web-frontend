"use client";

import React from 'react';
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";

import Image from "next/image";

import { useMutation } from '@apollo/client';
import { CONFIRM_MOBILE_PHONE } from 'apollo/mutations/user';

import styles from './confirmMobilePhoneCard.module.scss';

interface IConfirmMobilePhoneCard {
    resendCode: () => void;
    closeModal: () => void;
}
interface IAddCode {
    smsCode: string;
}

const ConfirmMobilePhoneCard: React.FC<IConfirmMobilePhoneCard> = ({ resendCode, closeModal }) => {

    const [confirm, { loading }] = useMutation(CONFIRM_MOBILE_PHONE);

    const {
        control,
        handleSubmit,
    } = useForm<IAddCode>({
        defaultValues: {
            smsCode: ""
        }
    });

    const onSubmit = async (formData: IAddCode): Promise<void> => {
        // console.log('Add Code: ', formData);
        const { smsCode } = formData;
        try {
            const { data } = await confirm({
                variables: {
                    smsCode,
                },
            });
            if (data.confirmMobilePhone._id) {
                closeModal();
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
            <div className='line' />
            <div className={styles.lowerBox}>
                <button
                    type='submit'
                    className='button-green-filled'
                >
                    {loading ?
                        <Image
                            src={'/spinner.svg'}
                            alt={'spinner'}
                            width={48}
                            height={48}
                        />
                        : 'Add phone'
                    }
                </button>
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

export default ConfirmMobilePhoneCard;