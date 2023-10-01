"use client";

import React from 'react';

import Image from "next/image";

import styles from './loadMore.module.scss';

const LoadMore: React.FC<{ loadMoreClick: () => void }> = ({ loadMoreClick }) => {
    return (
        <button className={styles.find_button} onClick={loadMoreClick}>
            Load More
            <Image
                src={'/icons/caretDown-green.svg'}
                alt={'caret'}
                width={24}
                height={24}
            />
        </button>
    );
};

export default LoadMore;