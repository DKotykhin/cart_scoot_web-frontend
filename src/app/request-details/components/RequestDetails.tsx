"use client";

import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REQUEST } from 'apollo/queries/request';

import { viewport } from 'constants/mapViewport';
import { IRequestWithRating } from 'types/requestTypes';

import styles from './requestDetails.module.scss';
import DetailsCard from './detailsCard/DetailsCard';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';

const RequestDetails: React.FC<{ _id: string }> = ({ _id }) => {

    const { data }: { data: { getRequest: IRequestWithRating } } = useSuspenseQuery(GET_REQUEST, {
        variables: {
            id: _id
        }
    });
    // console.log(data?.getRequest.request);
    const router = useRouter();
    const handleClick = () => router.push('/requests-list');

    return (
        <div className={styles.container}>
            {data &&
                <div className={styles.map}>
                    <Map
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                        initialViewState={viewport}
                        style={{ borderRadius: 20 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                    >
                        <Marker
                            latitude={data.getRequest.request.coordinates?.start?.lat}
                            longitude={data.getRequest.request.coordinates?.start?.lon}
                        >
                            <div className={styles.marker_box}>                                
                                <Image
                                    src={'/icons/mapPin-green.svg'}
                                    alt={'pin'}
                                    width={32}
                                    height={32}
                                    className={styles.marker_pin}
                                />
                                <p>Pick Location</p>
                                <Image
                                    src={'/pickupBadge.svg'}
                                    alt={'badge'}
                                    width={157}
                                    height={61}
                                    className={styles.marker_badge}
                                />
                            </div>
                        </Marker>
                        <Marker
                            latitude={data.getRequest.request.coordinates?.end?.lat}
                            longitude={data.getRequest.request.coordinates?.end?.lon}
                        >
                            <DriverAvatar
                                driverAvatarURL={data.getRequest.request.driverId.avatarURL}
                                driverName={data.getRequest.request.driverId.userName}
                                hideName={true}
                            />
                        </Marker>
                    </Map>
                    <div className={styles.return_button} onClick={handleClick}>
                        <Image
                            src={'/icons/caretLeft.svg'}
                            alt={'caret'}
                            width={24}
                            height={24}
                        />
                        <p>Back</p>
                    </div>
                </div>
            }
            <div className={styles.details}>
                <DetailsCard data={data?.getRequest} />
            </div>
        </div>
    );
};

export default RequestDetails;