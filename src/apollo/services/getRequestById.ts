import { getClient } from "apollo/getClient";
import { GET_REQUEST } from "apollo/queries/request";

import { IRequestWithAllUsersPopulatedFields } from "types/requestTypes";

interface IGetRequestById {
    getRequest: {
        request: IRequestWithAllUsersPopulatedFields;
        avgRating: number;
    };
}

export const getRequestById = async (
    requestId: string
): Promise<IGetRequestById | undefined> => {
    try {
        const { data } = await getClient().query({
            query: GET_REQUEST,
            variables: {
                id: requestId,
            },
            fetchPolicy: 'no-cache',
        });
        return data;
    } catch (error: any) {
        console.log("Get request by id error message: ", error.message);
    }
};
