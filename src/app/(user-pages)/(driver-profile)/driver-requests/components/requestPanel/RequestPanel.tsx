"use client";

import React, { useState } from 'react';

import Image from "next/image";

import ReactMapGl, { Marker, FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";
import { viewport, mapStyle } from 'constants/mapStyle';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import RequestList, { ICoordinates } from '../requestList/RequestList';

import { IRequestWithRiderPopulatedFields } from 'types/requestTypes';
import { IUser } from 'types/userTypes';

import styles from './requestPanel.module.scss';

interface IRequestPanel {
    requests?: [IRequestWithRiderPopulatedFields],
    driver?: IUser
}

const RequestPanel: React.FC<IRequestPanel> = ({ requests, driver }) => {

    const [coordinates, setCoordinates] = useState<ICoordinates>();
    const markerCoordinates = (coord?: ICoordinates) => setCoordinates(coord);

    return (
        <div className={styles.map}>
            <ReactMapGl
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={viewport}
                style={{ borderRadius: 20 }}
                mapStyle={mapStyle}
            >
                <Marker
                    latitude={coordinates?.start?.lat || 0}
                    longitude={coordinates?.start?.lon || 0}
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
                    latitude={coordinates?.end?.lat || 0}
                    longitude={coordinates?.end?.lon || 0}
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
                <Marker
                    latitude={driver?.coordinates.lat || 0}
                    longitude={driver?.coordinates.lon || 0}
                >
                    <DriverAvatar
                        driverName={driver?.userName}
                        driverAvatarURL={driver?.avatarURL}
                        hideName={true}
                    />
                </Marker>
                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
            </ReactMapGl>
            <RequestList requests={requests} markerCoordinates={markerCoordinates} />
        </div>
    );
};

export default RequestPanel;