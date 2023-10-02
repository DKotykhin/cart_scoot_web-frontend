import React, { useState } from 'react';

import Image from "next/image";
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { CANCEL_REQUEST } from 'apollo/mutations/request';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';
import CancelTripCard from '../cancelTripCard/CancelTripCard';
import { useMapboxApi } from 'hooks/useMapboxApi';

import { IRequestWithAllUsersPopulatedFields } from 'types/requestTypes';

import styles from './detailsCard.module.scss';

const DetailsCard: React.FC<{ request: IRequestWithAllUsersPopulatedFields }> = ({ request }) => {

    const [openCancelTripCard, setOpenCancelTripCard] = useState(false);

    const { _id, pickupLocation, dropoffLocation, requestedTime, coordinates: { start, end } } = request;
    const routeData = useMapboxApi(start.lat, start.lon, end.lat, end.lon);

    const [cancelTrip] = useMutation(CANCEL_REQUEST);

    const confirmClick = async () => {
        try {
            const { data } = await cancelTrip({
                variables: {
                    requestId: _id,
                },
            });
            if (data.cancelRequest._id) {
                setOpenCancelTripCard(false);
                toast.success('Your trip cancelled', {
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

    return (
        <>
            <div className={styles.card_container}>
                <p className={styles.card_title}>Trip Details</p>
                <div className={styles.location_wrapper}>
                    <div className={styles.location_box}>
                        <Image
                            src={'/icons/mapPin-green.svg'}
                            alt={'pin'}
                            width={40}
                            height={40}
                            className={styles.location_image}
                        />
                        <div className={styles.text_box}>
                            <p className={styles.location_title}>Pickup Location</p>
                            <p className={styles.location_value}>{pickupLocation}</p>
                        </div>
                    </div>
                    <Image
                        src={'/icons/line-green.svg'}
                        alt={'line'}
                        width={40}
                        height={40}
                    />
                    <div className={styles.location_box}>
                        <Image
                            src={'/icons/flag-green.svg'}
                            alt={'flag'}
                            width={40}
                            height={40}
                            className={styles.location_image}
                        />
                        <div className={styles.text_box}>
                            <p className={styles.location_title}>Dropoff</p>
                            <p className={styles.location_value}>{dropoffLocation}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.user_details_wrapper}>
                    <DriverAvatar
                        driverAvatarURL={request.userId.avatarURL}
                        driverName={request.userId.userName}
                        bigName={true}
                    />
                    <div className='line' />
                    <DetailsItem
                        imageURL='/icons/clock.svg'
                        title='Request date & time'
                        value={requestedTime ? format(new Date(requestedTime), "d LLL h:mm a") : ""}
                    />
                    <div className='line' />
                    <div className={styles.addition_details_box}>
                        <div className={styles.addition_details_inner_box}>
                            <Image
                                src={'/icons/path-black.svg'}
                                alt={'path'}
                                width={16}
                                height={16}
                                className={styles.addition_details_image}
                            />
                            <p>{`${Math.round((routeData?.distance / 1000) * 10) / 10} km`}</p>
                        </div>
                        <div className={styles.addition_details_inner_box}>
                            <Image
                                src={'/icons/hourglass-black.svg'}
                                alt={'hour'}
                                width={16}
                                height={16}
                                className={styles.addition_details_image}
                            />
                            <p>{`${Math.ceil(routeData.duration / 60)} min`}</p>
                        </div>
                    </div>
                </div>
                <button
                    className='button-grey-outlined'
                    onClick={() => setOpenCancelTripCard(true)}
                >
                    Cancel Trip
                </button>
            </div>
            {openCancelTripCard &&
                <CancelTripCard
                    cancelClick={() => setOpenCancelTripCard(false)}
                    confirmClick={confirmClick}
                />
            }
        </>
    );
};

export default DetailsCard;