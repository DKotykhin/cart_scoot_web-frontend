"use client";

import React from 'react';

import { useForm, Controller } from "react-hook-form";

import { ContactFormValidation } from 'validation/userValidation';
import { EmailInput, UserNameInput } from 'components/inputs/_index';
import SendEmail from 'services/send-email';

import styles from './contactForm.module.scss';

interface IContactForm {
    userName: string,
    email: string,
    subject: string,
    message: string,
}

// const sendMail = () => {
//     sgMail.setApiKey(process.env.NEXT_PUBLIC_EMAIL_PASS as string);
//     const msg = {
//         to: 'kotykhin_d@ukr.net',
//         from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS as string,
//         subject: 'Sending with Twilio SendGrid is Fun',
//         text: 'and easy to do anywhere, even with Node.js',
//         html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     };

//     sgMail
//         .send(msg)
//         .then((result) => { console.log(result); }, error => {
//             console.error(error);

//             if (error.response) {
//                 console.error(error.response.body);
//             }
//         });
// };

const ContactForm = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IContactForm>(ContactFormValidation);

    const onSubmit = async (data: IContactForm): Promise<void> => {
        console.log(data);
        await SendEmail();
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