import React, { useState } from 'react';

import Image from "next/image";
import { format } from 'date-fns';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REVIEWS_BY_DRIVER_ID } from 'apollo/queries/review';

import DetailsItem from 'components/detailsItem/DetailsItem';
import DriverAvatarWithStars from 'components/driverAvatarWithStars/DriverAvatarWithStars';
import { IMarkerClickData } from '../mapbox/Mapbox';
import ReviewCard from '../reviewCard/ReviewCard';

import { useGoogleDirections } from 'hooks/useGoogleDirections';
import { formatTime } from 'utils/formatTime';
import { IReviewData } from 'types/reviewTypes';

import styles from './requestDetailedCard.module.scss';

interface IRequestDetailedCard {
    detailedCardData: IMarkerClickData;
    closeDriverDetails: () => void;
    sendAllRequestClick: () => void;
    sendOneRequestClick: () => void;
    driversAmount: number,
}

const dayOfWeek = (data: number[]) => {
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

const RequestDetailedCard: React.FC<IRequestDetailedCard> = ({ driversAmount, detailedCardData, closeDriverDetails, sendAllRequestClick, sendOneRequestClick }) => {

    const { driver: { driver, rating }, findCarFormData } = detailedCardData;

    const [buttonIndex, setButtonIndex] = useState(0);

    const { data }: { data: IReviewData } = useSuspenseQuery(GET_REVIEWS_BY_DRIVER_ID, {
        variables: {
            getReviewsByDriverIdInput: {
                driverId: driver._id
            }
        }
    });
    // console.log('findCarFormData: ', findCarFormData);

    const { direction } = useGoogleDirections(findCarFormData?.locationData?.pickup.address!, findCarFormData?.locationData?.dropoff.address!);

    return detailedCardData ? (
        <article className={styles.container}>
            <div className={styles.card_wrapper}>
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
                    <DriverAvatarWithStars
                        driverAvatarURL={driver.avatarURL}
                        driverName={driver.userName}
                        bigName={true}
                        rating={rating}
                    />
                </div>
                <div className={styles.line} />
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
                            value={<a href={`tel:${driver?.phone?.number}`}>{driver?.phone?.number}</a>}
                        />
                        <DetailsItem
                            imageURL='/icons/calendarBlank.svg'
                            title='Working days'
                            value={dayOfWeek(driver.workingDays).join(', ')}
                        />
                        <DetailsItem
                            imageURL='/icons/clock.svg'
                            title='Working times'
                            value={`${formatTime(driver.workingTime.from)} - ${formatTime(driver.workingTime.to)}`}
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
                            <div className={styles.location_box}>
                                <DetailsItem
                                    imageURL='/icons/mapPin.svg'
                                    title='Pickup Location'
                                    value={findCarFormData?.locationData?.pickup.address}
                                />
                                <DetailsItem
                                    imageURL='/icons/calendarBlank.svg'
                                    title='Dropoff Location'
                                    value={findCarFormData?.locationData?.dropoff.address}
                                />
                            </div>
                            <DetailsItem
                                imageURL='/icons/telegramLogo.svg'
                                title='Request date & time'
                                value={findCarFormData?.requestedTime ? format(new Date(findCarFormData?.requestedTime), "d LLL h:mm a") : ""}
                            />
                            <DetailsItem
                                imageURL='/icons/path.svg'
                                title='Distance'
                                value={direction ? `${Math.round((direction.distance.value / 1609.344) * 10) / 10} mi` : '0 mi'}
                            />
                            <DetailsItem
                                imageURL='/icons/hourglass.svg'
                                title='Estimated time'
                                value={direction ? `${Math.ceil(direction.duration.value / 60 / 4.05)} min` : '0 min'}
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
                {findCarFormData?.locationData && findCarFormData?.requestedTime ?
                    driversAmount > 1 ?
                        <>
                            <button
                                className='button-green-filled'
                                onClick={sendOneRequestClick}
                            >
                                Send Request
                            </button>
                            <button
                                className='button-green-outlined'
                                onClick={sendAllRequestClick}
                            >
                                Send Request to all
                            </button>
                        </>
                        :

                        <button
                            className='button-green-filled'
                            onClick={sendOneRequestClick}
                        >
                            Send Request
                        </button>

                    : null
                }
            </div>
        </article>
    ) : null;
};

export default RequestDetailedCard;