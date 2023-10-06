import React from 'react';

import Image from "next/image";
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { DRIVER_ONE_CALL_ANSWER, DRIVER_MULTI_CALL_ANSWER } from 'apollo/mutations/request';

import LocationCard from '../../../components/locationCard/LocationCard';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';
import { useMapboxApi } from 'hooks/useMapboxApi';

import { IRequestWithRiderPopulatedFields } from 'types/requestTypes';

import styles from './requestDetailsCard.module.scss';

interface IRequestDetailsCard {
    requestDetailsData?: IRequestWithRiderPopulatedFields;
    closeDetailsCard: () => void;
}

const RequestDetailsCard: React.FC<IRequestDetailsCard> = ({ requestDetailsData, closeDetailsCard }) => {

    const routeData = useMapboxApi(
        requestDetailsData?.coordinates.start.lat,
        requestDetailsData?.coordinates.start.lon,
        requestDetailsData?.coordinates.end.lat,
        requestDetailsData?.coordinates.end.lon
    );

    const [oneCallAnswer] = useMutation(DRIVER_ONE_CALL_ANSWER);
    const [multiCallAnswer] = useMutation(DRIVER_MULTI_CALL_ANSWER);

    const cancelClick = async () => {
        try {
            const { data } = await oneCallAnswer({
                variables: {
                    driverMultiCallAnswerInput: {
                        requestId: requestDetailsData?._id,
                        answer: false,
                    }
                },
            });
            if (data.driverOneCallAnswer._id) {
                toast.success('Your canceled the trip', {
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

    const confirmClick = async () => {
        if (requestDetailsData?.driverId) {
            try {
                const { data } = await oneCallAnswer({
                    variables: {
                        driverMultiCallAnswerInput: {
                            requestId: requestDetailsData?._id,
                            answer: true,
                        }
                    },
                });
                if (data.driverOneCallAnswer._id) {
                    toast.success('Your accepted the trip', {
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
        } else {
            try {
                const { data } = await multiCallAnswer({
                    variables: {
                        driverMultiCallAnswerInput: {
                            requestId: requestDetailsData?._id,
                            answer: true,
                        }
                    },
                });
                if (data.driverOneCallAnswer._id) {
                    toast.success('Your accepted the trip', {
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
        }
    };

    return (
        <div className={styles.request_details}>
            <div
                className={styles.title_box}
                onClick={() => closeDetailsCard()}
            >
                <Image
                    src={'/icons/caretLeft-big.svg'}
                    alt={'caret'}
                    width={32}
                    height={32}
                />
                <h2 className={styles.request_detail_title}>Requests Details</h2>
            </div>
            <LocationCard
                pickupLocation={requestDetailsData?.pickupLocation}
                dropoffLocation={requestDetailsData?.dropoffLocation}
            />
            <div className={styles.user_details_wrapper}>
                <DriverAvatar
                    driverAvatarURL={requestDetailsData?.userId.avatarURL}
                    driverName={requestDetailsData?.userId.userName}
                    bigName={true}
                />
                <div className='line' />
                <DetailsItem
                    imageURL='/icons/clock.svg'
                    title='Request date & time'
                    value={requestDetailsData?.requestedTime ? format(new Date(requestDetailsData?.requestedTime), "d LLL h:mm a") : ""}
                />
                {requestDetailsData?.driverId &&
                    <p className={styles.user_details_personal}>Personal request</p>
                }
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
            <div className={styles.request_buttons}>
                {requestDetailsData?.driverId &&
                    <button
                        className='button-grey-outlined'
                        onClick={cancelClick}
                    >
                        Decline
                    </button>
                }
                <button
                    className='button-green-filled'
                    onClick={confirmClick}
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default RequestDetailsCard;