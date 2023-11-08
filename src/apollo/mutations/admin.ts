import { gql } from "@apollo/client";

export const CHANGE_USER_STATUS = gql`
    mutation ChangeUserStatus($status: Boolean, $id: ID!) {
        changeUserStatus(status: $status, _id: $id) {
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

export const ANSWER_DRIVER_LICENSE = gql`
    mutation AnswerDriverLicense(
        $answerDriverLicenseInput: AnswerDriverLicenseInput
    ) {
        answerDriverLicense(
            answerDriverLicenseInput: $answerDriverLicenseInput
        ) {
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

export const ADD_ADVERTISEMENT = gql`
    mutation AddAdvertisement($addAdvertisementInput: AddAdvertisementInput) {
        addAdvertisement(addAdvertisementInput: $addAdvertisementInput) {
            _id
            createdAt
            description
            from
            imageURL
            link
            position
            title
            to
        }
    }
`;

export const UPDATE_ADVERTISEMENT = gql`
    mutation UpdateAdvertisement(
        $updateAdvertisementInput: UpdateAdvertisementInput
    ) {
        updateAdvertisement(
            updateAdvertisementInput: $updateAdvertisementInput
        ) {
            _id
            createdAt
            description
            from
            imageURL
            link
            position
            title
            to
        }
    }
`;
