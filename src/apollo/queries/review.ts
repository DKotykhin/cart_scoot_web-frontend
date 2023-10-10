import { gql } from "@apollo/client";

export const GET_REVIEWS_BY_DRIVER_ID = gql`
    query GetReviewsByDriverId(
        $getReviewsByDriverIdInput: GetReviewsByDriverIdInput
    ) {
        getReviewsByDriverId(
            getReviewsByDriverIdInput: $getReviewsByDriverIdInput
        ) {
            totalCount
            reviews {
                _id
                createdAt
                createdBy {
                    _id
                    avatarURL
                    userName
                }
                driverId {
                    _id
                    avatarURL
                    userName
                }
                rating
                requestCode
                text
            }
        }
    }
`;

export const GET_DRIVER_RATING = gql`
    query GetDriverRating {
        getDriverRating {
            avgRating
            totalCount
        }
    }
`;
