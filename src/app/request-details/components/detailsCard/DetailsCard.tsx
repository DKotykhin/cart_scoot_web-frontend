import React, { useState } from 'react';

import Image from "next/image";
import { format } from "date-fns";
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { FINISH_REQUEST, RIDER_ANSWER } from 'apollo/mutations/request';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';
import { IRouteData } from '../RequestDetails';

import { IRequestWithRating } from 'types/requestTypes';

import styles from './detailsCard.module.scss';

interface IDetailsCard {
    data: IRequestWithRating;
    routeData: IRouteData;
    OpenFinishedCardFn: (arg0: string, arg1: string) => void;
}

const starArray = [1, 2, 3, 4, 5];

const DetailsCard: React.FC<IDetailsCard> = ({ data, routeData, OpenFinishedCardFn }) => {

    const { request: { _id, driverId, requestedTime, requestCode, status, pickupLocation, dropoffLocation }, avgRating } = data;

    const [openDetails, setOpenDetails] = useState(false);

    const [finish] = useMutation(FINISH_REQUEST);
    const [cancel] = useMutation(RIDER_ANSWER);

    const handleStatusClick = () => setOpenDetails(false);
    const handleDetailsClick = () => setOpenDetails(true);

    const finishClick = async () => {
        try {
            const { data } = await finish({
                variables: {
                    id: _id,
                },
            });
            if (data.finishRequest._id) OpenFinishedCardFn(driverId._id, requestCode);
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
    const cancelClick = async () => {
        try {
            const { data } = await cancel({
                variables: {
                    riderAnswerInput: {
                        id: _id,
                        answer: false
                    }
                },
            });
            if (data.riderAnswer._id) {
                toast.success('Trip finished successfully', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
            }
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
                <div className={styles.details_wrapper}>
                    <div className={styles.button_box}>
                        <div className={styles.button_details} onClick={handleStatusClick}>
                            <p>Status</p>
                        </div>
                        <div className={styles.button_status}>
                            <p>Trip details</p>
                        </div>
                    </div>
                    <DetailsItem
                        imageURL='/icons/mapPin.svg'
                        title='Pickup Location'
                        value={pickupLocation}
                    />
                    <DetailsItem
                        imageURL='/icons/calendarBlank.svg'
                        title='Dropoff Location'
                        value={dropoffLocation}
                    />
                    <DetailsItem
                        imageURL='/icons/path.svg'
                        title='Distance'
                        value={`${Math.round((routeData.distance / 1000) * 10) / 10} km`}
                    />
                    <DetailsItem
                        imageURL='/icons/hourglass.svg'
                        title='Estimated time'
                        value={`${Math.ceil(routeData.duration / 60)} min`}
                    />
                    <DetailsItem
                        imageURL='/icons/phone.svg'
                        title='Phone'
                        value={<a href={`tel:${driverId.phone?.number}`}>{driverId.phone?.number}</a>}
                    />
                </div>
                :
                <div className={styles.details_wrapper}>
                    <div className={styles.button_box}>
                        <div className={styles.button_status}>
                            <p>Status</p>
                        </div>
                        <div className={styles.button_details} onClick={handleDetailsClick}>
                            <p>Trip details</p>
                        </div>
                    </div>
                    <DetailsItem
                        imageURL='/icons/telegramLogo.svg'
                        title='Request date & time'
                        value={requestedTime ? format(new Date(requestedTime), "d LLL h:mm a") : ""}
                    />
                    <DetailsItem
                        imageURL='/icons/tagChevron.svg'
                        title='Request Code'
                        value={requestCode}
                    />
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
                        <div className={status === 'PENDING' ? styles.status_pending
                            : status === 'REJECTED' ? styles.status_rejected
                                : status === 'ACTIVE' ? styles.status_active
                                    : status === 'APPROVED' ? styles.status_approved
                                        : styles.status_finished
                        }>
                            <p>{status.charAt(0) + status.slice(1).toLowerCase()}</p>
                        </div>
                    </div>
                </div>
            }
            {status === 'ACTIVE' ?
                <button
                    className={styles.trip_finish}
                    onClick={finishClick}
                >
                    Finish trip
                </button>
                :
                status === 'FINISHED' ?
                    <button
                        className={styles.trip_finish}
                        onClick={() => OpenFinishedCardFn(driverId._id, requestCode)}
                    >
                        Add Review
                    </button>
                    :
                    <button
                        className={styles.trip_cancel}
                        onClick={cancelClick}
                    >
                        Cancel trip
                    </button>
            }
        </div>
    ) : null;
};

export default DetailsCard;