import { gql } from "@apollo/client";

export const GET_USER_BY_TOKEN = gql`
    query GetUserByToken {
        getUserByToken {
            _id
            avatarURL
            banned
            createdAt
            coordinates {
                lat
                lon
            }
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
                role
                coordinates {
                    lat
                    lon
                }
                workingDays
            }
        }
    }
`;
