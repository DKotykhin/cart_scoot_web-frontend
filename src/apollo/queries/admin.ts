import { gql } from "@apollo/client";

export const GET_ALL_DRIVERS = gql`
    query GetAllDrivers($pageNumber: Int) {
        getAllDrivers(pageNumber: $pageNumber) {
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
    query GetAllRiders($pageNumber: Int) {
        getAllRiders(pageNumber: $pageNumber) {
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
    query GetAllRequests($pageNumber: Int, $itemsOnPage: Int) {
        getAllRequests(pageNumber: $pageNumber, itemsOnPage: $itemsOnPage) {
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
