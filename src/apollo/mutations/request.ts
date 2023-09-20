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

export const ONE_DRIVER_REQUEST = gql`
    mutation CreateOneDriverRequest(
        $createOneDriverRequestInput: CreateOneDriverRequestInput
    ) {
        createOneDriverRequest(
            createOneDriverRequestInput: $createOneDriverRequestInput
        ) {
            request {
                _id
                status
            }
        }
    }
`;

export const ALL_DRIVERS_REQUEST = gql`
    mutation CreateDriversRequest(
        $createDriversRequestInput: CreateDriversRequestInput
    ) {
        createDriversRequest(
            createDriversRequestInput: $createDriversRequestInput
        ) {
            request {
                _id
                status
            }
        }
    }
`;
