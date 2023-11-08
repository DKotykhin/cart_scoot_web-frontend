import React from 'react';

import { Control, Controller } from "react-hook-form";

import styles from './textInput.module.scss';

interface ITextInput {
    control: Control<any>;
    name: string;
    placeholder: string;
}

const TextInput: React.FC<ITextInput> = ({ control, name, placeholder }) => {
    return (
        <div className={styles.input_box}>
            <p>{placeholder}</p>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type='text'
                        placeholder={placeholder}
                    />
                )}
            />
        </div>
    );
};

export default TextInput;