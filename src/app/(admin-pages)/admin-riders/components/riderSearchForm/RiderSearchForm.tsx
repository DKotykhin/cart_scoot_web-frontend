"use client";

import React from 'react';
import { useForm, Controller } from "react-hook-form";

import Image from 'next/image';

import styles from './riderSearchForm.module.scss';

export interface IRiderSearchData {
    searchUserName?: string,
}

interface IRiderSearchForm {
    formData: (arg: IRiderSearchData) => void;
}

const RiderSearchForm: React.FC<IRiderSearchForm> = ({ formData }) => {

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<IRiderSearchData>({
        defaultValues: {
            searchUserName: '',
        }
    });

    const onSubmit = async (data: IRiderSearchData): Promise<void> => formData(data);

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_box}>
                <div className={styles.search_name_box}>
                    <Controller
                        name="searchUserName"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type='string'
                                placeholder='Search rider name'
                                className={styles.search_input}
                            />
                        )}
                    />
                    <Image
                        src={'/icons/bx-search.svg'}
                        alt={'search'}
                        width={24}
                        height={24}
                        className={styles.search_icon}
                    />
                </div>
                <button
                    type='submit'
                    className={styles.submit_button}
                >
                    <Image
                        src={'/icons/magnifyingGlass-green.svg'}
                        alt={'submit'}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </form>
    );
};

export default RiderSearchForm;