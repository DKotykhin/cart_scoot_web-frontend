import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { format } from "date-fns";

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import RequestStatusBox from 'components/requestStatusBox/RequestStatusBox';
import { IRequestWithDriverPopulatedFields } from 'types/requestTypes';

import styles from './requestMobileCard.module.scss';

const RequestMobileCard: React.FC<{ request: IRequestWithDriverPopulatedFields }> = ({ request }) => {

    const router = useRouter();
    const handleClick = (_id: string) => router.push(`/requests-list/${_id}`);

    return (
        <div className={styles.requestCard}>
            <div className={styles.avatar_box}>
                <DriverAvatar
                    driverName={request?.driverId?.userName}
                    driverAvatarURL={request?.driverId?.avatarURL}
                    hideName={true}
                />
                <div className={styles.avatar_text}>
                    <p>{request?.driverId?.userName}</p>
                    <p>Request Code: {request?.requestCode}</p>
                </div>
                <RequestStatusBox status={request.status} />
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
            <div className={styles.request_line_desktop} />
            <div className={styles.time_box} >
                <p>Req Date & Time: {format(new Date(request?.requestedTime), "d LLL h:mm a")}</p>
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
            <div className={styles.request_line_mobile} />
            <div className={styles.button_box} >
                <RequestStatusBox status={request.status} />
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

export default RequestMobileCard;