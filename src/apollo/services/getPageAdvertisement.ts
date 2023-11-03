import { getClient } from "apollo/getClient";
import { GET_PAGE_ADVERTISEMENT } from "apollo/queries/user";

import { IAdvertisement } from "types/advertisementTypes";

interface IGetPageAdvertisement {
    getPageAdvertisement: IAdvertisement;
}

export const getPageAdvertisement = async (
    position: string
): Promise<IGetPageAdvertisement | undefined> => {
    try {
        const { data } = await getClient().query({
            query: GET_PAGE_ADVERTISEMENT,
            variables: {
                position,
            },
            fetchPolicy: "no-cache",
        });
        return data;
    } catch (error: any) {
        console.log("Get page advertisement error message: ", error.message);
    }
};
