import { getClient } from "apollo/getClient";

import { GET_ALL_DRIVERS } from "apollo/queries/admin";
import { IUser } from "types/userTypes";

export const getAllDrivers = async (): Promise<
    { getAllDrivers: [IUser] } | undefined
> => {
    try {
        const { data } = await getClient().query({
            query: GET_ALL_DRIVERS,
        });
        return data;
    } catch (error: any) {
        console.log("Get all drivers error message: ", error.message);
    }
};
