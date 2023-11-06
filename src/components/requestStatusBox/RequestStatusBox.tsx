import React from 'react';
import { statusTypes } from 'types/requestTypes';

import styles from './requestStatusBox.module.scss';

interface IRequestStatusBox {
    status?: statusTypes;
    bigSize?: boolean;
}

const RequestStatusBox: React.FC<IRequestStatusBox> = ({ status = statusTypes.pending, bigSize = false }) => {
    return (
        <div className={styles.status_box}>
            <div className={status === statusTypes.pending ? styles.status_pending
                : status === statusTypes.rejected ? styles.status_rejected
                    : status === statusTypes.active ? styles.status_active
                        : status === statusTypes.approved ? styles.status_approved
                            : styles.status_finished
            } style={bigSize ? { height: '48px' } : { height: '40px' }}>
                <span>{status.charAt(0) + status.slice(1).toLowerCase()}</span>
            </div>
        </div>
    );
};

export default RequestStatusBox;