"use client";

import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import RequestStatusBox from 'components/requestStatusBox/RequestStatusBox';
import { IRequestWithRiderPopulatedFields } from 'types/requestTypes';

import styles from './tripsTable.module.scss';

interface ITripsTable {
    trips: IRequestWithRiderPopulatedFields[];
}

const TripsTable: React.FC<ITripsTable> = ({ trips }) => {

    const router = useRouter();
    const handleClick = (_id: string) => router.push(`/driver-trips/${_id}`);

    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th><div>#</div></th>
                    <th><div>Request Code</div></th>
                    <th><div>Pickup Location</div></th>
                    <th><div>Dropoff Location</div></th>
                    <th><div>Req Date & Time</div></th>
                    <th><div>Status</div></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {trips.map((item: IRequestWithRiderPopulatedFields, i: number) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td><div>{item.requestCode}</div></td>
                        <td><div>{item.pickupLocation}</div></td>
                        <td><div>{item.dropoffLocation}</div></td>
                        <td><div>{format(new Date(item.requestedTime), "d LLL h:mm a")}</div></td>
                        <td><RequestStatusBox status={item.status} /></td>
                        <td className={styles.image_box} onClick={() => handleClick(item._id)}>
                            <Image
                                src={'/icons/caretRight-grey.svg'}
                                alt={'caret'}
                                width={20}
                                height={20}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TripsTable;