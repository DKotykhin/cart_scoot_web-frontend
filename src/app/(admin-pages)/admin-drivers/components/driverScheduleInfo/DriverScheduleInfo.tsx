import React from 'react';

import { IUser } from 'types/userTypes';

import styles from './driverScheduleInfo.module.scss';

const validTime = (time: number) => {
    if (!time) return null;
    if (Number.isInteger(time)) return time + '.00';
    else return time;
};

const DriverScheduleInfo: React.FC<{ driver: IUser }> = ({ driver }) => {

    return (
        <div className={styles.schedule_info}>
            <div className={styles.line} />
            <p className={styles.schedule_info_title}>Working Days</p>
            <div className={styles.checkbox_wrapper}>
                <div className={styles.checkbox}>
                    <input type='checkbox' id='checkbox' disabled defaultChecked={driver?.workingDays.includes(1)} />
                    <label htmlFor='checkbox'>
                        Monday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <input type='checkbox' id='checkbox' disabled defaultChecked={driver?.workingDays.includes(2)} />
                    <label htmlFor='checkbox'>
                        Tuesday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <input type='checkbox' id='checkbox' disabled defaultChecked={driver?.workingDays.includes(3)} />
                    <label htmlFor='checkbox'>
                        Wednesday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <input type='checkbox' id='checkbox' disabled defaultChecked={driver?.workingDays.includes(4)} />
                    <label htmlFor='checkbox'>
                        Thursday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <input type='checkbox' id='checkbox' disabled defaultChecked={driver?.workingDays.includes(5)} />
                    <label htmlFor='checkbox'>
                        Friday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <input type='checkbox' id='checkbox' disabled defaultChecked={driver?.workingDays.includes(6)} />
                    <label htmlFor='checkbox'>
                        Saturday
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <input type='checkbox' id='checkbox' disabled defaultChecked={driver?.workingDays.includes(0)} />
                    <label htmlFor='checkbox'>
                        Sunday
                    </label>
                </div>
            </div>
            <div className={styles.line} />
            <div className={styles.hours_box}>
                <p className={styles.hours_title}>Working Hours</p>
                <div className={styles.info_box}>
                    <div className={styles.info_box_item}>
                        <p className={styles.item_text}>{validTime(driver.workingTime.from)}</p>
                        <p className={styles.item_title}>Start time</p>
                    </div>
                    <div className={styles.info_box_item}>
                        <p className={styles.item_text}>{validTime(driver.workingTime.to)}</p>
                        <p className={styles.item_title}>End time</p>
                    </div>
                </div>
            </div>
            <div className={styles.last_line} />
        </div>
    );
};

export default DriverScheduleInfo;

