"use client";

import React from 'react';
import { format } from 'date-fns';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import StarsArray from 'components/starsArray/StarsArray';

import { IReview } from 'types/reviewTypes';

import styles from './reviewTable.module.scss';

const ReviewTable: React.FC<{ reviews?: IReview[] }> = ({ reviews }) => {

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
                {reviews?.map((item: IReview, i: number) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td><div>{item.requestCode}</div></td>
                        <td>
                            <DriverAvatar
                                driverAvatarURL={item.createdBy?.avatarURL}
                                driverName={item.createdBy?.userName}
                            />
                        </td>
                        <td><div className={styles.comment_text}>{item.text}</div></td>
                        <td><div>{format(new Date(item.createdAt), "d LLL h:mm a")}</div></td>
                        <td>
                            <StarsArray rating={item?.rating} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReviewTable;