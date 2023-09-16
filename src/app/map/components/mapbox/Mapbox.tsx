"use client";

import React from 'react';

import Image from "next/image";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import SendRequestButton from '../sendRequestButton/SendRequestButton';

import styles from './mapbox.module.scss';
import FindCarForm from '../findCarForm/FindCarForm';

const viewport = { latitude: 50.02, longitude: 36.02, zoom: 12 };
const markers = [
    { latitude: 50, longitude: 36 },
    { latitude: 50.01, longitude: 36.01 },
    { latitude: 50.02, longitude: 36.02 },
    { latitude: 50.03, longitude: 36.03 },
    { latitude: 50.04, longitude: 36.04 },
];

const Mapbox = () => {
    return (
        <div className={styles.container}>
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={viewport}
                style={{ borderRadius: 20 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                {markers.map((marker, i) => (
                    <Marker
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                        key={i}
                    >
                        <Image
                            src={'/avatars/userAvatar.svg'}
                            alt={'avatar'}
                            width={56}
                            height={56}
                        />
                    </Marker>
                ))}
            </Map>
            <FindCarForm />
            <SendRequestButton />
        </div>
    );
};

export default Mapbox;