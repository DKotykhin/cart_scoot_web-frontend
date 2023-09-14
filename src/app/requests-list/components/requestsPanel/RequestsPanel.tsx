import React from 'react';

import Image from "next/image";

import SearchForm from '../searchForm/SearchForm';
import RequestsTable from '../requestsTable/RequestsTable';

import styles from './requestsPanel.module.scss';

const Table = () => {

    const data = true;

    return data ?
        <div className={styles.container}>
            <SearchForm />
            <RequestsTable />
            <button className={styles.find_button}>
                Load More
                <Image
                    src={'/icons/caretDown-green.svg'}
                    alt={'caret'}
                    width={24}
                    height={24}
                />
            </button>
        </div>
        :
        <div className={styles.empty_container}>
            <Image
                src={'/emptyList.svg'}
                alt={'empty'}
                width={196}
                height={192}
                className={styles.empty_image}
            />
            <h3 className={styles.title}>Trips List is Empty!</h3>
            <p className={styles.empty_p}>You didn&apos;t send a trip request yet. Get started by clicking on “Find a car” button</p>
            <button className={styles.empty_button}>Find a car</button>
        </div>;
};

export default Table;