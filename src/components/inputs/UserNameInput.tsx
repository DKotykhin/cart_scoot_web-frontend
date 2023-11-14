import React from 'react';

import Image from "next/image";
import { Control, Controller, FieldError } from "react-hook-form";

import styles from './input.module.scss';

interface IUserNameInput {
    error?: FieldError;
    control: Control<any>;
    defaultValue?: string;
}

const UserNameInput: React.FC<IUserNameInput> = ({ control, error, defaultValue = "" }) => {
    return (
        <div className={styles.input_box}>
            <Controller
                name="userName"
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <input
                        {...field}
                        type='text'
                        placeholder='Full Name'
                        className={error ? styles.active : ''}
                    />
                )}
            />
            <p className={styles.error}>{error?.message}</p>
            <Image
                src={'/icons/user.svg'}
                alt={'envelope'}
                width={24}
                height={24}
                className={styles.placeholder_icon}
            />
        </div>
    );
};

export { UserNameInput };