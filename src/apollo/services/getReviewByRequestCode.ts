import { getClient } from "apollo/getClient";
import { GET_REVIEW_BY_REQUEST_CODE } from "apollo/queries/admin";

import { IReview } from "types/reviewTypes";

interface IGetReviewByRequestCode {
    getReviewByRequestCode: IReview;
}

export const getReviewByRequestCode = async (
    requestCode: string
): Promise<IGetReviewByRequestCode | undefined> => {
    try {
        const { data } = await getClient().query({
            query: GET_REVIEW_BY_REQUEST_CODE,
            variables: {
                requestCode,
            },
            fetchPolicy: 'no-cache',
        });
        return data;
    } catch (error: any) {
        console.log(
            "Get review by request code error message: ",
            error.message
        );
    }
};
