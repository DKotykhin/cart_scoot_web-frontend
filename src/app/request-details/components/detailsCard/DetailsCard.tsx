import React, { useState } from 'react';

import Image from "next/image";
import { format } from "date-fns";

import DriverAvatar from 'components/driverAvatar/DriverAvatar';

import { IRequestWithRating } from 'types/requestTypes';

import styles from './detailsCard.module.scss';

const starArray = [1, 2, 3, 4, 5];

const DetailsCard: React.FC<{ data: IRequestWithRating }> = ({ data }) => {

    const { request: { driverId, requestedTime, requestCode, status, pickupLocation, dropoffLocation }, avgRating } = data;

    const [openDetails, setOpenDetails] = useState(false);

    const handleStatusClick = () => setOpenDetails(false);
    const handleDetailsClick = () => setOpenDetails(true);

    return data ? (
        <div className={styles.container}>
            <p className={styles.detail_title}>Details</p>
            <div className={styles.driver_box}>
                <DriverAvatar
                    driverAvatarURL={driverId.avatarURL}
                    driverName={driverId.userName}
                    bigName={true}
                />
                <div className={styles.star_box}>
                    {starArray.map(star => (
                        <div key={star}>
                            {Math.round(avgRating) >= star ?
                                <Image
                                    src={'/icons/star-green.svg'}
                                    alt={'star'}
                                    width={20}
                                    height={20}
                                /> :
                                <Image
                                    src={'/icons/star-empty.svg'}
                                    alt={'star'}
                                    width={20}
                                    height={20}
                                />
                            }
                        </div>
                    ))}
                </div>
            </div>
            {openDetails ?
                <>
                    <div className={styles.button_box}>
                        <div className={styles.button_details} onClick={handleStatusClick}>
                            <p>Status</p>
                        </div>
                        <div className={styles.button_status}>
                            <p>Trip details</p>
                        </div>
                    </div>
                    <div className={styles.tip_box}>
                        <div className={styles.tip_title_box}>
                            <Image
                                src={'/icons/mapPin.svg'}
                                alt={'pin'}
                                width={24}
                                height={24}
                            />
                            <p>Pickup Location</p>
                        </div>
                        <p className={styles.tip_value}>
                            {pickupLocation}
                        </p>
                    </div>
                    <div className={styles.tip_box}>
                        <div className={styles.tip_title_box}>
                            <Image
                                src={'/icons/calendarBlank.svg'}
                                alt={'calendar'}
                                width={24}
                                height={24}
                            />
                            <p>Dropoff Location</p>
                        </div>
                        <p className={styles.tip_value}>
                            {dropoffLocation}
                        </p>
                    </div>
                </>
                :
                <>
                    <div className={styles.button_box}>
                        <div className={styles.button_status}>
                            <p>Status</p>
                        </div>
                        <div className={styles.button_details} onClick={handleDetailsClick}>
                            <p>Trip details</p>
                        </div>
                    </div>
                    <div className={styles.tip_box}>
                        <div className={styles.tip_title_box}>
                            <Image
                                src={'/icons/telegramLogo.svg'}
                                alt={'telegram'}
                                width={24}
                                height={24}
                            />
                            <p>Request date & time</p>
                        </div>
                        <p className={styles.tip_value}>
                            {format(new Date(requestedTime), "d LLL H:mm")}
                        </p>
                    </div>
                    <div className={styles.tip_box}>
                        <div className={styles.tip_title_box}>
                            <Image
                                src={'/icons/tagChevron.svg'}
                                alt={'tag'}
                                width={24}
                                height={24}
                            />
                            <p>Request Code</p>
                        </div>
                        <p className={styles.tip_value}>
                            {requestCode}
                        </p>
                    </div>
                    <div className={styles.tip_box}>
                        <div className={styles.tip_title_box}>
                            <Image
                                src={'/icons/info.svg'}
                                alt={'info'}
                                width={24}
                                height={24}
                            />
                            <p>Status</p>
                        </div>
                        <p className={status === 'PENDING' ? styles.status_pending
                            : status === 'REJECTED' ? styles.status_rejected
                                : status === 'ACTIVE' ? styles.status_active
                                    : status === 'APPROVED' ? styles.status_approved
                                        : styles.status_finished
                        }>
                            <p>{status.charAt(0) + status.slice(1).toLowerCase()}</p>
                        </p>
                    </div>
                </>
            }
        </div>
    ) : null;
};

export default DetailsCard;