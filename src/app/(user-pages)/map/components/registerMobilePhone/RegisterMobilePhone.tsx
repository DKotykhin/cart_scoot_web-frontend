"use client";

import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Image from "next/image";
import Link from 'next/link';

import { useMutation } from '@apollo/client';
import { REGISTER_BY_PHONE } from 'apollo/mutations/user';

import ConfirmCodeCard from 'components/confirmCodeCard/ConfirmCodeCard';
import { PhoneField } from 'components/inputs/_index';
import { AddMobileValidation } from 'validation/userValidation';

import styles from './registerMobilePhone.module.scss';

interface IRegisterMobileData {
    phone: string;
    terms: string;
}
interface IRegisterMobilePhone {
    handleClose: () => void;
}

const RegisterMobilePhone: React.FC<IRegisterMobilePhone> = ({ handleClose }) => {

    const [openConfirmCard, setOpenConfirmCard] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [registerByPhone, { loading }] = useMutation(REGISTER_BY_PHONE);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IRegisterMobileData>(AddMobileValidation);

    const onSubmit = async (formData: IRegisterMobileData): Promise<void> => {
        // console.log('Register Mobile Phone: ', formData);
        const phone = `+${formData?.phone}`;
        setPhoneNumber(phone);
        try {
            const { data } = await registerByPhone({
                variables: {
                    registerByPhoneInput: {
                        phone,
                        userName: "",
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

    const closeModal = () => handleClose();

    return (
        <div className={styles.container} onClick={handleClose}>
            {openConfirmCard ?
                <ConfirmCodeCard
                    closeModal={closeModal}
                    phoneNumber={phoneNumber}
                /> :
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
                        <h2 className='title'>Welcome to CartScoot!</h2>
                        <p className='subtitle'>Enter your phone number</p>
                        <PhoneField
                            error={errors.phone}
                            control={control}
                        />
                        <div className={styles.checkbox_wrapper}>
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
                            <p className={styles.checkbox_error}>{errors.terms?.message}</p>
                        </div>
                    </div>
                    <div className='line' />
                    <div className={styles.lowerBox}>
                        <button type='submit' className='button-green-filled'>
                            {loading ?
                                <Image
                                    src={'/spinner.svg'}
                                    alt={'spinner'}
                                    width={48}
                                    height={48}
                                />
                                : 'Send a code'
                            }
                        </button>
                        <button type='button' className={styles.button_login}>
                            Already have an email account?
                            <Link href={'/login'}>
                                <span>Login</span>
                            </Link>
                        </button>
                    </div>
                </form>
            }
        </div>
    );
};

export default RegisterMobilePhone;