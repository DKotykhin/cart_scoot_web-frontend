"use client";

import React from 'react';
import { useForm, Controller } from "react-hook-form";

import Image from 'next/image';

import DatePickerInput from 'components/inputs/dateTimePickers/DatePickerInput';

import styles from './searchForm.module.scss';

export interface ISearchData {
    searchRequestCode?: string,
    dateFrom?: Date,
    dateTo?: Date,
}

interface ISearchForm {
    formData: (arg: ISearchData) => void;
}

const SearchForm: React.FC<ISearchForm> = ({ formData }) => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<ISearchData>({
        defaultValues: {
            searchRequestCode: '',
            dateFrom: undefined,
            dateTo: undefined,
        }
    });

    const onSubmit = async (data: ISearchData): Promise<void> => formData(data);

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_box}>
                <div className={styles.search_code_box}>
                    <Controller
                        name="searchRequestCode"
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