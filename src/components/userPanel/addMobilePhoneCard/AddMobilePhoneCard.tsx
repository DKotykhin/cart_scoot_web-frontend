"use client";

import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Image from "next/image";
import Link from 'next/link';

import { useMutation } from '@apollo/client';
import { ADD_MOBILE_PHONE } from 'apollo/mutations/user';

import { PhoneField } from 'components/inputs/_index';
import { AddMobileValidation } from 'validation/userValidation';

import styles from './addMobilePhoneCard.module.scss';
import ConfirmMobilePhoneCard from '../confirmMobilePhoneCard/ConfirmMobilePhoneCard';

interface IAddMobileData {
    phone: string;
    terms: string;
}
interface IAddMobilePhoneCard {
    handleClose: () => void;
}

const AddMobilePhoneCard: React.FC<IAddMobilePhoneCard> = ({ handleClose }) => {

    const [openConfirmCard, setOpenConfirmCard] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    // const openConfirmCard = true;

    const [addMobile] = useMutation(ADD_MOBILE_PHONE);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IAddMobileData>(AddMobileValidation);

    const onSubmit = async (formData: IAddMobileData): Promise<void> => {
        // console.log('Add Mobile Phone: ', formData);
        const phone = `+${formData?.phone}`;
        setPhoneNumber(phone);
        try {
            const { data } = await addMobile({
                variables: {
                    phone,
                },
            });
            if (data.addMobilePhone._id) setOpenConfirmCard(true);
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
        // console.log('resend');
        if (phoneNumber) {
            try {
                await addMobile({
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

    const closeModal = () => handleClose();

    return (
        <div className={styles.container} onClick={handleClose}>
            {openConfirmCard ?
                <ConfirmMobilePhoneCard resendCode={resendCode} closeModal={closeModal} /> :
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
                        <h2 className='title'>Add Mobile Phone</h2>
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
                    <div className='line'></div>
                    <div className={styles.lowerBox}>
                        <button type='submit' className='button'>Send a code</button>
                    </div>
                </form>
            }
        </div>
    );
};

export default AddMobilePhoneCard;