import React from 'react';

import UserInfo from 'components/userInfo/UserInfo';
import { IUser } from 'types/userTypes';

import styles from './driverInfoBox.module.scss';

const DriverInfoBox: React.FC<{ driver?: IUser }> = ({ driver }) => {

    return (
        <div className={styles.driver_infoBox}>
            <UserInfo user={driver} title='Information' />
            <div className={styles.driver_fileBox_wrapper}>
                <div className={styles.driver_fileBox}>
                    {driver?.license.url.length ?
                        <>
                            <p className={styles.driver_fileBox_title_success}>
                                Selfie uploaded
                            </p>
                            <a href={driver?.license.url[0] || ""}
                                target='_blank'
                                download
                                className={styles.driver_fileBox_link}
                            >
                                Open
                            </a>
                        </>
                        :
                        <p className={styles.driver_fileBox_title}>Selfie not uploaded</p>
                    }
                </div>
                <div className={styles.driver_fileBox}>
                    {driver?.license.url.length ?
                        <>
                            <p className={styles.driver_fileBox_title_success}>
                                Insurance uploaded
                            </p>
                            <a href={driver?.license.url[1] || ""}
                                target='_blank'
                                download
                                className={styles.driver_fileBox_link}
                            >
                                Open
                            </a>
                        </>
                        :
                        <p className={styles.driver_fileBox_title}>Insurance not uploaded</p>
                    }
                </div>
                <div className={styles.driver_fileBox}>
                    {driver?.license.url.length ?
                        <>
                            <p className={styles.driver_fileBox_title_success}>
                                Golf Cart uploaded
                            </p>
                            <a href={driver?.license.url[2] || ""}
                                target='_blank'
                                download
                                className={styles.driver_fileBox_link}
                            >
                                Open
                            </a>
                        </>
                        :
                        <p className={styles.driver_fileBox_title}>Golf Cart not uploaded</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default DriverInfoBox;