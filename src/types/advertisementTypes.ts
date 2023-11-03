export enum PageTypes {
    "main" = "MAIN",
    "map" = "MAP",
    "trip" = "TRIP",
}

export interface IAdvertisement {
    _id: string;
    createdAt: string;
    title: string;
    description: string;
    imageURL: string;
    link: string;
    from: string;
    to: string;
    position: PageTypes;
}
