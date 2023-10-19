import { create } from "zustand";

import { IUser, licenseStatusTypes, userTypes } from "types/userTypes";

type UserStore = {
    userData: IUser;
    addUser: (item: IUser) => void;
    setUserEmpty: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
    userData: {
        _id: "",
        createdAt: "",
        banned: false,
        userName: "",
        email: "",
        avatarURL: "",
        license: {
            url: [""],
            message: "",
            status: licenseStatusTypes.pending,
        },
        role: userTypes.rider,
        driverRequests: [""],
        workingDays: [0],
        workingTime: {
            from: 0,
            to: 0,
        },
        phone: {
            number: "",
            confirmed: false,
        },
        coordinates: {
            lat: 0,
            lon: 0,
        },
    },
    addUser: (newUser: IUser) =>
        set(() => ({
            userData: newUser,
        })),

    setUserEmpty: () =>
        set(() => ({
            userData: {
                _id: "",
                banned: false,
                createdAt: "",
                userName: "",
                email: "",
                avatarURL: "",
                license: {
                    url: [""],
                    message: "",
                    status: licenseStatusTypes.pending,
                },
                role: userTypes.rider,
                driverRequests: [""],
                workingDays: [0],
                workingTime: {
                    from: 0,
                    to: 0,
                },
                phone: {
                    number: "",
                    confirmed: false,
                },
                coordinates: {
                    lat: 0,
                    lon: 0,
                },
            },
        })),
}));
