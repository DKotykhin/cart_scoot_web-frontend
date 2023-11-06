"use client";

import React, { useState, useEffect } from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import ReactMapGl, { Marker, Source, Layer, FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";
import type { LineLayer } from 'react-map-gl';
import type { FeatureCollection } from 'geojson';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REQUEST } from 'apollo/queries/request';

import FinishedCard from '../finishedCard/FinishedCard';
import DetailsCard from '../detailsCard/DetailsCard';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';

import { useMapboxApi } from 'hooks/useMapboxApi';
import { mapStyle, viewport } from 'constants/mapStyle';
import { IRequestWithRating } from 'types/requestTypes';

import styles from './requestDetails.module.scss';

const RequestDetails: React.FC<{ _id: string }> = ({ _id }) => {

    const router = useRouter();

    const [openFinishedCard, setOpenFinishedCard] = useState(false);
    const [openMobileDetailedCard, setOpenMobileDetailedCard] = useState(false);
    const [finishedCardData, setFinishedCardData] = useState({
        driverId: "",
        requestCode: "",
    });

    useEffect(() => {
        const offset = window.innerWidth - document.body.offsetWidth + 'px';
        if ((openMobileDetailedCard || openFinishedCard) && (window.innerWidth < 998)) {
            document.body.style.overflowY = 'hidden';
            document.body.style.paddingRight = offset;
        } else {
            document.body.style.overflowY = 'unset';
            document.body.style.paddingRight = '0px';
        }

    }, [openMobileDetailedCard, openFinishedCard]);

    const { data }: { data: { getRequest: IRequestWithRating } } = useSuspenseQuery(GET_REQUEST, {
        variables: {
            id: _id
        }
    });

    const { coordinates: { start, end } } = data.getRequest.request;

    const routeData = useMapboxApi(start.lat, start.lon, end.lat, end.lon);

    const geojson: FeatureCollection = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature", geometry: routeData?.geometry, properties: {},
            }
        ]
    };

    const layerStyle: LineLayer = {
        id: "roadLayer",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": "#0000ff",
            "line-width": 4,
            "line-opacity": 0.75
        }
    };

    const handleClick = () => router.push('/requests-list');
    const handleClose = () => setOpenFinishedCard(false);
    const OpenFinishedCardFn = (driverId: string, requestCode: string) => {
        setOpenFinishedCard(true);
        setFinishedCardData({
            driverId,
            requestCode,
        });
    };

    return (
        <>
            {openFinishedCard && <FinishedCard handleClose={handleClose} finishedCardData={finishedCardData} />}
            <div className={styles.container}>
                {data &&
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
                                <DriverAvatar
                                    driverAvatarURL={data.getRequest.request?.driverId?.avatarURL}
                                    driverName={data.getRequest.request?.driverId?.userName}
                                    hideName={true}
                                />
                            </Marker>
                            <Source id="map-data" type="geojson" data={geojson}>
                                <Layer {...layerStyle} />
                            </Source>
                            <FullscreenControl />
                            <GeolocateControl />
                            <NavigationControl />
                        </ReactMapGl>
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
                {openMobileDetailedCard ?
                    <DetailsCard
                        data={data?.getRequest}
                        routeData={routeData}
                        OpenFinishedCardFn={OpenFinishedCardFn}
                        closeMobileDetailedCard={() => setOpenMobileDetailedCard(false)}
                    />
                    :
                    <>
                        <div className={styles.mobile_card_wrapper}>
                            <p>Details</p>
                            <button onClick={() => setOpenMobileDetailedCard(true)}>
                                <Image
                                    src={'/icons/caretUp.svg'}
                                    alt={'caret'}
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                        <div className={styles.desktop_card_wrapper}>
                            <DetailsCard
                                data={data?.getRequest}
                                routeData={routeData}
                                OpenFinishedCardFn={OpenFinishedCardFn}
                            />
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default RequestDetails;



// {
//     type: 'Feature', geometry: {
//         "type": "LineString",
//         "coordinates": [
//             [49.999984, 36.000324],
//             [50.038327, 36.00078],
//             [50.071596, 35.998135],
//             [50.072099, 35.9895],
//             [50.072587, 35.989433],
//             [50.06912, 36.020265],
//             [50.058627, 36.051555],
//             [50.06174, 36.062982],
//             [50.057082, 36.07443],
//             [50.048834, 36.085711],
//             [50.037372, 36.124637],
//             [50.053535, 36.143367],
//             [50.068855, 36.142753],
//             [50.075505, 36.135476],
//             [50.080113, 36.120836],
//             [50.083688, 36.115693]
//         ]
//     }
// }