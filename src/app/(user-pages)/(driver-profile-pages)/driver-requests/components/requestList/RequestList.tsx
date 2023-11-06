import React, { useState } from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_PENDING_REQUESTS_BY_DRIVER } from 'apollo/queries/request';

import LocationCard from '../../../components/locationCard/LocationCard';
import RequestDetailsCard from '../requestDetailsCard/RequestDetailsCard';
import EmptyList from 'components/emptyList/EmptyList';

import { IRequestWithRiderPopulatedFields } from 'types/requestTypes';

import styles from './requestList.module.scss';

interface IRequestList {
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

const RequestList: React.FC<IRequestList> = ({ markerCoordinates }) => {

    const [showRequestDetails, setShowRequestDetails] = useState(false);
    const [requestDetailsData, setRequestDetailsData] = useState<IRequestWithRiderPopulatedFields>();

    const { data }: { data: { getPendingRequestsByDriver: [IRequestWithRiderPopulatedFields] } } = useSuspenseQuery(GET_PENDING_REQUESTS_BY_DRIVER);

    const openLocationClick = (_id: string) => {
        setShowRequestDetails(true);
        const request = data?.getPendingRequestsByDriver?.find(item => item._id === _id);
        setRequestDetailsData(request);
        markerCoordinates(request?.coordinates);
    };

    const closeDetailsCard = () => {
        setShowRequestDetails(false);
        markerCoordinates(undefined);
    };

    return (
        <div className={styles.request_list}>
            {data?.getPendingRequestsByDriver?.length ?
                showRequestDetails ?
                    <RequestDetailsCard
                        closeDetailsCard={closeDetailsCard}
                        requestDetailsData={requestDetailsData}
                    />
                    :
                    <>
                        <p className={styles.request_list_title}>Requests List</p>
                        {data?.getPendingRequestsByDriver?.map(request => (
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