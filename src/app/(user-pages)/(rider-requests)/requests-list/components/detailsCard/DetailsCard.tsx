import React, { useState } from 'react';

import Image from "next/image";
import { format } from "date-fns";
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { FINISH_REQUEST, CANCEL_REQUEST, RIDER_MULTI_CALL_ANSWER } from 'apollo/mutations/request';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';
import { IRouteData } from 'hooks/useMapboxApi';

import { IRequestWithRating, statusTypes } from 'types/requestTypes';

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
    const [approveButton, setApproveButton] = useState(false);

    const [finishTrip, { loading: finishLoading }] = useMutation(FINISH_REQUEST, {
        update(cache) {
            cache.modify({
                fields: {
                    getRequest() { }
                }
            });
        },
        onCompleted: (data) => {
            OpenFinishedCardFn(driverId._id, requestCode);
        },
        onError: (err) => toast.warn(err.message, {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        }),
    });
    const [cancelTrip, { loading: cancelLoading }] = useMutation(CANCEL_REQUEST, {
        update(cache) {
            cache.modify({
                fields: {
                    getRequest() { }
                }
            });
        },
        onCompleted: (data) => {
            toast.success('Your trip cancelled', {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        },
        onError: (err) => toast.warn(err.message, {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        }),
    });
    const [riderAnswer, { loading: answerLoading }] = useMutation(RIDER_MULTI_CALL_ANSWER, {
        update(cache) {
            cache.modify({
                fields: {
                    getRequest() { }
                }
            });
        },
        onCompleted: (data) => {
            toast.success(data.riderMultiCallAnswer.status === statusTypes.active ?
                'You approved driver request' : 'You rejected driver request', {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        },
        onError: (err) => toast.warn(err.message, {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        }),
    });

    const handleStatusClick = () => setOpenDetails(false);
    const handleDetailsClick = () => setOpenDetails(true);

    const finishClick = async () => {
        await finishTrip({
            variables: {
                requestId: _id,
            },
        });
    };

    const cancelClick = async () => {
        await cancelTrip({
            variables: {
                requestId: _id,
            },
        });
    };

    const RiderMultiCallAnswer = async (answer: boolean) => {
        setApproveButton(answer);
        await riderAnswer({
            variables: {
                riderMultiCallAnswerInput: {
                    requestId: _id,
                    answer,
                },
            },
        });
    };

    return data ? (
        <div className={styles.container}>
            <p className={styles.detail_title}>Details</p>
            <div className={styles.driver_box}>
                <DriverAvatar
                    driverAvatarURL={driverId?.avatarURL}
                    driverName={driverId?.userName}
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
                    <div className={styles.location_box}>
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
                    </div>
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
                    <DetailsItem
                        imageURL='/icons/phone.svg'
                        title='Phone'
                        value={<a href={`tel:${driverId?.phone?.number}`}>{driverId?.phone?.number}</a>}
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
                        <div className={status === statusTypes.pending ? styles.status_pending
                            : status === statusTypes.rejected ? styles.status_rejected
                                : status === statusTypes.active ? styles.status_active
                                    : status === statusTypes.approved ? styles.status_approved
                                        : styles.status_finished
                        }>
                            <p>{status.charAt(0) + status.slice(1).toLowerCase()}</p>
                        </div>
                    </div>
                </div>
            }
            {status === statusTypes.active ?
                <>
                    <button
                        className='button-green-filled'
                        onClick={finishClick}
                    >
                        {finishLoading ?
                            <Image
                                src={'/spinner.svg'}
                                alt={'spinner'}
                                width={48}
                                height={48}
                            />
                            : 'Finish trip'
                        }
                    </button>
                    <button
                        className='button-grey-outlined'
                        onClick={cancelClick}
                    >
                        {cancelLoading ?
                            <Image
                                src={'/spinner.svg'}
                                alt={'spinner'}
                                width={48}
                                height={48}
                            />
                            : 'Cancel trip'
                        }
                    </button>
                </>
                :
                status === statusTypes.finished ?
                    <button
                        className='button-green-filled'
                        onClick={() => OpenFinishedCardFn(driverId._id, requestCode)}
                    >
                        Add Review
                    </button>
                    :
                    status === statusTypes.approved ?
                        <>
                            <button
                                className='button-green-filled'
                                onClick={() => RiderMultiCallAnswer(true)}
                            >
                                {answerLoading && approveButton ?
                                    <Image
                                        src={'/spinner.svg'}
                                        alt={'spinner'}
                                        width={48}
                                        height={48}
                                    />
                                    : 'Approve driver request'
                                }
                            </button>
                            <button
                                className='button-grey-outlined'
                                onClick={() => RiderMultiCallAnswer(false)}
                            >
                                {answerLoading && !approveButton ?
                                    <Image
                                        src={'/spinner.svg'}
                                        alt={'spinner'}
                                        width={48}
                                        height={48}
                                    />
                                    : 'Cancel driver request'
                                }
                            </button>
                        </>
                        :
                        status === statusTypes.pending ?
                            <button
                                className='button-grey-outlined'
                                onClick={cancelClick}
                            >
                                {cancelLoading ?
                                    <Image
                                        src={'/spinner.svg'}
                                        alt={'spinner'}
                                        width={48}
                                        height={48}
                                    />
                                    : 'Cancel trip'
                                }
                            </button>
                            : null
            }
        </div>
    ) : null;
};

export default DetailsCard;