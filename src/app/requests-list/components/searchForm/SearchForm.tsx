"use client";

import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';

import Image from 'next/image';
import DatePickerInput from 'components/inputs/dateTimePickers/DatePickerInput';

import styles from './searchForm.module.scss';

export interface ISearchData {
    searchRequestCode: string,
    dateFrom?: Date,
    dateTo?: Date,
    status: string | null,
}

interface ISearchForm {
    formData: (arg: ISearchData) => void;
}

const options = [
    { value: null, label: '-- All --' },
    { value: 'PENDING', label: 'Pending', color: '#ffa74d', backgroundColor: '#fffaf4' },
    { value: 'APPROVED', label: 'Approved', color: '#42da6e', backgroundColor: '#f3fdf6' },
    { value: 'ACTIVE', label: 'Active', color: '#4e7cf6', backgroundColor: '#f4f7fe' },
    { value: 'REJECTED', label: 'Rejected', color: '#f6584e', backgroundColor: '#fef5f4' },
    { value: 'FINISHED', label: 'Finished', color: '#15161a', backgroundColor: '#f7f8fa' },
];

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
            status: null,
        }
    });

    const onSubmit = async (data: ISearchData): Promise<void> => formData(data);

    const stylesOptions = {
        control: (styles: any) => ({
            ...styles,
            borderRadius: '20px',
            height: '48px',
            minWidth: '180px',
            paddingLeft: '40px',
        }),
        option: (styles: any, { data }: any) => {
            return { ...styles, color: data.color, backgroundColor: data.backgroundColor };
        }

    };

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
                <div className={styles.select_box}>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={options}
                                onChange={(value) => field.onChange(value?.value)}
                                placeholder="Status"
                                styles={stylesOptions}
                            />
                        )}
                    />
                    <Image
                        src={'/icons/info.svg'}
                        alt={'info'}
                        width={24}
                        height={24}
                        className={styles.select_icon}
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

export default SearchForm;