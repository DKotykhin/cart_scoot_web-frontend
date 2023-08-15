import React, { useState } from 'react';

import Image from "next/image";
import { Control, Controller, FieldError } from "react-hook-form";

import styles from './input.module.scss';

interface IPasswordInput {
    error?: FieldError;
    control: Control<any>;
    placeholder: string;
    name: string;
}

const PasswordInput: React.FC<IPasswordInput> = ({ control, error, placeholder, name }) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => setShowPassword(!showPassword);

    return (
        <div className={styles.input_box}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={placeholder}
                        className={Boolean(error) ? styles.active : ''}
                    />
                )}
            />
            <p className={styles.error}>{error?.message}</p>
            <Image
                src={'/icons/key.svg'}
                alt={'key'}
                width={24}
                height={24}
                className={styles.placeholder_icon}
            />
            <Image
                src={'/icons/eye.svg'}
                alt={'eye'}
                width={24}
                height={24}
                className={styles.eye_icon}
                onClick={handleClick}
            />
        </div>
    );
};

export { PasswordInput };