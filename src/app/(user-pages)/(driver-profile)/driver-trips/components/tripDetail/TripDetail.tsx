"use client";

import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REQUEST } from 'apollo/queries/request';

import ReactMapGl, { Marker, FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";
import { viewport, mapStyle } from 'constants/mapStyle';
import { IRequestWithRating } from 'types/requestTypes';

import styles from './tripDetail.module.scss';
import DetailsCard from '../detailsCard/DetailsCard';

const TripDetail: React.FC<{ _id: string }> = ({ _id }) => {

    const router = useRouter();

    const { data }: { data: { getRequest: IRequestWithRating } } = useSuspenseQuery(GET_REQUEST, {
        variables: {
            id: _id
        }
    });
    // console.log(data?.getRequest.request);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.title_box}
                onClick={() => router.push('/driver-trips')}
            >
                <Image
                    src={'/icons/caretLeft-big.svg'}
                    alt={'caret'}
                    width={32}
                    height={32}
                />
                <h2 className={styles.profile_title}>Back to Trips</h2>
            </div>
            <div className={styles.map}>
                <ReactMapGl
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    initialViewState={viewport}
                    style={{ borderRadius: 20 }}
                    mapStyle={mapStyle}
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
                        <div className={styles.marker_box}>
                            <Image
                                src={'/icons/flag-green.svg'}
                                alt={'pin'}
                                width={32}
                                height={32}
                                className={styles.marker_pin}
                            />
                            <p>Drop Location</p>
                            <Image
                                src={'/pickupBadge.svg'}
                                alt={'badge'}
                                width={157}
                                height={61}
                                className={styles.marker_badge}
                            />
                        </div>
                    </Marker>
                    <FullscreenControl />
                    <GeolocateControl />
                    <NavigationControl />
                </ReactMapGl>
                <DetailsCard request={data?.getRequest.request}/>
            </div>
        </div>
    );
};

export default TripDetail;