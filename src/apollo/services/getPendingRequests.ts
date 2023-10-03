import { getClient } from "apollo/getClient";

import { GET_PENDING_REQUESTS } from "apollo/queries/request";

import { IRequestWithRiderPopulatedFields } from "types/requestTypes";

export const getPendingRequests = async (): Promise<
    {getPendingRequests: [IRequestWithRiderPopulatedFields]} | undefined
> => {
    try {
        const { data } = await getClient().query({
            query: GET_PENDING_REQUESTS,
        });
        return data;
    } catch (error: any) {
        console.log("Get request error message: ", error.message);
    }
};
