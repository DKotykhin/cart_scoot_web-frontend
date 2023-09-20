export enum userTypes {
    "rider" = "RIDER",
    "driver" = "DRIVER",
    "admin" = "ADMIN",
    "subadmin" = "SUBADMIN",
    "banned" = "BANNED",
}

export enum licenseStatusTypes {
    "pending" = "PENDING",
    "waiting" = "WAITING",
    "approved" = "APPROVED",
    "rejected" = "REJECTED",
}

export interface IUserLogin {
    role: userTypes;
    email: string;
    password: string;
}

export interface IUserRegister extends IUserLogin {
    userName: string;
    confirmPassword: string;
}

export interface IUser {
    _id: string;
    createdAt: string;
    userName: string;
    email: string;
    avatarURL: string;
    license: {
        url: [string];
        message: string;
        status: licenseStatusTypes;
    };
    role: userTypes;
    driverRequests: [string];
    workingDays: [number];
    workingTime: {
        from: number;
        to: number;
    };
    phone: {
        number: string;
        confirmed: boolean;
    };
    coordinates: {
        lat: number;
        lon: number;
    };
}

export interface IUserWithToken {
    user: IUser;
    token: string;
    message: string;
}

export interface IPasswordResponse {
    status: boolean;
    message: string;
}

export interface IDriver {
    _id: string;
    userName: string;
    avatarURL: string;
    phone: {
        number: string;
        confirmed: boolean;
    };
    workingDays: [number];
    workingTime: {
        from: number;
        to: number;
    };
    coordinates: {
        lat: number;
        lon: number;
    };
}

export interface IDriverWithRating {
    driver: IDriver;
    rating: number;
}
