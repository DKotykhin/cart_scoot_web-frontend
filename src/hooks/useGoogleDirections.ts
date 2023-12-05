import { Libraries, useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const libraries: Libraries = ['places'];

export const useGoogleDirections = (
    origin: string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral,
    destination: string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral
) => {
    const [direction, setDirection] = useState<any>();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        libraries,
    });

    useEffect(() => {
        if (isLoaded) {
            const directionService = new google.maps.DirectionsService();
            directionService
                .route({
                    origin,
                    destination,
                    travelMode: google.maps.TravelMode.WALKING,
                })
                .then((result) => setDirection(result?.routes[0]?.legs[0]));
        }
    }, [destination, isLoaded, origin]);

    return { direction, isLoaded };
};
