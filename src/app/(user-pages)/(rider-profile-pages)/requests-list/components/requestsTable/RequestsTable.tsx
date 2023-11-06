import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { format } from "date-fns";

import RequestStatusBox from 'components/requestStatusBox/RequestStatusBox';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import { IRequestWithDriverPopulatedFields } from 'types/requestTypes';

import styles from './requestsTable.module.scss';

interface IRequestsTable {
    requestData: [IRequestWithDriverPopulatedFields];
}

const RequestsTable: React.FC<IRequestsTable> = ({ requestData }) => {

    const router = useRouter();
    const handleClick = (_id: string) => router.push(`/requests-list/${_id}`);

    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th><div>#</div></th>
                    <th><div>Request Code</div></th>
                    <th><div>Driver</div></th>
                    <th><div>Pickup Location</div></th>
                    <th><div>Dropoff Location</div></th>
                    <th><div>Req Date & Time</div></th>
                    <th><div>Status</div></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {requestData.map((item: IRequestWithDriverPopulatedFields, i: number) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td><div>{item.requestCode}</div></td>
                        <td>
                            <DriverAvatar
                                driverAvatarURL={item.driverId?.avatarURL}
                                driverName={item.driverId?.userName}
                            />
                        </td>
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

export default RequestsTable;