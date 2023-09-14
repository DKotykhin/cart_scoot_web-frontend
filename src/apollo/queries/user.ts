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
