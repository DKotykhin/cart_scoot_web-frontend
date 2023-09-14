import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation LoginByEmail($email: String!, $password: String!) {
        loginByEmail(email: $email, password: $password) {
            message
            token
            user {
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
    }
`;
