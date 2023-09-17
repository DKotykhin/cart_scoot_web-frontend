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

export const GET_ALL_REQUESTS_BY_FILTERS = gql`
    query GetAllRequestsByFilters(
        $getAllRequestsByFiltersInput: GetAllRequestsByFiltersInput
    ) {
        getAllRequestsByFilters(
            getAllRequestsByFiltersInput: $getAllRequestsByFiltersInput
        ) {
            _id
            createdAt
            userId
            driverId {
                _id
                userName
                avatarURL
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

export const GET_NOT_FINISHED_REQUESTS = gql`
    query GetNotFinishedRequests {
        getNotFinishedRequests {
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

// getAllRequestsByFilters(getAllRequestsByFiltersInput: GetAllRequestsByFiltersInput): [RequestWithPopulatedFields]
// getAllActiveRequests: [Request]
// getAllFinishedRequests: [Request]
// getNotFinishedRequests: [Request]
// getFinishedRequestsByDriver(id: ID!): [Request]
