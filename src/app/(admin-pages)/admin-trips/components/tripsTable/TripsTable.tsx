"use client";

import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import { IRequest } from 'types/requestTypes';

import styles from './tripsTable.module.scss';

const TripsTable: React.FC<{ trips: [IRequest] }> = ({ trips }) => {

    const router = useRouter();
    const handleClick = (_id: string) => router.push(`/admin-trips/${_id}`);

    return (
        <div>TripsTable</div>
    );
};

export default TripsTable;