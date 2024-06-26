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
                isReviewed
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
                userId {
                    _id
                    userName
                    avatarURL
                    phone {
                        confirmed
                        number
                    }
                }
            }
            avgRating
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
            requests {
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
                isReviewed
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
            totalCount
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
            requests {
                _id
                carType
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
                createdAt
                isReviewed
                driverId
                dropoffLocation
                pickupLocation
                requestCode
                requestedTime
                status
                userId {
                    _id
                    userName
                    avatarURL
                    phone {
                        confirmed
                        number
                    }
                }
            }
            totalCount
        }
    }
`;

export const GET_PENDING_REQUESTS_BY_DRIVER = gql`
    query GetPendingRequestsByDriver {
        getPendingRequestsByDriver {
            _id
            carType
            coordinates {
                end {
                    lon
                    lat
                }
                start {
                    lat
                    lon
                }
            }
            createdAt
            isReviewed
            driverId
            dropoffLocation
            pickupLocation
            requestCode
            requestedTime
            status
            userId {
                _id
                userName
                avatarURL
                phone {
                    confirmed
                    number
                }
            }
        }
    }
`;

export const GET_ACTIVE_REQUESTS_AMOUNT = gql`
    query GetActiveRequestsAmount($userId: ID) {
        getActiveRequestsAmount(userId: $userId) {
            requestAmount
        }
    }
`;
