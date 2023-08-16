"use client";

import React from 'react';

import Image from "next/image";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from './contactMap.module.scss';

const viewport = { latitude: 38.9, longitude: -77.05, zoom: 17 };

const ContactMap = () => {
    return (
        <div className={styles.map}>
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={viewport}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker
                    longitude={viewport.longitude}
                    latitude={viewport.latitude}
                />
            </Map>
            <div className={styles.contacts}>
                <h2>Get in touch with our team</h2>
                <h4>Reach Out to Us for Inquiries, Reservations, and More</h4>
                <p>
                    <Image
                        src={'/icons/phone.svg'}
                        alt={'phone'}
                        width={24}
                        height={24}
                    />
                    <a href="tel:159606360691">+ 1 5960 6360 691</a>
                </p>
                <p>
                    <Image
                        src={'/icons/envelope.svg'}
                        alt={'envelope'}
                        width={24}
                        height={24}
                    />
                    <a href="mailto:info@CartScoot.com">info@CartScoot.com</a>
                </p>
                <p>
                    <Image
                        src={'/icons/mapPin.svg'}
                        alt={'mapPin'}
                        width={24}
                        height={24}
                    />
                    <span>775 Rolling Green Rd.</span>
                </p>
            </div>
        </div>
    );
};

export default ContactMap;