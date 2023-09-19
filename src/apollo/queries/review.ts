import { gql } from "@apollo/client";

export const GET_REVIEW_BY_ID = gql`
    query GetReviewsById($driverId: ID!) {
        getReviewsById(driverId: $driverId) {
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
`;
