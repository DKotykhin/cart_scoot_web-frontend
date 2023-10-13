import { getClient } from "apollo/getClient";
import { GET_DRIVER_WITH_RATING } from "apollo/queries/admin";

import { IUser } from "types/userTypes";

interface IGetUserById {
    getDriverWithRating: {
        driver: IUser,
        rating: number,
        totalCount: number,
    };
}

export const getDriverWithRating = async (
    driverId: string
): Promise<IGetUserById | undefined> => {
    try {
        const { data } = await getClient().query({
            query: GET_DRIVER_WITH_RATING,
            fetchPolicy: "no-cache",
            variables: {
                driverId,
            },
        });
        return data;
    } catch (error: any) {
        console.log("Get driver with rating error message: ", error.message);
    }
};
