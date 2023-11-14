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
    link: string;
    from: string;
    to: string;
    position: PageTypes;
    imageURL: {
        desktop: string,
        tablet: string,
        mobile: string,
    };
}
