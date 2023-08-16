"use client";

import React from 'react';

import { useForm, Controller } from "react-hook-form";

import { ContactFormValidation } from 'validation/userValidation';
import { EmailInput, UserNameInput } from 'components/inputs/_index';

import styles from './contactForm.module.scss';

interface IContactForm {
    userName: string,
    email: string,
    subject: string,
    message: string,
}

const ContactForm = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IContactForm>(ContactFormValidation);

    const onSubmit = async (data: IContactForm): Promise<void> => {
        console.log(data);
        await fetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({ data })
        })
            .then(response => {
                console.log('Email successfully sent!');
                reset();
            })
            .catch(err => {
                console.log(`Can't send email. Check your internet connection`);
            });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <UserNameInput
                error={errors.userName}
                control={control}
            />
            <EmailInput
                error={errors.email}
                control={control}
            />
            <div className={styles.subject_box}>
                <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type='string'
                            placeholder='Subject (Optional)'
                            className={errors.subject ? styles.active : ''}
                        />
                    )}
                />
                <p className={styles.error}>{errors.subject?.message}</p>
            </div>
            <div className={styles.message_box}>
                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            placeholder='Message'
                            className={errors.message ? styles.active : ''}
                        />
                    )}
                />
                <p className={styles.error}>{errors.message?.message}</p>
            </div>
            <div className={styles.send}>
                <button type='submit' className='button'>Send</button>
            </div>
        </form>
    );
};

export default ContactForm;