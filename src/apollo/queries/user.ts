import { gql } from "@apollo/client";

export const GET_USER_BY_TOKEN = gql`
    query GetUserByToken {
        getUserByToken {
            _id
            email
            role
            phone {
                confirmed
                number
            }
            userName
            createdAt
            avatarURL
            coordinates {
                lat
                lon
            }
            driverRequests
            license {
                message
                status
                url
            }
            workingDays
            workingTime {
                from
                to
            }
        }
    }
`;

export const GET_FREE_DRIVERS = gql`
    query GetFreeDrivers($getFreeDriversInput: GetFreeDriversInput) {
        getFreeDrivers(getFreeDriversInput: $getFreeDriversInput) {
            rating
            driver {
                _id
                avatarURL
                userName
                workingTime {
                    from
                    to
                }
                phone {
                    confirmed
                    number
                }
                coordinates {
                    lat
                    lon
                }
                workingDays
            }
        }
    }
`;
