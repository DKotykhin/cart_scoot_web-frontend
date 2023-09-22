import { gql } from "@apollo/client";

export const FINISH_REQUEST = gql`
    mutation FinishRequest($requestId: ID!) {
        finishRequest(requestId: $requestId) {
            _id
            status
            requestCode
        }
    }
`;

export const CANCEL_REQUEST = gql`
    mutation CancelRequest($requestId: ID!) {
        cancelRequest(requestId: $requestId) {
            _id
            status
            requestCode
        }
    }
`;

export const RIDER_MULTI_CALL_ANSWER = gql`
    mutation RiderMultiCallAnswer($riderMultiCallAnswerInput: AnswerInput) {
        riderMultiCallAnswer(
            riderMultiCallAnswerInput: $riderMultiCallAnswerInput
        ) {
            _id
            status
            requestCode
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
                requestCode
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
                requestCode
            }
        }
    }
`;
