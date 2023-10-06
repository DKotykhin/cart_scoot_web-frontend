import { gql } from "@apollo/client";

export const GET_ALL_DRIVERS = gql`
    query GetAllDrivers {
        getAllDrivers {
            _id
            avatarURL
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

export const GET_ALL_RIDERS = gql`
    query GetAllRiders {
        getAllRiders {
            _id
            avatarURL
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
`;

export const GET_ALL_REQUESTS = gql`
    query GetAllRequests {
        getAllRequests {
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
    }
`;
