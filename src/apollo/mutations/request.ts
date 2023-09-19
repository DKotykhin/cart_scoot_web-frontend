import { gql } from "@apollo/client";

export const FINISH_REQUEST = gql`
    mutation FinishRequest($finishRequestId: ID!) {
        finishRequest(id: $finishRequestId) {
            _id
        }
    }
`;

export const RIDER_ANSWER = gql`
    mutation RiderAnswer($riderAnswerInput: AnswerInput) {
        riderAnswer(riderAnswerInput: $riderAnswerInput) {
            _id
        }
    }
`;
