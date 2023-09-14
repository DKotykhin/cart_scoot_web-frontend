"use client";

import React from 'react';

import Image from 'next/image';

import DatePicker from 'react-datepicker';
import { useForm, Controller } from "react-hook-form";

import styles from './searchForm.module.scss';
import DatePickerInput from './datePicker/DatePickerInput';

interface ISearchData {
    code: string,
    dateFrom: Date,
    dateTo: Date,
    status: string,
}

const SearchForm = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<ISearchData>({
        defaultValues: {
            code: '',
            dateFrom: undefined,
            dateTo: undefined,
            status: '',
        }
    });

    const onSubmit = (data: ISearchData): void => {
        console.log(data);
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_box}>
                <div className={styles.search_code_box}>
                    <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type='string'
                                placeholder='Search Request Code'
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
                <DatePickerInput
                    control={control}
                    placeholder='From'
                    name='dateFrom'
                />
                <DatePickerInput
                    control={control}
                    placeholder='To'
                    name='dateTo'
                />
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

export default SearchForm;