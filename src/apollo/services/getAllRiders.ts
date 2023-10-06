import { getClient } from "apollo/getClient";

import { GET_ALL_RIDERS } from "apollo/queries/admin";
import { IRider } from "types/userTypes";

export const getAllRiders = async (): Promise<
    { getAllRiders: [IRider] } | undefined
> => {
    try {
        const { data } = await getClient().query({
            query: GET_ALL_RIDERS,
        });
        return data;
    } catch (error: any) {
        console.log("Get all riders error message: ", error.message);
    }
};
