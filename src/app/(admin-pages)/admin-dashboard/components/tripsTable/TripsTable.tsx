"use client";

import React, { useState } from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_REQUESTS } from 'apollo/queries/admin';

import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import { IRequest, statusTypes } from 'types/requestTypes';

import styles from './tripsTable.module.scss';

const itemsOnPage = 4; 

const TripsTable = () => {

    const [page, setPage] = useState(1);

    const { data }: { data: { getAllRequests: { requests: [IRequest]; totalCount: number } } } = useSuspenseQuery(GET_ALL_REQUESTS,
        {
            variables: {
                pageNumber: page,
                itemsOnPage,
            }
        });

    const router = useRouter();
    const handleClick = (_id: string) => router.push(`/driver-trips/${_id}`);

    const loadMoreClick = () => setPage(page + 1);

    return (
        <>
            <table className={styles.container}>
                <thead>
                    <tr>
                        <th><div>Code</div></th>
                        <th><div>Pickup Location</div></th>
                        <th><div>Dropoff Location</div></th>
                        <th><div>Status</div></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.getAllRequests.requests?.map((item: IRequest, i: number) => (
                        <tr key={i}>
                            <td><div>{item.requestCode}</div></td>
                            <td><div>{item.pickupLocation}</div></td>
                            <td><div>{item.dropoffLocation}</div></td>
                            <td className={item.status === statusTypes.pending ? styles.status_pending
                                : item.status === statusTypes.rejected ? styles.status_rejected
                                    : item.status === statusTypes.active ? styles.status_active
                                        : item.status === statusTypes.approved ? styles.status_approved
                                            : styles.status_finished
                            }>
                                <span>{item.status.charAt(0) + item.status.slice(1).toLowerCase()}</span>
                            </td>
                            <td className={styles.image_box}>
                                <Image
                                    src={'/icons/caretRight-grey.svg'}
                                    alt={'caret'}
                                    width={20}
                                    height={20}
                                    onClick={() => handleClick(item._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.load_button_wrapper}>
                {(data?.getAllRequests.totalCount > itemsOnPage && data?.getAllRequests.totalCount !== data?.getAllRequests.requests.length) && <LoadMoreButton loadMoreClick={loadMoreClick} />}
            </div>
        </>
    );
};

export default TripsTable;