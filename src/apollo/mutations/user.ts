import { gql } from "@apollo/client";

export const REGISTER_BY_EMAIL = gql`
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

export const LOGIN_BY_EMAIL = gql`
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
    mutation ResetPassword($email: String!) {
        resetPassword(email: $email) {
            message
            status
        }
    }
`;

export const SET_NEW_PASSWORD = gql`
    mutation SetNewPassword($setPasswordInput: UserSetPasswordInput) {
        setNewPassword(setPasswordInput: $setPasswordInput) {
            message
            status
        }
    }
`;

export const REGISTER_BY_PHONE = gql`
    mutation RegisterByPhone($registerByPhoneInput: RegisterByPhoneInput) {
        registerByPhone(registerByPhoneInput: $registerByPhoneInput) {
            message
            user {
                _id
            }
        }
    }
`;

export const FULL_REGISTER_BY_PHONE = gql`
    mutation FullRegisterByPhone(
        $fullRegisterByPhoneInput: FullRegisterByPhoneInput
    ) {
        fullRegisterByPhone(
            fullRegisterByPhoneInput: $fullRegisterByPhoneInput
        ) {
            message
            user {
                _id
            }
        }
    }
`;

export const LOGIN_BY_PHONE = gql`
    mutation LoginByPhone($loginByPhoneInput: LoginByPhoneInput) {
        loginByPhone(loginByPhoneInput: $loginByPhoneInput) {
            message
            token
            user {
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
    }
`;

export const ADD_MOBILE_PHONE = gql`
    mutation AddMobilePhone($phone: String!) {
        addMobilePhone(phone: $phone) {
            _id
        }
    }
`;

export const CONFIRM_MOBILE_PHONE = gql`
    mutation ConfirmMobilePhone($smsCode: String!) {
        confirmMobilePhone(smsCode: $smsCode) {
            _id
        }
    }
`;

export const CHANGE_USER_NAME = gql`
    mutation ChangeUserName($changeUserNameInput: ChangeUserNameInput) {
        changeUserName(changeUserNameInput: $changeUserNameInput) {
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

export const UPDATE_WORKING_TIME = gql`
    mutation UpdateWorkingTime(
        $updateWorkingTimeInput: UpdateWorkingTimeInput
    ) {
        updateWorkingTime(updateWorkingTimeInput: $updateWorkingTimeInput) {
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
