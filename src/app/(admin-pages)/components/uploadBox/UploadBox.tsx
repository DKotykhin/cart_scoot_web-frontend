import React from 'react';

import Image from "next/image";
import { uploadBanner } from 'apollo/services/uploadBanner';

import styles from './uploadBox.module.scss';

interface IUploadBox {
    imageURL?: string,
    imageName?: string,
    setImageFile: (arg0: { bannerURL: string, fileName: string }) => void;
    title?: string;
}

const UploadBox: React.FC<IUploadBox> = ({ imageURL = '', imageName = '', setImageFile, title = '' }) => {

    const onChangeBanner = async (e: any) => {
        const formData = new FormData();
        formData.append("banner", e.target.files[0], e.target.files[0].name);
        const bannerURL = await uploadBanner(formData);
        setImageFile({ bannerURL, fileName: e.target.files[0].name });
    };

    return (
        <div className={styles.upload_box_container}>
            <label htmlFor={title} onChange={onChangeBanner}>
                <Image
                    src={"/icons/file-arrow-up.svg"}
                    alt={'upload'}
                    width={20}
                    height={20}
                />
                <p>{imageURL ? 'Change file' : 'Upload File'}</p>
                <input type="file" id={title} name={title} accept="image/*" hidden />
            </label>
            <div className={styles.text_box}>
                <p className={styles.upload_box_title}>
                    {imageName ? `Uploaded for ${title}` : `${title} Banner`}
                </p>
                <p className={styles.upload_box_subtitle}>
                    {imageName ? imageName : 'Choose a file to upload'}
                </p>
                <p className={styles.upload_box_text}>
                    {imageName ? '' : 'PNG or JPEG, Maximum 2 MB'}
                </p>
            </div>
            {imageURL ?
                <div className={styles.background_box}>
                    <Image
                        src={imageURL}
                        alt={'upload'}
                        width={320}
                        height={194}
                        className={styles.background_image}
                    />
                </div>
                : null
            }
        </div>
    );
};

export default UploadBox;