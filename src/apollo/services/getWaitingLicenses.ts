import { getClient } from "apollo/getClient";

import { GET_WAITING_LICENSES } from "apollo/queries/admin";
import { IUser } from "types/userTypes";

export const getWaitingLicenses = async (): Promise<
    { getWaitingLicenses: [IUser] } | undefined
> => {
    try {
        const { data } = await getClient().query({
            query: GET_WAITING_LICENSES,
        });
        return data;
    } catch (error: any) {
        console.log("Get waiting licenses error message: ", error.message);
    }
};
