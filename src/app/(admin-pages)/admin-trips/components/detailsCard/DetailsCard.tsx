"use client";

import { FC, useState } from 'react';

import Image from "next/image";
import { format } from 'date-fns';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';
import StarsArray from 'components/starsArray/StarsArray';

import { useMapboxApi } from 'hooks/useMapboxApi';
import { IRequestWithAllUsersPopulatedFields, statusTypes } from 'types/requestTypes';
import { IReview } from 'types/reviewTypes';

import styles from './detailsCard.module.scss';

interface IDetailsCard {
    requestData?: {
        request: IRequestWithAllUsersPopulatedFields;
        avgRating: number;
    },
    reviewData?: IReview
}

const starArray = [1, 2, 3, 4, 5];

const DetailsCard: FC<IDetailsCard> = ({ requestData, reviewData }) => {
    console.log(reviewData?.rating);
    const [buttonIndex, setButtonIndex] = useState(0);

    const routeData = useMapboxApi(
        requestData?.request.coordinates.start.lat,
        requestData?.request.coordinates.start.lon,
        requestData?.request.coordinates.end.lat,
        requestData?.request.coordinates.end.lon);

    return (
        <div className={styles.details_card}>
            <p className={styles.detail_title}>Details</p>
            <div className={styles.driver_box}>
                <DriverAvatar
                    driverAvatarURL={requestData?.request.driverId.avatarURL}
                    driverName={requestData?.request.driverId.userName}
                    bigName={true}
                />
                <StarsArray rating={requestData?.avgRating} />
            </div>
            {buttonIndex === 0 ?
                <div className={styles.details_wrapper}>
                    <div className={styles.button_box}>
                        <div className={styles.button_active}>
                            <p>Status</p>
                        </div>
                        <div className={styles.button_passive} onClick={() => setButtonIndex(1)}>
                            <p>Rider</p>
                        </div>
                        <div className={styles.button_passive} onClick={() => setButtonIndex(2)}>
                            <p>Trip Details</p>
                        </div>
                    </div>
                    <DetailsItem
                        imageURL='/icons/telegramLogo.svg'
                        title='Request date & time'
                        value={requestData?.request.requestedTime ? format(new Date(requestData?.request.requestedTime), "d LLL h:mm a") : ""}
                    />
                    <DetailsItem
                        imageURL='/icons/tagChevron.svg'
                        title='Request Code'
                        value={requestData?.request.requestCode}
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
                        <div className={requestData?.request.status === statusTypes.pending ? styles.status_pending
                            : requestData?.request.status === statusTypes.rejected ? styles.status_rejected
                                : requestData?.request.status === statusTypes.active ? styles.status_active
                                    : requestData?.request.status === statusTypes.approved ? styles.status_approved
                                        : styles.status_finished
                        }>
                            <p>{requestData?.request.status.charAt(0)! + requestData?.request.status.slice(1).toLowerCase()}</p>
                        </div>
                    </div>
                </div>
                : buttonIndex === 1 ?
                    <div className={styles.details_wrapper}>
                        <div className={styles.button_box}>
                            <div className={styles.button_passive} onClick={() => setButtonIndex(0)}>
                                <p>Status</p>
                            </div>
                            <div className={styles.button_active}>
                                <p>Rider</p>
                            </div>
                            <div className={styles.button_passive} onClick={() => setButtonIndex(2)}>
                                <p>Trip Details</p>
                            </div>
                        </div>
                        <DriverAvatar
                            driverAvatarURL={requestData?.request.userId.avatarURL}
                            driverName={requestData?.request.userId.userName}
                            bigName={true}
                        />
                        {requestData?.request.userId.phone.number ?
                            <DetailsItem
                                imageURL='/icons/phone.svg'
                                title='Phone Number'
                                value={requestData?.request.userId.phone.number}
                            />
                            : null
                        }
                        <DetailsItem
                            imageURL='/icons/star-grey-empty.svg'
                            title='User rate to driver'
                            value={starArray.map(star => (
                                <div key={star}>
                                    {reviewData?.rating ?
                                        Math.round(reviewData?.rating) >= star ?
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
                                        :
                                        <Image
                                            src={'/icons/star-grey.svg'}
                                            alt={'star'}
                                            width={20}
                                            height={20}
                                        />
                                    }
                                </div>
                            ))}
                        // value={<StarsArray rating={reviewData?.rating} />}
                        />
                        <div className={styles.comment_box}>
                            <div className={styles.comment_title_box}>
                                <Image
                                    src='/icons/chatCircle.svg'
                                    alt={'pin'}
                                    width={24}
                                    height={24}
                                />
                                <p>User comment</p>
                            </div>
                            <p className={styles.comment_value}>
                                {reviewData?.text}
                            </p>
                        </div>
                    </div>
                    :
                    <div className={styles.details_wrapper}>
                        <div className={styles.button_box}>
                            <div className={styles.button_passive} onClick={() => setButtonIndex(0)}>
                                <p>Status</p>
                            </div>
                            <div className={styles.button_passive} onClick={() => setButtonIndex(1)}>
                                <p>Rider</p>
                            </div>
                            <div className={styles.button_active}>
                                <p>Trip Details</p>
                            </div>
                        </div>
                        <DetailsItem
                            imageURL='/icons/mapPin.svg'
                            title='Pickup Location'
                            value={requestData?.request.pickupLocation}
                        />
                        <DetailsItem
                            imageURL='/icons/calendarBlank.svg'
                            title='Dropoff Location'
                            value={requestData?.request.dropoffLocation}
                        />
                        <DetailsItem
                            imageURL='/icons/path.svg'
                            title='Distance'
                            value={routeData ? `${Math.round((routeData.distance / 1609.344) * 10) / 10} mi` : '0 mi'}
                        />
                        <DetailsItem
                            imageURL='/icons/hourglass.svg'
                            title='Estimated time'
                            value={routeData ? `${Math.ceil(routeData.duration / 60)} min` : '0 min'}
                        />
                        {requestData?.request.driverId?.phone.number ?
                            <DetailsItem
                                imageURL='/icons/phone.svg'
                                title='Phone Number'
                                value={requestData?.request.driverId.phone.number}
                            />
                            : null
                        }
                    </div>
            }
        </div>
    );
};

export default DetailsCard;