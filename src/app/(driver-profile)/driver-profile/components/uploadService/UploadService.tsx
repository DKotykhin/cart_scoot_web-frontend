"use client";

import React, { useState } from 'react';

import Image from "next/image";

import styles from './uploadService.module.scss';

const UploadService = () => {

    const [selfieFile, setSelfieFile] = useState();

    let formData = new FormData();

    const onChangeSelfie = async (e: any) => {
        console.log(e.target.files[0]);
        formData.append("license", e.target.files[0], e.target.files[0].name);
    };
    const onChangeLicense = async (e: any) => {
        console.log(e.target.files[0]);
        formData.append("license", e.target.files[0], e.target.files[0].name);
    };
    const onChangeGolfCard = async (e: any) => {
        console.log(e.target.files[0]);
        formData.append("license", e.target.files[0], e.target.files[0].name);
    };

    const completeProfileClick = () => console.log('completeProfileClick');

    return (
        <div className={styles.upload_service}>
            <div className={styles.card_wrapper}>
                <div className={styles.upload_card}>
                    <label htmlFor='license' onChange={onChangeSelfie}>
                        <Image
                            src={"/icons/file-arrow-up.svg"}
                            alt={'upload'}
                            width={20}
                            height={20}
                            className={styles.icon_upload}
                        />
                        <p>Upload File</p>
                        <input type="file" id="license" name="license" accept="image/*" hidden />
                    </label>
                    <p className={styles.upload_card_title}>Selfie with License</p>
                    <p className={styles.upload_card_subtitle}>Drag & Drop or choose a file to upload</p>
                    <p className={styles.upload_card_text}>PNG or JPEG, Maximum 2 MB</p>
                </div>
                <div className={styles.upload_card}>
                    <label htmlFor='license' onChange={onChangeLicense}>
                        <Image
                            src={"/icons/file-arrow-up.svg"}
                            alt={'upload'}
                            width={20}
                            height={20}
                            className={styles.icon_upload}
                        />
                        <p>Upload File</p>
                        <input type="file" id="license" name="license" accept="image/*" hidden />
                    </label>
                    <p className={styles.upload_card_title}>Insurance Photo</p>
                    <p className={styles.upload_card_subtitle}>Drag & Drop or choose a file to upload</p>
                    <p className={styles.upload_card_text}>PNG or JPEG, Maximum 2 MB</p>
                </div>
                <div className={styles.upload_card}>
                    <label htmlFor='license' onChange={onChangeGolfCard}>
                        <Image
                            src={"/icons/file-arrow-up.svg"}
                            alt={'upload'}
                            width={20}
                            height={20}
                            className={styles.icon_upload}
                        />
                        <p>Upload File</p>
                        <input type="file" id="license" name="license" accept="image/*" hidden />
                    </label>
                    <p className={styles.upload_card_title}>Golf Cart Photo</p>
                    <p className={styles.upload_card_subtitle}>Drag & Drop or choose a file to upload</p>
                    <p className={styles.upload_card_text}>PNG or JPEG, Maximum 2 MB</p>
                </div>
            </div>
            <button className={styles.upload_button} onClick={completeProfileClick}>
                Complete Profile
            </button>
        </div>
    );
};

export default UploadService;