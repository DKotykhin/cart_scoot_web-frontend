export const googleDirection = async (
    origin: string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral,
    destination: string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral
) => {
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
    });
    return result?.routes[0]?.legs[0];
};
