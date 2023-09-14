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
    userId: string;
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
    driverId: string;
}

export interface IRequestWithPopulatedFields extends IBaseRequest {
    driverId: {
        _id: string;
        userName: string;
        avatarURL: string;
    };
}
