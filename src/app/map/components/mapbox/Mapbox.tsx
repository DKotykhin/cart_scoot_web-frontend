"use client";

import React, { useEffect, useState } from 'react';
import Map, { Marker } from "react-map-gl";
import { toast } from 'react-toastify';

import Image from "next/image";

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_FREE_DRIVERS } from 'apollo/queries/user';

import SendRequestButton from '../sendRequestButton/SendRequestButton';
import FindCarForm, { IFormData } from '../findCarForm/FindCarForm';
import RequestDetailedCard from '../requestDetailedCard/RequestDetailedCard';
import AskLoginCard from '../askLoginCard/AskLoginCard';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import RegisterMobilePhone from 'app/map/components/registerMobilePhone/RegisterMobilePhone';

import { viewport } from 'constants/mapViewport';
import { IDriverWithRating } from 'types/userTypes';

import styles from './mapbox.module.scss';

export interface IMarkerClickData {
    driver: IDriverWithRating,
    savedFormData?: IFormData,
}

const Mapbox = () => {

    const [savedFormData, setSavedFormData] = useState<IFormData>();
    const [markerData, setMarkerData] = useState<IMarkerClickData>();
    const [openDriverDetails, setOpenDriverDetails] = useState(false);
    const [openLoginMobileCard, setOpenLoginMobileCard] = useState(false);
    const [openAddMobileCard, setOpenAddMobileCard] = useState(false);

    const { data }: { data: { getFreeDrivers: [IDriverWithRating] } } = useSuspenseQuery(GET_FREE_DRIVERS, {
        variables: {
            getFreeDriversInput: {
                requestedDate: savedFormData?.timeData.date,
                requestedTime: savedFormData?.timeData.time,
            }
        }
    });
    useEffect(() => {
        const driverAmount = data?.getFreeDrivers.length;
        if (driverAmount > 0) {
            toast.success(`Founded ${driverAmount} cars`, {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else if (!driverAmount) {
            toast.warn("Cars not found", {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        }

    }, [data?.getFreeDrivers.length]);
    // console.log(data?.getFreeDrivers);

    const openLoginModal = () => setOpenLoginMobileCard(true);
    const closeLoginModal = () => setOpenLoginMobileCard(false);

    const formData = (data: IFormData) => setSavedFormData(data);
    const markerClick = (data: IMarkerClickData) => {
        setMarkerData(data);
        setOpenDriverDetails(true);
    };
    const closeDriverDetails = () => setOpenDriverDetails(false);

    const openPhoneCard = () => {
        console.log('open Card');
        setOpenLoginMobileCard(false);
        setOpenAddMobileCard(true);
    };

    const closeMobileCard = () => setOpenAddMobileCard(false);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Map
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    initialViewState={viewport}
                    style={{ borderRadius: 20 }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                    {data?.getFreeDrivers.map(driver => (
                        <Marker
                            latitude={driver.driver.coordinates?.lat}
                            longitude={driver.driver.coordinates?.lon}
                            key={driver.driver._id}
                            onClick={() => markerClick({ driver, savedFormData })}
                        >
                            <DriverAvatar
                                driverAvatarURL={driver.driver.avatarURL}
                                driverName={driver.driver.userName}
                                hideName={true}
                            />
                        </Marker>
                    ))}
                </Map>
                <FindCarForm openLoginModal={openLoginModal} formData={formData} closeDriverDetails={closeDriverDetails} />
                {savedFormData?.locationData &&
                    savedFormData.timeData.time &&
                    savedFormData.timeData.date &&
                    data.getFreeDrivers.length &&
                    <SendRequestButton />
                }
            </div>
            {markerData && openDriverDetails && <RequestDetailedCard markerData={markerData} />}
            {openLoginMobileCard &&
                <AskLoginCard
                    closeLoginModal={closeLoginModal}
                    openPhoneCard={openPhoneCard}
                />
            }
            {openAddMobileCard &&
                <RegisterMobilePhone handleClose={closeMobileCard} />
            }
        </div>
    );
};

export default Mapbox;