import { gql } from "@apollo/client";

export const GET_REQUEST = gql`
    query GetRequest($id: ID!) {
        getRequest(id: $id) {
            request {
                _id
                carType
                createdAt
                coordinates {
                    start {
                        lat
                        lon
                    }
                    end {
                        lat
                        lon
                    }
                }
                description
                driverId {
                    _id
                    userName
                    avatarURL
                    phone {
                        confirmed
                        number
                    }
                }
                dropoffLocation
                pickupLocation
                requestCode
                requestedTime
                status
                userId
            }
            avgRating
        }
    }
`;

export const GET_ALL_REQUESTS = gql`
    query GetAllRequests {
        getAllRequests {
            _id
            createdAt
            userId
            driverId
            description
            status
            carType
            requestedTime
            coordinates {
                start {
                    lat
                    lon
                }
                end {
                    lat
                    lon
                }
            }
            requestCode
            pickupLocation
            dropoffLocation
        }
    }
`;

export const GET_REQUESTS_BY_RIDER = gql`
    query GetRequestsByRider(
        $getRequestsByFiltersInput: GetRequestsByFiltersInput
    ) {
        getRequestsByRider(
            getRequestsByFiltersInput: $getRequestsByFiltersInput
        ) {
            _id
            createdAt
            userId
            driverId {
                _id
                userName
                avatarURL
                phone {
                    confirmed
                    number
                }
            }
            description
            status
            carType
            requestedTime
            coordinates {
                start {
                    lat
                    lon
                }
                end {
                    lat
                    lon
                }
            }
            requestCode
            pickupLocation
            dropoffLocation
        }
    }
`;

export const GET_REQUESTS_BY_DRIVER = gql`
    query GetRequestsByDriver(
        $getRequestsByFiltersInput: GetRequestsByFiltersInput
    ) {
        getRequestsByDriver(
            getRequestsByFiltersInput: $getRequestsByFiltersInput
        ) {
            _id
            createdAt
            userId {
                _id
                userName
                avatarURL
                phone {
                    confirmed
                    number
                }
            }
            driverId
            description
            status
            carType
            requestedTime
            coordinates {
                start {
                    lat
                    lon
                }
                end {
                    lat
                    lon
                }
            }
            requestCode
            pickupLocation
            dropoffLocation
        }
    }
`;
