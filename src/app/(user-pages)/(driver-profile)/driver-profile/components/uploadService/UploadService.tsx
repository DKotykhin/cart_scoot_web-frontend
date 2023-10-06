"use client";

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Image from "next/image";

import ModalCard from 'components/modalCard/ModalCard';
import { uploadImages } from 'apollo/services/uploadImages';
import { useUserStore } from 'stores/userStore';
import { IUser, licenseStatusTypes } from 'types/userTypes';

import styles from './uploadService.module.scss';

let fileArray: any[] = [];

const UploadService: React.FC<{ user?: IUser }> = ({ user }) => {

    const [selfieFile, setSelfieFile] = useState({
        fileName: "",
        fileSize: 0,
        warning: false,
    });
    const [insuranceFile, setInsuranceFile] = useState({
        fileName: "",
        fileSize: 0,
        warning: false,
    });
    const [golfCartFile, setGolfCartFile] = useState({
        fileName: "",
        fileSize: 0,
        warning: false,
    });
    const [openModalCard, setOpenModalCard] = useState(false);

    const { addUser } = useUserStore();

    const onChangeSelfie = async (e: any) => {
        // console.log(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            setSelfieFile({ warning: true, fileName: "", fileSize: 0 });
            toast.warn('File is too big', {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else {
            setSelfieFile({ fileName: e.target.files[0].name, fileSize: e.target.files[0].size, warning: false });
            fileArray.push(e.target.files[0]);
        }
    };
    const onChangeInsurance = async (e: any) => {
        // console.log(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            setInsuranceFile({ warning: true, fileName: "", fileSize: 0 });
            toast.warn('File is too big', {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else {
            setInsuranceFile({ fileName: e.target.files[0].name, fileSize: e.target.files[0].size, warning: false });
            fileArray.push(e.target.files[0]);
        }
    };
    const onChangeGolfCard = async (e: any) => {
        // console.log(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            setGolfCartFile({ warning: true, fileName: "", fileSize: 0 });
            toast.warn('File is too big', {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else {
            setGolfCartFile({ fileName: e.target.files[0].name, fileSize: e.target.files[0].size, warning: false });
            fileArray.push(e.target.files[0]);
        }
    };

    const completeProfileClick = async () => {
        if (fileArray.length < 3) {
            toast.warn('Please, load all documents', {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else if (user?.license.status === licenseStatusTypes.waiting) {
            setOpenModalCard(true);
        } else {
            const formData = new FormData();
            for (const file of fileArray) {
                formData.append("license", file, file.name);
            }
            const newUser = await uploadImages(formData);
            if (newUser) {
                addUser(newUser);
                toast.success('Files has been uploaded successfully', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
            } else {
                toast.warn('Please, load all documents again', {
                    bodyClassName: "wrong-toast",
                    icon: <Image
                        src={'/icons/wrong-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
            }
        }
    };

    const confirmClick = async () => {
        const formData = new FormData();
        for (const file of fileArray) {
            formData.append("license", file, file.name);
        }
        const newUser = await uploadImages(formData);
        if (newUser) {
            addUser(newUser);
            toast.success('Files has been uploaded successfully', {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else {
            toast.warn('Please, load all documents again', {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        }
    };

    return (
        <>
            <div className={styles.upload_service}>
                <div className={styles.card_wrapper}>
                    <div className={selfieFile.warning ?
                        `${styles.upload_card} ${styles.upload_card_warning}`
                        : user?.license.url.length ?
                            `${styles.upload_card} ${styles.upload_card_success}`
                            : `${styles.upload_card}`}
                    >
                        <label htmlFor='selfie' onChange={onChangeSelfie}>
                            <Image
                                src={"/icons/file-arrow-up.svg"}
                                alt={'upload'}
                                width={20}
                                height={20}
                                className={styles.icon_upload}
                            />
                            <p>{(selfieFile?.fileName || user?.license.url.length) ? 'Change file' : 'Upload File'}</p>
                            <input type="file" id="selfie" name="selfie" accept="image/*" hidden />
                        </label>
                        <p className={selfieFile.warning ? `${styles.upload_card_title} ${styles.upload_card_title_warning}` : `${styles.upload_card_title}`}>Selfie with License</p>
                        {selfieFile?.warning ?
                            <p className={styles.uploaded_card_subtitle_warning}>File is too big</p>
                            :
                            selfieFile?.fileName ?
                                <>
                                    <p className={styles.upload_card_subtitle}>{selfieFile?.fileName}</p>
                                    <p className={styles.upload_card_text}>{`${Math.round((selfieFile.fileSize / 1024 / 1024) * 100) / 100} Mb`}</p>
                                </>
                                :
                                user?.license.url.length && user?.license.status !== licenseStatusTypes.rejected
                                    ?
                                    <p className={styles.uploaded_card_subtitle}>Selfie uploaded</p>
                                    :
                                    <>
                                        <p className={styles.upload_card_subtitle}>Drag & Drop or choose a file to upload</p>
                                        <p className={styles.upload_card_text}>PNG or JPEG, Maximum 2 MB</p>
                                    </>
                        }
                    </div>
                    <div className={insuranceFile.warning ?
                        `${styles.upload_card} ${styles.upload_card_warning}`
                        : user?.license.url.length ?
                            `${styles.upload_card} ${styles.upload_card_success}`
                            : `${styles.upload_card}`}
                    >
                        <label htmlFor='insurance' onChange={onChangeInsurance}>
                            <Image
                                src={"/icons/file-arrow-up.svg"}
                                alt={'upload'}
                                width={20}
                                height={20}
                                className={styles.icon_upload}
                            />
                            <p>{(insuranceFile?.fileName || user?.license.url.length) ? 'Change file' : 'Upload File'}</p>
                            <input type="file" id="insurance" name="insurance" accept="image/*" hidden />
                        </label>
                        <p className={insuranceFile.warning ? `${styles.upload_card_title} ${styles.upload_card_title_warning}` : `${styles.upload_card_title}`}>Insurance Photo</p>
                        {insuranceFile?.warning ?
                            <p className={styles.uploaded_card_subtitle_warning}>File is too big</p>
                            :
                            insuranceFile?.fileName ?
                                <>
                                    <p className={styles.upload_card_subtitle}>{insuranceFile?.fileName}</p>
                                    <p className={styles.upload_card_text}>{`${Math.round((insuranceFile.fileSize / 1024 / 1024) * 100) / 100} Mb`}</p>
                                </>
                                :
                                user?.license.url.length && user?.license.status !== licenseStatusTypes.rejected
                                    ?
                                    <p className={styles.uploaded_card_subtitle}>Insurance uploaded</p>
                                    :
                                    <>
                                        <p className={styles.upload_card_subtitle}>Drag & Drop or choose a file to upload</p>
                                        <p className={styles.upload_card_text}>PNG or JPEG, Maximum 2 MB</p>
                                    </>
                        }
                    </div>
                    <div className={golfCartFile.warning ?
                        `${styles.upload_card} ${styles.upload_card_warning}`
                        : user?.license.url.length ?
                            `${styles.upload_card} ${styles.upload_card_success}`
                            : `${styles.upload_card}`}
                    >
                        <label htmlFor='golfCart' onChange={onChangeGolfCard}>
                            <Image
                                src={"/icons/file-arrow-up.svg"}
                                alt={'upload'}
                                width={20}
                                height={20}
                                className={styles.icon_upload}
                            />
                            <p>{(golfCartFile?.fileName || user?.license.url.length) ? 'Change file' : 'Upload File'}</p>
                            <input type="file" id="golfCart" name="golfCart" accept="image/*" hidden />
                        </label>
                        <p className={golfCartFile.warning ? `${styles.upload_card_title} ${styles.upload_card_title_warning}` : `${styles.upload_card_title}`}>Golf Cart Photo</p>
                        {golfCartFile?.warning ?
                            <p className={styles.uploaded_card_subtitle_warning}>File is too big</p>
                            :
                            golfCartFile?.fileName ?
                                <>
                                    <p className={styles.upload_card_subtitle}>{golfCartFile?.fileName}</p>
                                    <p className={styles.upload_card_text}>{`${Math.round((golfCartFile.fileSize / 1024 / 1024) * 100) / 100} Mb`}</p>
                                </>
                                :
                                user?.license.url.length && user?.license.status !== licenseStatusTypes.rejected
                                    ?
                                    <p className={styles.uploaded_card_subtitle}>Golf Cart uploaded</p>
                                    :
                                    <>
                                        <p className={styles.upload_card_subtitle}>Drag & Drop or choose a file to upload</p>
                                        <p className={styles.upload_card_text}>PNG or JPEG, Maximum 2 MB</p>
                                    </>
                        }
                    </div>
                </div>
                <button className={styles.upload_button} onClick={completeProfileClick}>
                    Complete Profile
                </button>
            </div>
            {openModalCard &&
                <ModalCard
                    title='Save Changes'
                    subtitle='Are you sure to save change and update your docs? it may will takes 24 hrs to verify your new documents'
                    button_1='Cancel'
                    button_2='Save'
                    imageURL='/avatars/warningAvatar.svg'
                    greenButton={true}
                    cancelClick={() => setOpenModalCard(false)}
                    confirmClick={confirmClick}
                />
            }
        </>
    );
};

export default UploadService;