import { getClient } from "apollo/getClient";

import { GET_STATISTIC } from "apollo/queries/admin";

export const getStatistic = async (): Promise<
    | {
          getStatistic: {
              totalDrivers: number;
              totalRiders: number;
              totalTrips: number;
          };
      }
    | undefined
> => {
    try {
        const { data } = await getClient().query({
            query: GET_STATISTIC,
        });
        return data;
    } catch (error: any) {
        console.log("Get statistic error message: ", error.message);
    }
};
