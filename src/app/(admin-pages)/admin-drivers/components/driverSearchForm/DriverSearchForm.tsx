"use client";

import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';

import Image from 'next/image';

import { licenseStatusTypes } from 'types/userTypes';

import styles from './driverSearchForm.module.scss';

export interface IDriverSearchData {
    searchUserName?: string,
    status?: licenseStatusTypes | null,
}

interface IDriverSearchForm {
    formData: (arg: IDriverSearchData) => void;
}

const options = [
    { value: null, label: '-- All --' },
    { value: 'PENDING', label: 'Pending', color: '#15161a', backgroundColor: '#f7f8fa' },
    { value: 'WAITING', label: 'Waiting', color: '#ffa74d', backgroundColor: '#fffaf4' },
    { value: 'APPROVED', label: 'Approved', color: '#42da6e', backgroundColor: '#f3fdf6' },
    { value: 'REJECTED', label: 'Rejected', color: '#f6584e', backgroundColor: '#fef5f4' },
];

const stylesOptions = {
    control: (styles: any) => ({
        ...styles,
        borderRadius: '20px',
        height: '48px',
        minWidth: '180px',
        paddingLeft: '40px',
        cursor: 'pointer',
    }),
    option: (styles: any, { data }: any) => {
        return { ...styles, color: data.color, backgroundColor: data.backgroundColor };
    }

};

const DriverSearchForm: React.FC<IDriverSearchForm> = ({ formData }) => {

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<IDriverSearchData>({
        defaultValues: {
            searchUserName: '',
            status: null,
        }
    });

    const onSubmit = async (data: IDriverSearchData): Promise<void> => formData(data);

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
                                placeholder='Search driver name'
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

export default DriverSearchForm;