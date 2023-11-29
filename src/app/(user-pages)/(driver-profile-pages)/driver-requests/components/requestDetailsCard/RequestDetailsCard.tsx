import { FC, useState } from 'react';

import Image from "next/image";
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { DRIVER_ONE_CALL_ANSWER, DRIVER_MULTI_CALL_ANSWER } from 'apollo/mutations/request';

import LocationCard from '../../../components/locationCard/LocationCard';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import DetailsItem from 'components/detailsItem/DetailsItem';

import { useMapboxApi } from 'hooks/useMapboxApi';
import { useUserStore } from 'stores/userStore';

import { IRequestWithRiderPopulatedFields, statusTypes } from 'types/requestTypes';
import { licenseStatusTypes } from 'types/userTypes';

import styles from './requestDetailsCard.module.scss';

interface IRequestDetailsCard {
    requestDetailsData?: IRequestWithRiderPopulatedFields;
    closeDetailsCard: () => void;
}

const RequestDetailsCard: FC<IRequestDetailsCard> = ({ requestDetailsData, closeDetailsCard }) => {

    const [driverAnswer, setDriverAnswer] = useState(false);

    const { userData } = useUserStore();

    const routeData = useMapboxApi(
        requestDetailsData?.coordinates.start.lat,
        requestDetailsData?.coordinates.start.lon,
        requestDetailsData?.coordinates.end.lat,
        requestDetailsData?.coordinates.end.lon
    );

    const [oneCallAnswer, { loading: oneCallLoading }] = useMutation(DRIVER_ONE_CALL_ANSWER, {
        update(cache) {
            cache.modify({
                fields: {
                    getPendingRequestsByDriver() { }
                }
            });
        },
        onCompleted: (data) => {
            toast.success(data.driverOneCallAnswer.status === statusTypes.cancelled ?
                'Your canceled the request' : 'Your accepted the request', {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
            closeDetailsCard();
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

    const [multiCallAnswer, { loading: multiCallLoading }] = useMutation(DRIVER_MULTI_CALL_ANSWER, {
        update(cache) {
            cache.modify({
                fields: {
                    getPendingRequestsByDriver() { }
                }
            });
        },
        onCompleted: (data) => {
            toast.success('Your accepted the trip', {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
            closeDetailsCard();
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

    const cancelClick = async () => {
        setDriverAnswer(false);
        await oneCallAnswer({
            variables: {
                driverOneCallAnswerInput: {
                    requestId: requestDetailsData?._id,
                    answer: false,
                }
            },
        });
    };

    const confirmClick = async () => {
        setDriverAnswer(true);
        if (requestDetailsData?.driverId) {
            await oneCallAnswer({
                variables: {
                    driverOneCallAnswerInput: {
                        requestId: requestDetailsData?._id,
                        answer: true,
                    }
                },
            });
        } else {
            await multiCallAnswer({
                variables: {
                    driverMultiCallAnswerInput: {
                        requestId: requestDetailsData?._id,
                        answer: true,
                    }
                },
            });
        }
    };

    return (
        <div className={styles.blur_wrapper}>
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
                    <h2 className={styles.request_detail_title}>
                        Requests Details
                    </h2>
                    <Image
                        src={'/icons/close.svg'}
                        alt={'caret'}
                        width={24}
                        height={24}
                    />
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
                            <p>{routeData ? `${Math.round((routeData?.distance / 1609.344) * 10) / 10} mi` : '0 mi'}</p>
                        </div>
                        <div className={styles.addition_details_inner_box}>
                            <Image
                                src={'/icons/hourglass-black.svg'}
                                alt={'hour'}
                                width={16}
                                height={16}
                                className={styles.addition_details_image}
                            />
                            <p>{routeData ? `${Math.ceil(routeData?.duration / 60)} min` : '0 min'}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.request_buttons}>
                    {userData.license.status === licenseStatusTypes.approved ?
                        requestDetailsData?.driverId ?
                            <>
                                <button
                                    className='button-grey-outlined'
                                    onClick={cancelClick}
                                >
                                    {oneCallLoading && !driverAnswer ?
                                        <Image
                                            src={'/spinner.svg'}
                                            alt={'spinner'}
                                            width={48}
                                            height={48}
                                        />
                                        : 'Decline'
                                    }
                                </button>
                                <button
                                    className='button-green-filled'
                                    onClick={confirmClick}
                                >
                                    {(oneCallLoading || multiCallLoading) && driverAnswer ?
                                        <Image
                                            src={'/spinner.svg'}
                                            alt={'spinner'}
                                            width={48}
                                            height={48}
                                        />
                                        : 'Accept'
                                    }
                                </button>
                            </>
                            :
                            <button
                                className='button-green-filled'
                                onClick={confirmClick}
                            >
                                {(oneCallLoading || multiCallLoading) && driverAnswer ?
                                    <Image
                                        src={'/spinner.svg'}
                                        alt={'spinner'}
                                        width={48}
                                        height={48}
                                    />
                                    : 'Accept'
                                }
                            </button>
                        :
                        <p className={styles.request_warn_message}>
                            You need to approve your documents
                        </p>
                    }
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsCard;