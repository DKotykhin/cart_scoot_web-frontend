import React from 'react';

import styles from './titleWithAmount.module.scss';

interface ITitleWithAmount {
    title: string,
    amount?: number,
    hideAmount?: boolean,
}

const TitleWithAmount: React.FC<ITitleWithAmount> = ({ title, amount, hideAmount }) => {
    return (
        <div className={styles.title_box}>
            <h2 className={styles.title}>{title}</h2>
            {hideAmount ? null :
                <div className={styles.amount}>{amount || 0}</div>
            }
        </div>
    );
};

export default TitleWithAmount;