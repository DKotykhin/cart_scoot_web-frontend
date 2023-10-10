import { gql } from "@apollo/client";

export const GET_ALL_DRIVERS = gql`
    query GetAllDrivers($getAllUsersInput: GetAllUsersInput) {
        getAllDrivers(getAllUsersInput: $getAllUsersInput) {
            totalCount
            users {
                _id
                avatarURL
                banned
                coordinates {
                    lat
                    lon
                }
                createdAt
                driverRequests
                email
                license {
                    message
                    status
                    url
                }
                phone {
                    confirmed
                    number
                }
                role
                userName
                workingDays
                workingTime {
                    from
                    to
                }
            }
        }
    }
`;

export const GET_ALL_RIDERS = gql`
    query GetAllRiders($getAllUsersInput: GetAllUsersInput) {
        getAllRiders(getAllUsersInput: $getAllUsersInput) {
            totalCount
            users {
                _id
                avatarURL
                banned
                driverRequests
                email
                phone {
                    confirmed
                    number
                }
                role
                userName
            }
        }
    }
`;

export const GET_ALL_REQUESTS = gql`
    query GetAllRequests($getAllRequestsInput: GetAllRequestsInput) {
        getAllRequests(getAllRequestsInput: $getAllRequestsInput) {
            requests {
                _id
                coordinates {
                    end {
                        lat
                        lon
                    }
                    start {
                        lat
                        lon
                    }
                }
                createdAt
                driverId
                dropoffLocation
                pickupLocation
                requestCode
                requestedTime
                status
                userId
            }
            totalCount
        }
    }
`;

export const GET_ALL_REVIEWS = gql`
    query GetAllReviews($getAllReviewsInput: GetAllReviewsInput) {
        getAllReviews(getAllReviewsInput: $getAllReviewsInput) {
            reviews {
                _id
                createdAt
                createdBy
                driverId
                rating
                requestCode
                text
            }
            totalCount
        }
    }
`;

export const GET_WAITING_LICENSES = gql`
    query GetWaitingLicenses {
        getWaitingLicenses {
            _id
            avatarURL
            banned
            coordinates {
                lat
                lon
            }
            createdAt
            driverRequests
            email
            license {
                message
                status
                url
            }
            phone {
                confirmed
                number
            }
            role
            userName
            workingDays
            workingTime {
                from
                to
            }
        }
    }
`;

export const GET_STATISTIC = gql`
    query GetStatistic {
        getStatistic {
            totalDrivers
            totalRiders
            totalTrips
        }
    }
`;
