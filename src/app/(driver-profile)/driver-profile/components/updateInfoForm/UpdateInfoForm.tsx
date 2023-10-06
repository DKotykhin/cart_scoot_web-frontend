"use client";

import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Image from "next/image";

import { useMutation } from '@apollo/client';
import { UPDATE_WORKING_TIME } from 'apollo/mutations/user';
import { useUserStore } from 'stores/userStore';

import TimePickerInput from 'components/inputs/dateTimePickers/TimePickerInput';
import { IUser } from 'types/userTypes';

import styles from './updateInfoForm.module.scss';

interface IFormData {
    monday: any;
    tuesday: any;
    wednesday: any;
    thursday: any;
    friday: any;
    saturday: any;
    sunday: any;
    startTime: Date;
    endTime: Date;
}

const UpdateInfoForm: React.FC<{ user?: IUser }> = ({ user }) => {

    const [updateWorkingTime] = useMutation(UPDATE_WORKING_TIME);
    const { addUser } = useUserStore();

    const {
        control,
        handleSubmit,
    } = useForm<IFormData>({
        defaultValues: {
            monday: user?.workingDays.includes(1),
            tuesday: user?.workingDays.includes(2),
            wednesday: user?.workingDays.includes(3),
            thursday: user?.workingDays.includes(4),
            friday: user?.workingDays.includes(5),
            saturday: user?.workingDays.includes(6),
            sunday: user?.workingDays.includes(0),
            startTime: user?.workingTime?.from ? new Date(new Date().setHours(user.workingTime.from, +user.workingTime.from.toString().split('.')[1] || 0)) : undefined,
            endTime: user?.workingTime?.to ? new Date(new Date().setHours(user.workingTime.to, +user.workingTime.to.toString().split('.')[1] || 0)) : undefined,
        },
    });

    const onSubmit = async (data: IFormData): Promise<void> => {
        // console.log(data);
        let workingDays = [];
        const { startTime, endTime, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = data;
        if (monday) workingDays.push(1);
        if (tuesday) workingDays.push(2);
        if (wednesday) workingDays.push(3);
        if (thursday) workingDays.push(4);
        if (friday) workingDays.push(5);
        if (saturday) workingDays.push(6);
        if (sunday) workingDays.push(0);
        try {
            const { data } = await updateWorkingTime({
                variables: {
                    updateWorkingTimeInput: {
                        workingDays,
                        workingTime: {
                            from: +`${startTime.getHours()}.${startTime.getMinutes()}`,
                            to: +`${endTime.getHours()}.${endTime.getMinutes()}`,
                        }
                    }
                },
            });
            toast.success('Working time updated successfully', {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
            addUser(data.updateWorkingTime);
        } catch (err: any) {
            toast.warn(err.message, {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        }
    };

    return (
        <form className={styles.info_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.line} />
            <p className={styles.form_title}>Working Days</p>
            <div className={styles.checkbox_wrapper}>
                <div className={styles.checkbox}>
                    <Controller
                        name="monday"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type='checkbox' id='checkbox' defaultChecked={user?.workingDays.includes(1)} />
                        )}
                    />
                    <label htmlFor='checkbox'>
                        Monday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Controller
                        name="tuesday"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type='checkbox' id='checkbox' defaultChecked={user?.workingDays.includes(2)} />
                        )}
                    />
                    <label htmlFor='checkbox'>
                        Tuesday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Controller
                        name="wednesday"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type='checkbox' id='checkbox' defaultChecked={user?.workingDays.includes(3)} />
                        )}
                    />
                    <label htmlFor='checkbox'>
                        Wednesday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Controller
                        name="thursday"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type='checkbox' id='checkbox' defaultChecked={user?.workingDays.includes(4)} />
                        )}
                    />
                    <label htmlFor='checkbox'>
                        Thursday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Controller
                        name="friday"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type='checkbox' id='checkbox' defaultChecked={user?.workingDays.includes(5)} />
                        )}
                    />
                    <label htmlFor='checkbox'>
                        Friday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Controller
                        name="saturday"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type='checkbox' id='checkbox' defaultChecked={user?.workingDays.includes(6)} />
                        )}
                    />
                    <label htmlFor='checkbox'>
                        Saturday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Controller
                        name="sunday"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type='checkbox' id='checkbox' defaultChecked={user?.workingDays.includes(0)} />
                        )}
                    />
                    <label htmlFor='checkbox'>
                        Sunday
                    </label>
                </div>
            </div>
            <div className={styles.line} />
            <div className={styles.hours_box}>
                <p className={styles.form_hour_title}>Working Hours</p>
                <TimePickerInput control={control} name='startTime' placeholder='Start time' />
                <TimePickerInput control={control} name='endTime' placeholder='End Time' />
            </div>
            <div className={styles.line} />
            <div className={styles.button_box}>
                {/* <button type='button' className='button-grey-outlined'>Discard</button> */}
                <button type='submit' className='button-green-filled'>Save Changes</button>
            </div>
        </form>
    );
};

export default UpdateInfoForm;