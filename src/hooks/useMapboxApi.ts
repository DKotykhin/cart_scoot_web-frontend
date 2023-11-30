import { useEffect, useState } from "react";

import axios from "axios";

import type { LineString } from "geojson";

export interface IRouteData {
    distance: number;
    duration: number;
    geometry: LineString;
}

export const useMapboxApi = (
    startLat?: number,
    startLon?: number,
    endLat?: number,
    endLon?: number
) => {
    const [apiData, setApiData] = useState<IRouteData>({
        distance: 0,
        duration: 0,
        geometry: {
            type: "LineString",
            coordinates: [],
        },
    });

    useEffect(() => {
        if (startLat && startLon && endLat && endLon) {
            const startPoint = `${startLat},${startLon}`;
            const endPoint = `${endLat},${endLon}`;
            const mapboxApiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${startPoint};${endPoint}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

            const config = {
                method: "GET",
                url: mapboxApiUrl,
            };
            axios(config)
                .then((response) => {
                    console.log(response.data);
                    setApiData(response.data?.routes[0]);
                })
                .catch((err) => console.log(err.message));
        }
    }, [endLat, endLon, startLat, startLon]);

    return apiData;
};
