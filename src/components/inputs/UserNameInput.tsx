import React from 'react';

import Image from "next/image";
import { Control, Controller, FieldError } from "react-hook-form";

import styles from './input.module.scss';

interface IUserNameInput {
    error?: FieldError;
    control: Control<any>;
}

const UserNameInput: React.FC<IUserNameInput> = ({ control, error }) => {
    return (
        <div className={styles.input_box}>
            <Controller
                name="userName"
                control={control}
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