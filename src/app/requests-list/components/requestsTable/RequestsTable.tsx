"use client";

import React from 'react';

import Image from "next/image";
import { format } from "date-fns";
import { useQuery } from '@apollo/client';
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_ALL_REQUESTS, GET_NOT_FINISHED_REQUESTS } from 'apollo/queries/request';

import styles from './requestsTable.module.scss';
import { getClient } from 'apollo/getClient';

const mockData = [
    {
        code: '395-9823',
        avatar: '/avatars/Sarah.svg',
        driver: 'Cody Fisher',
        pickup: '4140 Parker Rd Parker Rd Parker Rd',
        dropoff: '2715 Ash Dr.San 2715 Ash Dr.San',
        date: new Date('August 19, 1975 23:15:30 UTC').toJSON(),
        status: 'FINISHED',
        button: 'Button',
    },
    {
        code: '398-5783',
        avatar: '',
        driver: 'Robert Fox Robert Fox',
        pickup: '3517 W. Gray Street',
        dropoff: '2972 Westerner Street Westerner Street',
        date: new Date('December 1, 2023 23:15:30 UTC').toJSON(),
        status: 'PENDING',
        button: 'Button',
    },
    {
        code: '395-9823',
        avatar: '/avatars/Sarah.svg',
        driver: 'Cody Fisher',
        pickup: '4140 Parker Rd Parker Rd Parker Rd',
        dropoff: '2715 Ash Dr.San 2715 Ash Dr.San',
        date: new Date('August 29, 1975 7:15:30 UTC').toJSON(),
        status: 'ACTIVE',
        button: 'Button',
    },
    {
        code: '398-5783',
        avatar: '/avatars/Sarah.svg',
        driver: 'Robert Fox',
        pickup: '3517 W. Gray Street',
        dropoff: '2972 Westerner Street Westerner Street',
        date: new Date('March 11, 2023 11:01:30 UTC').toJSON(),
        status: 'APPROVED',
        button: 'Button',
    },
    {
        code: '395-9823',
        avatar: '/avatars/Sarah.svg',
        driver: 'Cody Fisher',
        pickup: '4140 Parker Rd Parker Rd Parker Rd',
        dropoff: '2715 Ash Dr.San 2715 Ash Dr.San',
        date: new Date('August 29, 1975 7:15:30 UTC').toJSON(),
        status: 'REJECTED',
        button: 'Button',
    },
    {
        code: '398-5783',
        avatar: '/avatars/Sarah.svg',
        driver: 'Robert Fox',
        pickup: '3517 W. Gray Street',
        dropoff: '2972 Westerner Street Westerner Street',
        date: new Date('March 11, 2023 11:01:30 UTC').toJSON(),
        status: 'APPROVED',
        button: 'Button',
    },
];

const avatarLetters = (name: string) => {
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
        const letters = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        return letters.toUpperCase();
    } else return nameArray[0].charAt(0).toUpperCase();
};

const RequestsTable = () => {

    const { data, error } = useQuery(GET_NOT_FINISHED_REQUESTS, {
        onCompleted: (data) => {            
            console.log(data);            
        },
        onError: (err) => {
            console.log(err.message);
        }
    });
    // const { data, error } = useSuspenseQuery(GET_NOT_FINISHED_REQUESTS);
    // const { data, error } = await getClient().query({ query: GET_NOT_FINISHED_REQUESTS });
    data && console.log(data);
    error && console.log(error);

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
                {mockData.map((item, i) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td><div>{item.code}</div></td>
                        <td>
                            <div className={styles.driver_box}>
                                {item.avatar ?
                                    <Image
                                        src={item.avatar}
                                        alt={'avatar'}
                                        width={48}
                                        height={48}
                                    />
                                    :
                                    <div className={styles.empty_avatar}>
                                        {avatarLetters(item.driver || 'C S')}
                                    </div>
                                }
                                <span className={styles.driver_name}>{item.driver}</span>
                            </div>
                        </td>
                        <td><div>{item.pickup}</div></td>
                        <td><div>{item.dropoff}</div></td>
                        <td><div>{format(new Date(item.date), "d LLL H:mm")}</div></td>
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