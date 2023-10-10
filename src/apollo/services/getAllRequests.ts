import { getClient } from "apollo/getClient";

import { GET_ALL_REQUESTS } from "apollo/queries/admin";
import { IRequest } from "types/requestTypes";

export const getAllRequests = async (): Promise<
    { getAllRequests: { requests: [IRequest]; totalCount: number } } | undefined
> => {
    try {
        const { data } = await getClient().query({
            query: GET_ALL_REQUESTS,
        });
        return data;
    } catch (error: any) {
        console.log("Get all requests error message: ", error.message);
    }
};
