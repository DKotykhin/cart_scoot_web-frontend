import React from 'react';

import Image from "next/image";
import { format } from "date-fns";

import { IRequestWithPopulatedFields } from 'types/requestTypes';

import styles from './requestsTable.module.scss';

const mockData = [
    {
        requestCode: '395-9823',
        avatarURL: '/avatars/Sarah.svg',
        userName: 'Cody Fisher',
        pickupLocation: '4140 Parker Rd Parker Rd Parker Rd',
        dropoffLocation: '2715 Ash Dr.San 2715 Ash Dr.San',
        requestedTime: new Date('August 19, 1975 23:15:30 UTC').toJSON(),
        status: 'FINISHED',
    },
    {
        requestCode: '398-5783',
        avatarURL: '',
        userName: 'Robert Fox Robert Fox',
        pickupLocation: '3517 W. Gray Street',
        dropoffLocation: '2972 Westerner Street Westerner Street',
        requestedTime: new Date('December 1, 2023 23:15:30 UTC').toJSON(),
        status: 'PENDING',
    },
    {
        requestCode: '395-9823',
        avatarURL: '/avatars/Sarah.svg',
        userName: 'Cody Fisher',
        pickupLocation: '4140 Parker Rd Parker Rd Parker Rd',
        dropoffLocation: '2715 Ash Dr.San 2715 Ash Dr.San',
        requestedTime: new Date('August 29, 1975 7:15:30 UTC').toJSON(),
        status: 'ACTIVE',
    },
    {
        requestCode: '398-5783',
        avatarURL: '/avatars/Sarah.svg',
        userName: 'Robert Fox',
        pickupLocation: '3517 W. Gray Street',
        dropoffLocation: '2972 Westerner Street Westerner Street',
        requestedTime: new Date('March 11, 2023 11:01:30 UTC').toJSON(),
        status: 'APPROVED',
    },
    {
        requestCode: '395-9823',
        avatarURL: '/avatars/Sarah.svg',
        userName: 'Cody Fisher',
        pickupLocation: '4140 Parker Rd Parker Rd Parker Rd',
        dropoffLocation: '2715 Ash Dr.San 2715 Ash Dr.San',
        requestedTime: new Date('August 29, 1975 7:15:30 UTC').toJSON(),
        status: 'REJECTED',
    },
    {
        requestCode: '398-5783',
        avatarURL: '/avatars/Sarah.svg',
        userName: 'Robert Fox',
        pickupLocation: '3517 W. Gray Street',
        dropoffLocation: '2972 Westerner Street Westerner Street',
        requestedTime: new Date('March 11, 2023 11:01:30 UTC').toJSON(),
        status: 'APPROVED',
    },
];

const avatarLetters = (name: string) => {
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
        const letters = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        return letters.toUpperCase();
    } else return nameArray[0].charAt(0).toUpperCase();
};

interface IRequestsTable {
    requestData: [IRequestWithPopulatedFields];
}

const RequestsTable: React.FC<IRequestsTable> = ({ requestData }) => {

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
                {requestData.map((item: IRequestWithPopulatedFields, i: number) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td><div>{item.requestCode}</div></td>
                        <td>
                            <div className={styles.driver_box}>
                                {item.driverId.avatarURL ?
                                    <Image
                                        src={item.driverId.avatarURL}
                                        alt={'avatar'}
                                        width={48}
                                        height={48}
                                    />
                                    :
                                    <div className={styles.empty_avatar}>
                                        {avatarLetters(item.driverId.userName || 'C S')}
                                    </div>
                                }
                                <span className={styles.driver_name}>{item.driverId.userName}</span>
                            </div>
                        </td>
                        <td><div>{item.pickupLocation}</div></td>
                        <td><div>{item.dropoffLocation}</div></td>
                        <td><div>{format(new Date(item.requestedTime), "d LLL H:mm")}</div></td>
                        <td className={item.status === 'PENDING' ? styles.status_pending
                            : item.status === 'REJECTED' ? styles.status_rejected
                                : item.status === 'ACTIVE' ? styles.status_active
                                    : item.status === 'APPROVED' ? styles.status_approved
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
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RequestsTable;