import React, { useState } from 'react';

import Image from "next/image";
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { CANCEL_REQUEST } from 'apollo/mutations/request';

import LocationCard from '../../../components/locationCard/LocationCard';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';
import ModalCard from 'components/modalCard/ModalCard';

import { useMapboxApi } from 'hooks/useMapboxApi';

import { IRequestWithAllUsersPopulatedFields, statusTypes } from 'types/requestTypes';

import styles from './detailsCard.module.scss';

const DetailsCard: React.FC<{ request: IRequestWithAllUsersPopulatedFields }> = ({ request }) => {

    const [openCancelTripCard, setOpenCancelTripCard] = useState(false);

    const { _id, pickupLocation, dropoffLocation, requestedTime, coordinates: { start, end }, status } = request;
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
                <LocationCard pickupLocation={pickupLocation} dropoffLocation={dropoffLocation} />
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
                            <p>{routeData ? `${Math.ceil(routeData.duration / 60)} min` : '0 min'}</p>
                        </div>
                    </div>
                </div>
                {(status === statusTypes.pending || status === statusTypes.approved) &&
                    <button
                        className='button-grey-outlined'
                        onClick={() => setOpenCancelTripCard(true)}
                    >
                        Cancel Trip
                    </button>
                }
            </div>
            {openCancelTripCard &&
                <ModalCard
                    title='Cancel the trip'
                    subtitle='Are you sure to cancel the trip?'
                    button_1='Back'
                    button_2='Cancel Trip'
                    imageURL='/avatars/warningAvatar.svg'
                    greenButton={false}
                    cancelClick={() => setOpenCancelTripCard(false)}
                    confirmClick={confirmClick}
                />
            }
        </>
    );
};

export default DetailsCard;