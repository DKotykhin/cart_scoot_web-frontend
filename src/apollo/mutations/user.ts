import { gql } from "@apollo/client";

export const REGISTER = gql`
    mutation RegisterByEmail($registerUserInput: RegisterUserInput) {
        registerByEmail(registerUserInput: $registerUserInput) {
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

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($changePasswordInput: ChangePasswordInput) {
        changePassword(changePasswordInput: $changePasswordInput) {
            message
            status
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation ChangePassword($email: String!) {
        resetPassword(email: $email) {
            message
            status
        }
    }
`;

export const SET_NEW_PASSWORD = gql`
    mutation ChangePassword($setPasswordInput: UserSetPasswordInput) {
        setNewPassword(setPasswordInput: $setPasswordInput) {
            message
            status
        }
    }
`;
