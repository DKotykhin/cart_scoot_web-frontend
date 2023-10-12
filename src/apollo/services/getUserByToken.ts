import { redirect } from "next/navigation";

import { GET_USER_BY_TOKEN } from "apollo/queries/user";
import { getClient } from "apollo/getClient";

import { IUser } from "types/userTypes";

interface IGetUserByToken {
    getUserByToken: IUser;
}

export const getUserByToken = async (): Promise<IGetUserByToken | undefined> => {
    try {
        const { data } = await getClient().query({
            query: GET_USER_BY_TOKEN, 
        });
        return data;
    } catch (error: any) {
        console.log("Layout error message: ", error.message);
    }
};

export const getUserByTokenRedirect = async (url: string): Promise<IGetUserByToken | undefined> => {
    try {
        const { data } = await getClient().query({
            query: GET_USER_BY_TOKEN,
        });

        return data;
    } catch (error: any) {
        console.log("Redirect error message: ", error.message);
        redirect(url);
    }
};
