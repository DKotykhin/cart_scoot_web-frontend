export enum statusTypes {
    "pending" = "PENDING",
    "active" = "ACTIVE",
    "approved" = "APPROVED",
    "rejected" = "REJECTED",
    "finished" = "FINISHED",
}

interface IBaseRequest {
    _id: string;
    createdAt: string;
    description: string;
    status: statusTypes;
    carType: number;
    requestedTime: string;
    coordinates: {
        start: {
            lat: number;
            lon: number;
        };
        end: {
            lat: number;
            lon: number;
        };
    };
    requestCode: string;
    pickupLocation: string;
    dropoffLocation: string;
}

export interface IRequest extends IBaseRequest {
    userId: string;
    driverId: string;
}

export interface IRequestWithDriverPopulatedFields extends IBaseRequest {
    userId: string;
    driverId: {
        _id: string;
        userName: string;
        avatarURL: string;
        phone: {
            confirmed: boolean;
            number: string;
        };
    };
}

export interface IRequestWithRiderPopulatedFields extends IBaseRequest {
    userId: {
        _id: string;
        userName: string;
        avatarURL: string;
        phone: {
            confirmed: boolean;
            number: string;
        };
        driverId: string;
    };
}

export interface IRequestWithAllUsersPopulatedFields extends IBaseRequest {
    userId: {
        _id: string;
        userName: string;
        avatarURL: string;
        phone: {
            confirmed: boolean;
            number: string;
        };
    };
    driverId: {
        _id: string;
        userName: string;
        avatarURL: string;
        phone: {
            confirmed: boolean;
            number: string;
        };
    };
}
export interface IRequestWithRating {
    request: IRequestWithAllUsersPopulatedFields;
    avgRating: number;
}
