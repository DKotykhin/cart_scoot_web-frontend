import React from 'react';

import { licenseStatusTypes } from 'types/userTypes';

import styles from './licenseStatusBox.module.scss';

const LicenseStatusBox: React.FC<{ status?: licenseStatusTypes }> = ({ status = licenseStatusTypes.pending }) => {

    return (
        <div className={styles.license_box}>
            {(status === licenseStatusTypes.approved) ?
                <p className={styles.approved}>
                    Verified
                </p>
                : (status === licenseStatusTypes.waiting) ?
                    <p className={styles.waiting}>
                        Waiting
                    </p>
                    : (status === licenseStatusTypes.rejected) ?
                        <p className={styles.rejected}>
                            Invalid Docs
                        </p>
                        :
                        <p className={styles.pending}>
                            Unverified
                        </p>
            }
        </div>
    );
};

export default LicenseStatusBox;