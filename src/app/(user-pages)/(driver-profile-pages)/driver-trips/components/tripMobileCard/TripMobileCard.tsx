"use client";

import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import { IRequestWithRiderPopulatedFields, statusTypes } from 'types/requestTypes';

import styles from './tripMobileCard.module.scss';

const TripMobileCard: React.FC<{ request: IRequestWithRiderPopulatedFields }> = ({ request }) => {

    const router = useRouter();
    const handleClick = (_id: string) => router.push(`/driver-trips/${_id}`);

    return (
        <div className={styles.trip_mobile_card}>
            <div className={styles.request_wrapper}>
                <div className={styles.request_box}>
                    <p>Request Code: {request?.requestCode}</p>
                    <p>Req Date & Time: {format(new Date(request?.requestedTime), "d LLL h:mm a")}</p>
                </div>
                <div className={styles.button_box}>
                    <div className={request.status === statusTypes.pending ? styles.status_pending
                        : request.status === statusTypes.rejected ? styles.status_rejected
                            : request.status === statusTypes.active ? styles.status_active
                                : request.status === statusTypes.approved ? styles.status_approved
                                    : styles.status_finished
                    }>
                        <span>
                            {request.status.charAt(0) + request.status.slice(1).toLowerCase()}
                        </span>
                    </div>
                    <button onClick={() => handleClick(request._id)}>
                        <span>Details</span>
                        <Image
                            src={'/icons/caretRight-green.svg'}
                            alt={'card'}
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>
            <div className={styles.request_line} />
            <div className={styles.location_box}>
                <div className={styles.location_wrapper}>
                    <Image
                        src={'/icons/mapPin-blue.svg'}
                        alt={'pin'}
                        width={24}
                        height={24}
                        className={styles.location_image}
                    />
                    <p>{request?.pickupLocation}</p>
                </div>
                <Image
                    src={'/icons/dottedLine-blue.svg'}
                    alt={'line'}
                    width={2}
                    height={16}
                    className={styles.location_separate_image}
                />
                <div className={styles.location_wrapper}>
                    <Image
                        src={'/icons/flag-blue.svg'}
                        alt={'flag'}
                        width={24}
                        height={24}
                        className={styles.location_image}
                    />
                    <p>{request?.dropoffLocation}</p>
                </div>
            </div>
            <div className={styles.mobile_request_line} />
            <div className={styles.mobile_button_box}>
                <div className={request.status === statusTypes.pending ? styles.status_pending
                    : request.status === statusTypes.rejected ? styles.status_rejected
                        : request.status === statusTypes.active ? styles.status_active
                            : request.status === statusTypes.approved ? styles.status_approved
                                : styles.status_finished
                }>
                    <span>
                        {request.status.charAt(0) + request.status.slice(1).toLowerCase()}
                    </span>
                </div>
                <button onClick={() => handleClick(request._id)}>
                    <span>Details</span>
                    <Image
                        src={'/icons/caretRight-green.svg'}
                        alt={'card'}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
};

export default TripMobileCard;