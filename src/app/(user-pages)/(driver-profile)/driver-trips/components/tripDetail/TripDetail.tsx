"use client";

import React from 'react';
import ReactMapGl, { Marker, FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";

import Image from "next/image";

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REQUEST } from 'apollo/queries/request';

import DetailsCard from '../detailsCard/DetailsCard';
import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';

import { viewport, mapStyle } from 'constants/mapStyle';
import { IRequestWithRating } from 'types/requestTypes';

import styles from './tripDetail.module.scss';

const TripDetail: React.FC<{ _id: string }> = ({ _id }) => {

    const { data }: { data: { getRequest: IRequestWithRating } } = useSuspenseQuery(GET_REQUEST, {
        variables: {
            id: _id
        }
    });

    return (
        <div className={styles.wrapper}>
            <TitleWithBackButton title='Back to Trips' pageURL='/driver-trips' />
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