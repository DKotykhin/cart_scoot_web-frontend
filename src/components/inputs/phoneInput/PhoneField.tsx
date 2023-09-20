import React from 'react';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/high-res.css';

import { Control, Controller, FieldError } from "react-hook-form";

import styles from './field.module.scss';

interface IPhoneField {
    error?: FieldError;
    control: Control<any>;
}

const PhoneField: React.FC<IPhoneField> = ({ error, control }) => {

    return (
        <div className={styles.field}>
            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <PhoneInput
                        {...field}
                        country={'us'}
                        regions={['eu-union', 'north-america']}
                        // masks={{us: '(..) ...-..-..'}}
                        countryCodeEditable={false}
                        inputClass={styles.field__phone}
                        buttonClass={styles.field__index}
                        inputProps={{ autoFocus: true }}
                    />
                )}
            />
            <p className={styles.field__helper}>{error?.message}</p>
        </div>
    );
};

export { PhoneField };