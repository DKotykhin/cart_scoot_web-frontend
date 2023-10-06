import React from 'react';

import Image from "next/image";

import styles from './uploadGuide.module.scss';

const UploadGuide = () => {
    return (
        <div className={styles.upload_box}>
            <div className={styles.upload_card}>
                <p className={styles.upload_title}>
                    How to Upload Insurance photo
                </p>
                <p className={styles.upload_subtitle}>
                    Please upload the insurance photo according to the samples
                </p>
                <div className={styles.image_box}>
                    <Image
                        src={'/documents/insurance-correct-big.png'}
                        alt={'insurance'}
                        width={210}
                        height={96}
                        priority
                        className={styles.image_image}
                    />
                    <Image
                        src={'/documents/insurance-wrong-big.png'}
                        alt={'insurance'}
                        width={210}
                        height={96}
                        priority
                        className={styles.image_image}
                    />
                </div>
                <div className={styles.explain_box}>
                    <p>Correct</p>
                    <p>Wrong</p>
                </div>

            </div>
            <div className={styles.upload_card}>
                <p className={styles.upload_title}>
                    How to Upload selfie photo
                </p>
                <p className={styles.upload_subtitle}>
                    Please upload the selfie according to the samples
                </p>
                <div className={styles.image_box}>
                    <Image
                        src={'/documents/selfie-correct.png'}
                        alt={'selfie'}
                        width={132}
                        height={96}
                        priority
                        className={styles.image_selfie}
                    />
                    <Image
                        src={'/documents/selfie-wrong.png'}
                        alt={'selfie'}
                        width={132}
                        height={96}
                        priority
                        className={styles.image_selfie}
                    />
                    <Image
                        src={'/documents/selfie-wrong-blur.png'}
                        alt={'selfie'}
                        width={132}
                        height={96}
                        priority
                        className={styles.image_selfie}
                    />
                </div>
                <div className={styles.explain_box}>
                    <p>Correct</p>
                    <p>Wrong</p>
                    <p>Wrong</p>
                </div>
            </div>
        </div>
    );
};

export default UploadGuide;