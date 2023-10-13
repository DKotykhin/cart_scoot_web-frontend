import React, { useState } from 'react';

import Image from "next/image";
import { format } from 'date-fns';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REVIEWS_BY_DRIVER_ID } from 'apollo/queries/review';

import { useMapboxApi } from 'hooks/useMapboxApi';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';
import { IMarkerClickData } from '../mapbox/Mapbox';
import ReviewCard from '../reviewCard/ReviewCard';

import { IReviewData } from 'types/reviewTypes';

import styles from './requestDetailedCard.module.scss';

const starArray = [1, 2, 3, 4, 5];

interface IRequestDetailedCard {
    detailedCardData: IMarkerClickData;
    closeDriverDetails: () => void;
    sendAllRequestClick: () => void;
    sendOneRequestClick: () => void;
}

const dayOfWeek = (data: [number]) => {
    return data.map(day => {
        let dayOfWeek = "";
        switch (day) {
            case 0: dayOfWeek = "Sun";
                break;
            case 1: dayOfWeek = "Mon";
                break;
            case 2: dayOfWeek = "Tue";
                break;
            case 3: dayOfWeek = "Wen";
                break;
            case 4: dayOfWeek = "Thu";
                break;
            case 5: dayOfWeek = "Fri";
                break;
            case 6: dayOfWeek = "Sat";
                break;
            default: dayOfWeek = "Sun";
        }
        return dayOfWeek;
    });
};

const RequestDetailedCard: React.FC<IRequestDetailedCard> = ({ detailedCardData, closeDriverDetails, sendAllRequestClick, sendOneRequestClick }) => {

    const { driver: { driver, rating }, findCarFormData } = detailedCardData;

    const [buttonIndex, setButtonIndex] = useState(0);

    const { data }: { data: IReviewData } = useSuspenseQuery(GET_REVIEWS_BY_DRIVER_ID, {
        variables: {
            getReviewsByDriverIdInput: {
                driverId: driver._id
            }
        }
    });
    // console.log(data.getReviewsByDriverId);

    const routeData = useMapboxApi(
        findCarFormData?.locationData?.pickup.lat,
        findCarFormData?.locationData?.pickup.lon,
        findCarFormData?.locationData?.dropoff.lat,
        findCarFormData?.locationData?.dropoff.lon
    );

    return detailedCardData ? (
        <div className={styles.container}>
            <div className={styles.title_box}>
                <p className={styles.detail_title}>Details</p>
                <Image
                    src={'/icons/close.svg'}
                    alt={'close'}
                    width={24}
                    height={24}
                    onClick={closeDriverDetails}
                />
            </div>
            <div className={styles.driver_box}>
                <DriverAvatar
                    driverAvatarURL={driver.avatarURL}
                    driverName={driver.userName}
                    bigName={true}
                />
                <div className={styles.star_box}>
                    {starArray.map(star => (
                        <div key={star}>
                            {Math.round(rating || 0) >= star ?
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
            {buttonIndex === 0 ?
                <div className={styles.details_wrapper}>
                    <div className={styles.button_box}>
                        <div className={styles.button_active}>
                            <p>Driver Info</p>
                        </div>
                        <div className={styles.button_passive} onClick={() => setButtonIndex(1)}>
                            <p>Trip Details</p>
                        </div>
                        <div className={styles.button_passive} onClick={() => setButtonIndex(2)}>
                            <p>Reviews</p>
                        </div>
                    </div>
                    <DetailsItem
                        imageURL='/icons/phone.svg'
                        title='Phone Number'
                        value={driver.phone.number}
                    />
                    <DetailsItem
                        imageURL='/icons/calendarBlank.svg'
                        title='Working days'
                        value={dayOfWeek(driver.workingDays).join(', ')}
                    />
                    <DetailsItem
                        imageURL='/icons/clock.svg'
                        title='Working times'
                        value={`${driver.workingTime.from} - ${driver.workingTime.to}`}
                    />
                </div>
                : buttonIndex === 1 ?
                    <div className={styles.details_wrapper}>
                        <div className={styles.button_box}>
                            <div className={styles.button_passive} onClick={() => setButtonIndex(0)}>
                                <p>Driver Info</p>
                            </div>
                            <div className={styles.button_active}>
                                <p>Trip Details</p>
                            </div>
                            <div className={styles.button_passive} onClick={() => setButtonIndex(2)}>
                                <p>Reviews</p>
                            </div>
                        </div>
                        <DetailsItem
                            imageURL='/icons/mapPin.svg'
                            title='Pickup Location'
                            value={findCarFormData?.locationData?.pickup.address}
                        />
                        <DetailsItem
                            imageURL='/icons/telegramLogo.svg'
                            title='Request date & time'
                            value={findCarFormData?.requestedTime ? format(new Date(findCarFormData?.requestedTime), "d LLL h:mm a") : ""}
                        />
                        <DetailsItem
                            imageURL='/icons/calendarBlank.svg'
                            title='Dropoff Location'
                            value={findCarFormData?.locationData?.dropoff.address}
                        />
                        <DetailsItem
                            imageURL='/icons/path.svg'
                            title='Distance'
                            value={routeData ? `${Math.round((routeData.distance / 1000) * 10) / 10} km` : '0 km'}
                        />
                        <DetailsItem
                            imageURL='/icons/hourglass.svg'
                            title='Estimated time'
                            value={routeData ? `${Math.ceil(routeData.duration / 60)} min` : '0 min'}
                        />
                    </div>
                    :
                    <div className={styles.details_wrapper}>
                        <div className={styles.button_box}>
                            <div className={styles.button_passive} onClick={() => setButtonIndex(0)}>
                                <p>Driver Info</p>
                            </div>
                            <div className={styles.button_passive} onClick={() => setButtonIndex(1)}>
                                <p>Trip Details</p>
                            </div>
                            <div className={styles.button_active}>
                                <p>Reviews</p>
                            </div>
                        </div>
                        <div className={findCarFormData ? styles.review_box : styles.review_box_long}>
                            {data.getReviewsByDriverId?.totalCount > 0 ?
                                data.getReviewsByDriverId?.reviews?.map(review => (
                                    <div key={review._id}>
                                        <ReviewCard reviewData={review} />
                                    </div>
                                )) :
                                <div className={styles.empty_review}>
                                    <Image
                                        src={'/emptyList.svg'}
                                        alt={'empty'}
                                        width={98}
                                        height={96}
                                    />
                                    <p>This driver doesn&apos;t have any reviews yet</p>
                                </div>
                            }
                        </div>
                    </div>
            }
            {findCarFormData?.locationData && findCarFormData?.requestedTime &&
                <button
                    className='button-green-filled'
                    onClick={sendOneRequestClick}
                >
                    Send Request
                </button>
            }
            {findCarFormData?.locationData && findCarFormData?.requestedTime &&
                <button
                    className='button-green-outlined'
                    onClick={sendAllRequestClick}
                >
                    Send Request to all
                </button>
            }
        </div>
    ) : null;
};

export default RequestDetailedCard;