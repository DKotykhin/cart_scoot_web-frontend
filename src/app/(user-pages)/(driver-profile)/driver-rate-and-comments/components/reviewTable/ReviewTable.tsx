"use client";

import React from 'react';
import Image from "next/image";
import { format } from 'date-fns';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';

import { IReview } from 'types/reviewTypes';

import styles from './reviewTable.module.scss';

const starArray = [1, 2, 3, 4, 5];

const ReviewTable: React.FC<{ reviews?: [IReview] }> = ({ reviews }) => {

    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th><div>#</div></th>
                    <th><div>Request Code</div></th>
                    <th><div>Rider</div></th>
                    <th><div>Comment</div></th>
                    <th><div>Req Date & Time</div></th>
                    <th><div>Rate</div></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {reviews?.filter(item => Boolean(item.text)).map((item: IReview, i: number) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td><div>{item.requestCode}</div></td>
                        <td>
                            <DriverAvatar
                                driverAvatarURL={item.createdBy?.avatarURL}
                                driverName={item.createdBy?.userName}
                            />
                        </td>
                        <td><div>{item.text}</div></td>
                        <td><div>{format(new Date(item.createdAt), "d LLL H:mm")}</div></td>
                        <td>
                            <div className={styles.star_box}>
                                {starArray.map(star => (
                                    <div key={star}>
                                        {Math.round(item.rating) >= star ?
                                            <Image
                                                src={'/icons/star-green.svg'}
                                                alt={'star'}
                                                width={20}
                                                height={20}
                                            /> :
                                            <Image
                                                src={'/icons/star-empty.svg'}
                                                alt={'star'}
                                                width={20}
                                                height={20}
                                            />
                                        }
                                    </div>
                                ))}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReviewTable;