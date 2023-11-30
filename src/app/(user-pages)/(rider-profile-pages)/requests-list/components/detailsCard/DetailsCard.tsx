import React, { useState } from 'react';

import Image from "next/image";
import { format } from "date-fns";
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { FINISH_REQUEST, CANCEL_REQUEST, RIDER_MULTI_CALL_ANSWER } from 'apollo/mutations/request';

import DriverAvatarWithStars from 'components/driverAvatarWithStars/DriverAvatarWithStars';
import DetailsItem from 'components/detailsItem/DetailsItem';
import ModalCard from 'components/modalCard/ModalCard';
import RequestStatusBox from 'components/requestStatusBox/RequestStatusBox';

import { IRouteData } from 'hooks/useMapboxApi';
import { IRequestWithRating, statusTypes } from 'types/requestTypes';

import styles from './detailsCard.module.scss';

interface IDetailsCard {
    data: IRequestWithRating;
    routeData: IRouteData;
    OpenFinishedCardFn: (arg0: string, arg1: string) => void;
    closeMobileDetailedCard?: () => void;
}

const DetailsCard: React.FC<IDetailsCard> = ({ data, routeData, OpenFinishedCardFn, closeMobileDetailedCard }) => {

    const { request: { _id, driverId, requestedTime, requestCode, status, pickupLocation, dropoffLocation, isReviewed }, avgRating } = data;

    const [openDetails, setOpenDetails] = useState(false);
    const [approveButton, setApproveButton] = useState(false);
    const [openCancelTripCard, setOpenCancelTripCard] = useState(false);

    const [finishTrip, { loading: finishLoading }] = useMutation(FINISH_REQUEST, {
        update(cache) {
            cache.modify({
                fields: {
                    getRequest() { },
                    getRequestsByRider() { }
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
                    getRequest() { },
                    getRequestsByRider() { }
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
            setOpenCancelTripCard(false);
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
                    getRequest() { },
                    getRequestsByRider() { }
                }
            });
        },
        onCompleted: (data) => {
            toast.success(data.riderMultiCallAnswer.status === statusTypes.active ?
                'You approved driver request' : 'You cancelled driver request', {
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
        <article className={styles.container}>
            <div className={styles.card_wrapper}>
                <div className={styles.detail_title_box}>
                    <p className={styles.detail_title}>
                        Details
                    </p>
                    <Image
                        src={'/icons/close.svg'}
                        alt={'close'}
                        width={24}
                        height={24}
                        onClick={closeMobileDetailedCard}
                    />
                </div>
                <div className={styles.driver_box}>
                    <DriverAvatarWithStars
                        driverAvatarURL={driverId?.avatarURL}
                        driverName={driverId?.userName}
                        bigName={true}
                        rating={avgRating}
                    />
                </div>
                <div className={styles.line} />
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
                            value={routeData ? `${Math.round((routeData.distance / 1609.344) * 10) / 10} mi` : '0 mi'}
                        />
                        <DetailsItem
                            imageURL='/icons/hourglass.svg'
                            title='Estimated time'
                            value={routeData ? `${Math.ceil(routeData.duration / 60 / 4.05)} min` : '0 min'}
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
                            <RequestStatusBox status={status} />
                        </div>
                    </div>
                }
                {status === statusTypes.active ?
                    <div className={styles.button_wrapper}>
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
                            onClick={() => setOpenCancelTripCard(true)}
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
                    </div>
                    :
                    status === statusTypes.finished && !isReviewed ?
                        <button
                            className='button-green-filled'
                            onClick={() => OpenFinishedCardFn(driverId._id, requestCode)}
                        >
                            Add Review
                        </button>
                        :
                        status === statusTypes.approved ?
                            <div className={styles.button_wrapper}>
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
                            </div>
                            :
                            status === statusTypes.pending ?
                                <button
                                    className='button-grey-outlined'
                                    onClick={() => setOpenCancelTripCard(true)}
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
            {openCancelTripCard &&
                <ModalCard
                    title='Cancel the trip'
                    subtitle='Are you sure to cancel the trip?'
                    button_1='Back'
                    button_2='Cancel Trip'
                    imageURL='/avatars/warningAvatar.svg'
                    greenButton={false}
                    cancelClick={() => setOpenCancelTripCard(false)}
                    confirmClick={cancelClick}
                />
            }
        </article>
    ) : null;
};

export default DetailsCard;