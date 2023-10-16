import { getClient } from "apollo/getClient";

import { GET_PENDING_REQUESTS_BY_DRIVER } from "apollo/queries/request";

import { IRequestWithRiderPopulatedFields } from "types/requestTypes";

export const getPendingRequestsByDriver = async (): Promise<
    | { getPendingRequestsByDriver: [IRequestWithRiderPopulatedFields] }
    | undefined
> => {
    try {
        const { data } = await getClient().query({
            query: GET_PENDING_REQUESTS_BY_DRIVER,
        });
        return data;
    } catch (error: any) {
        console.log("Get request error message: ", error.message);
    }
};
