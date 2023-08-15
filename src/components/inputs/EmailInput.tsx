import React from 'react';

import Image from "next/image";
import { Control, Controller, FieldError } from "react-hook-form";

import styles from './input.module.scss';

interface IEmailInput {
    error?: FieldError;
    control: Control<any>;
}

const EmailInput: React.FC<IEmailInput> = ({ control, error }) => {
    return (
        <div className={styles.input_box}>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type='email'
                        placeholder='Email Address'
                        className={error ? styles.active : ''}
                    />
                )}
            />
            <p className={styles.error}>{error?.message}</p>
            <Image
                src={'/icons/envelope.svg'}
                alt={'envelope'}
                width={24}
                height={24}
                className={styles.placeholder_icon}
            />
        </div>
    );
};

export { EmailInput };