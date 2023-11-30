import { create } from 'zustand';

type FindCarFormDataStore = {
    findCarFormData: IFindCarFormData;
    addFindCarFormData: (item: any) => void;
    setFindCarFormDataEmpty: () => void;
};

export interface IFindCarFormData {
    requestedTime?: string;
    pickupDate?: Date;
    pickupTime?: Date;
    carType: number;
    locationData?: {
        pickup: {
            address: string;
            lat: number;
            lon: number;
        };
        dropoff: {
            address: string;
            lat: number;
            lon: number;
        };
        distance: number;
        duration: number;
    };
}

export const useFormDataStore = create<FindCarFormDataStore>()((set) => ({
    findCarFormData: {
        requestedTime: undefined,
        pickupDate: undefined,
        pickupTime: undefined,
        locationData: undefined,
        carType: 4,
    },
    addFindCarFormData: (newData: IFindCarFormData) =>
        set(() => ({
            findCarFormData: newData,
        })),

    setFindCarFormDataEmpty: () =>
        set(() => ({
            findCarFormData: {
                requestedTime: undefined,
                pickupDate: undefined,
                pickupTime: undefined,
                locationData: undefined,
                carType: 4,
            },
        })),
}));
