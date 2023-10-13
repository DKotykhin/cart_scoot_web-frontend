export interface IReview {
    _id: string;
    createdAt: string;
    createdBy: {
        _id: string;
        userName: string;
        avatarURL: string;
    };
    driverId: {
        _id: string;
        userName: string;
        avatarURL: string;
    };
    text: string;
    rating: number;
    requestCode: string;
}

export interface IReviewData {
    getReviewsByDriverId: {
        reviews: IReview[];
        totalCount: number;
    };
}
