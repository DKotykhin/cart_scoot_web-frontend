import React, { useState } from 'react';

import Image from "next/image";

import LocationCard from '../../../components/locationCard/LocationCard';
import RequestDetailsCard from '../requestDetailsCard/RequestDetailsCard';

import { IRequestWithRiderPopulatedFields } from 'types/requestTypes';

import styles from './requestList.module.scss';
import EmptyList from 'components/emptyList/EmptyList';

interface IRequestList {
    requests?: [IRequestWithRiderPopulatedFields];
    markerCoordinates: (arg?: ICoordinates) => void;
}

export interface ICoordinates {
    start: {
        lat: number;
        lon: number;
    };
    end: {
        lat: number;
        lon: number;
    };
}

const RequestList: React.FC<IRequestList> = ({ requests, markerCoordinates }) => {

    const [showRequestDetails, setShowRequestDetails] = useState(false);
    const [requestDetailsData, setRequestDetailsData] = useState<IRequestWithRiderPopulatedFields>();

    const openLocationClick = (_id: string) => {
        setShowRequestDetails(true);
        const request = requests?.find(item => item._id === _id);
        setRequestDetailsData(request);
        markerCoordinates(request?.coordinates);
    };

    const closeDetailsCard = () => {
        setShowRequestDetails(false);
        markerCoordinates(undefined);
    };

    return (
        <div className={styles.request_list}>
            {requests?.length ?
                showRequestDetails ?
                    <RequestDetailsCard
                        closeDetailsCard={closeDetailsCard}
                        requestDetailsData={requestDetailsData}
                    />
                    :
                    <>
                        <p className={styles.request_list_title}>Requests List</p>
                        {requests?.map(request => (
                            <div
                                key={request._id}
                                className={styles.request_card_wrapper}
                                onClick={() => openLocationClick(request._id)}
                            >
                                <LocationCard
                                    pickupLocation={request?.pickupLocation}
                                    dropoffLocation={request?.dropoffLocation}
                                />
                            </div>
                        ))}
                    </>
                :
                <EmptyList
                    title='Request List is Empty!'
                    subtitle='You didn&apos;t get any request yet.'
                />
            }
        </div>
    );
};

export default RequestList;