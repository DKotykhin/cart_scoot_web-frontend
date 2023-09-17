"use client";

import React from 'react';

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_FREE_DRIVERS } from 'apollo/queries/user';

import SendRequestButton from '../sendRequestButton/SendRequestButton';
import FindCarForm from '../findCarForm/FindCarForm';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';

import { viewport } from 'constants/mapViewport';
import { IDriverWithRating } from 'types/userTypes';

import styles from './mapbox.module.scss';


const Mapbox = () => {

    const { data }: { data: { getFreeDrivers: [IDriverWithRating] } } = useSuspenseQuery(GET_FREE_DRIVERS, {
        variables: {
            getFreeDriversInput: {
                requestedDate: null,
                requestedTime: null,
            }
        }
    });
    // console.log(data?.getFreeDrivers);

    return (
        <div className={styles.container}>
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
                    >
                        <DriverAvatar
                            driverAvatarURL={driver.driver.avatarURL}
                            driverName={driver.driver.userName}
                            hideName={true}
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