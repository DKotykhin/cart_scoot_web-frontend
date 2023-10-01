import { create } from "zustand";

type FindCarFormDataStore = {
    findCarFormData: IFindCarFormData;
    addFindCarFormData: (item: any) => void;
    setFindCarFormDataEmpty: () => void;
};

export interface IFindCarFormData {
    requestedTime?: string;
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
    };
}

export const useFormDataStore = create<FindCarFormDataStore>()((set) => ({
    findCarFormData: {
        requestedTime: undefined,
        locationData: undefined,
    },
    addFindCarFormData: (newData: IFindCarFormData) =>
        set(() => ({
            findCarFormData: newData,
        })),

    setFindCarFormDataEmpty: () =>
        set(() => ({
            findCarFormData: {
                requestedTime: undefined,
                locationData: undefined,
            },
        })),
}));
