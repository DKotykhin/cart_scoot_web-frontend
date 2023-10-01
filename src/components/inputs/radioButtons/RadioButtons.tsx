import React, { useState } from 'react';

import { Controller, Control } from "react-hook-form";

import styles from './radioButtons.module.scss';
import { userTypes } from 'types/userTypes';

interface IRadioButtonsInput {
    control: Control<any>;
}

const RadioButtons: React.FC<IRadioButtonsInput> = ({ control }) => {

    const [active, setActive] = useState(false);

    return (
        <div className={styles.radioBox}>
            <div className={styles.radio} onClick={() => setActive(false)}>
                <label>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue={userTypes.rider}
                        render={({ field }) => (
                            <input 
                                {...field} 
                                type="radio"
                                value={userTypes.rider} 
                                className={active ? '' : styles.active} 
                            />
                        )}
                    />
                    <span className={active ? styles.label : styles.label_active}>Rider</span>
                </label>
            </div>
            <div className={styles.radio} onClick={() => setActive(true)}>
                <label>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <input 
                                {...field} 
                                type="radio" 
                                value={userTypes.driver} 
                                className={active ? styles.active : ''} 
                            />
                        )}
                    />
                    <span className={active ? styles.label_active : styles.label}>Driver</span>
                </label>
            </div>
        </div>
    );
};

export { RadioButtons };