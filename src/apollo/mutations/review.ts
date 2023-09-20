import { gql } from "@apollo/client";

export const ADD_REVIEW = gql`
    mutation AddReview($addReviewInput: AddReviewInput) {
        addReview(addReviewInput: $addReviewInput) {
            _id
            createdAt
            createdBy
            driverId
            rating
            requestCode
            text
        }
    }
`;
