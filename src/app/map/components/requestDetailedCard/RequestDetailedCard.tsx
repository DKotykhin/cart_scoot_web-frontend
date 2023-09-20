import React, { useState, useEffect } from 'react';

import Image from "next/image";
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import axios from 'axios';

import { useMutation } from '@apollo/client';
import { ONE_DRIVER_REQUEST, ALL_DRIVERS_REQUEST } from 'apollo/mutations/request';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REVIEW_BY_ID } from 'apollo/queries/review';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';
import { IMarkerClickData } from '../mapbox/Mapbox';

import styles from './requestDetailedCard.module.scss';
import { IReview } from 'types/reviewTypes';

const starArray = [1, 2, 3, 4, 5];

interface IRequestDetailedCard {
    markerData: IMarkerClickData;
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

const RequestDetailedCard: React.FC<IRequestDetailedCard> = ({ markerData }) => {

    const { driver: { driver, rating }, savedFormData } = markerData;

    const [buttonIndex, setButtonIndex] = useState(0);
    const [routeData, setRouteData] = useState({
        distance: 0,
        duration: 0,
    });

    const { data }: { data: { getReviewsById: [IReview] } } = useSuspenseQuery(GET_REVIEW_BY_ID, {
        variables: {
            driverId: driver._id
        }
    });
    // console.log(data.getReviewsById);

    const [oneDriverRequest] = useMutation(ONE_DRIVER_REQUEST);
    const [allDriversRequest] = useMutation(ALL_DRIVERS_REQUEST);

    const requestHours = new Date(savedFormData?.timeData.time || "").getHours();
    const requestMinutes = new Date(savedFormData?.timeData.time || "").getMinutes();
    const requestedTime = new Date(new Date(savedFormData?.timeData.date || "").setHours(requestHours, requestMinutes)).toLocaleString();

    useEffect(() => {
        const startPoint = `${savedFormData?.locationData?.pickup.lat},${savedFormData?.locationData?.pickup.lon}`;
        const endPoint = `${savedFormData?.locationData?.dropoff.lat},${savedFormData?.locationData?.dropoff.lon}`;
        const mapboxApiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint};${endPoint}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

        const config = {
            method: "GET",
            url: mapboxApiUrl,
        };
        axios(config)
            .then(response => {
                // console.log(response.data?.routes[0]);
                setRouteData(response.data?.routes[0]);
            })
            .catch(err => console.log(err.message));

    }, [savedFormData?.locationData?.dropoff.lat, savedFormData?.locationData?.dropoff.lon, savedFormData?.locationData?.pickup.lat, savedFormData?.locationData?.pickup.lon]);

    const requestClick = async () => {
        try {
            const { data } = await oneDriverRequest({
                variables: {
                    createOneDriverRequestInput: {
                        id: driver._id,
                        requestedTime,
                        coordinates: {
                            start: {
                                lat: savedFormData?.locationData?.pickup.lat,
                                lon: savedFormData?.locationData?.pickup.lon,
                            },
                            end: {
                                lat: savedFormData?.locationData?.dropoff.lat,
                                lon: savedFormData?.locationData?.dropoff.lon,
                            },
                        },
                        pickupLocation: savedFormData?.locationData?.pickup.address,
                        dropoffLocation: savedFormData?.locationData?.dropoff.address,
                    }
                },
            });
            if (data.createOneDriverRequest.request._id) {
                toast.success('Request sent successfully', {
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
    const allRequestClick = async () => {
        try {
            const { data } = await allDriversRequest({
                variables: {
                    createDriversRequestInput: {
                        requestedTime,
                        coordinates: {
                            start: {
                                lat: savedFormData?.locationData?.pickup.lat,
                                lon: savedFormData?.locationData?.pickup.lon,
                            },
                            end: {
                                lat: savedFormData?.locationData?.dropoff.lat,
                                lon: savedFormData?.locationData?.dropoff.lon,
                            },
                        },
                        pickupLocation: savedFormData?.locationData?.pickup.address,
                        dropoffLocation: savedFormData?.locationData?.dropoff.address,
                    }
                },
            });
            if (data.createDriversRequest.request._id) {
                toast.success('Requests sent successfully to all drivers', {
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
                    driverAvatarURL={driver.avatarURL}
                    driverName={driver.userName}
                    bigName={true}
                />
                <div className={styles.star_box}>
                    {starArray.map(star => (
                        <div key={star}>
                            {Math.round(rating) >= star ?
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
                            value={savedFormData?.locationData?.pickup.address}
                        />
                        <DetailsItem
                            imageURL='/icons/telegramLogo.svg'
                            title='Request date & time'
                            value={format(new Date(requestedTime), "d LLL H:mm")}
                        />
                        <DetailsItem
                            imageURL='/icons/calendarBlank.svg'
                            title='Dropoff Location'
                            value={savedFormData?.locationData?.dropoff.address}
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
                    </div>
            }
            <button
                className={styles.request_button}
                onClick={requestClick}
            >
                Send Request
            </button>
            <button
                className={styles.all_request_button}
                onClick={allRequestClick}
            >
                Send Request to all
            </button>
        </div>
    ) : null;
};

export default RequestDetailedCard;