"use client";

import React from 'react';
import ReactMapGl, { Marker, FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";

import Image from "next/image";

import { viewport, mapStyle } from 'constants/mapStyle';
import { IRequestWithAllUsersPopulatedFields } from 'types/requestTypes';

import styles from './detailsMap.module.scss';

interface IDetailsMap {
    requestData?: {
        request: IRequestWithAllUsersPopulatedFields;
        avgRating: number;
    }
}

const DetailsMap: React.FC<IDetailsMap> = ({ requestData }) => {
    
    return (
        <div className={styles.details_map}>
            <ReactMapGl
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={viewport}
                style={{ borderRadius: 20 }}
                mapStyle={mapStyle}
            >
                <Marker
                    latitude={requestData?.request.coordinates?.start?.lat || 0}
                    longitude={requestData?.request.coordinates?.start?.lon || 0}
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
                    latitude={requestData?.request.coordinates?.end?.lat || 0}
                    longitude={requestData?.request.coordinates?.end?.lon || 0}
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
        </div>
    );
};

export default DetailsMap;