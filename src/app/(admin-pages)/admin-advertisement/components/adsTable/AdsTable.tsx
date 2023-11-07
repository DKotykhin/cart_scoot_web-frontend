"use client";

import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import { IAdvertisement } from 'types/advertisementTypes';

import styles from './adsTable.module.scss';

const AdsTable: React.FC<{ ads: IAdvertisement[] }> = ({ ads }) => {

    const router = useRouter();
    const handleClick = (_id: string) => router.push(`/admin-advertisement/${_id}`);

    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th><div>#</div></th>
                    <th><div>Title</div></th>
                    <th><div>Position</div></th>
                    <th><div>Link</div></th>
                    <th><div>From</div></th>
                    <th><div>To</div></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {ads.map((item: IAdvertisement, i: number) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td><div>{item.title}</div></td>
                        <td><div>{item.position}</div></td>
                        <td><div><a href={item.link} target='_blank'>{item.link}</a></div></td>
                        <td><div>{format(new Date(item.from), "d LLL h:mm a")}</div></td>
                        <td><div>{format(new Date(item.to), "d LLL h:mm a")}</div></td>
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

export default AdsTable;