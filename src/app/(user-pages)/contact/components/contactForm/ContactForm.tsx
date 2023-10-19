"use client";

import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Image from "next/image";

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
        await fetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({ data })
        })
            .then(response => {
                toast.success('Email successfully sent!', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
                reset();
            })
            .catch(err => {
                toast.warn(err.message, {
                    bodyClassName: "wrong-toast",
                    icon: <Image
                        src={'/icons/wrong-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
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