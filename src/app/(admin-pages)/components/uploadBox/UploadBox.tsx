import React, { useState } from 'react';

import Image from "next/image";
import { uploadBanner } from 'apollo/services/uploadBanner';

import styles from './uploadBox.module.scss';

interface IUploadBox {
    imageURL?: string,
    bannerFn: (arg0: string) => void;
}

const UploadBox: React.FC<IUploadBox> = ({ imageURL, bannerFn }) => {

    const [bannerFileName, setBannerFileName] = useState('');
    const [bannerFileURL, setBannerFileURL] = useState('');

    const onChangeBanner = async (e: any) => {
        setBannerFileName(e.target.files[0].name);
        const formData = new FormData();
        formData.append("banner", e.target.files[0], e.target.files[0].name);
        const bannerURL = await uploadBanner(formData);
        setBannerFileURL(bannerURL);
        bannerFn(bannerURL);
    };

    return (
        <div className={styles.upload_box_container}>
            <label htmlFor='banner' onChange={onChangeBanner}>
                <Image
                    src={"/icons/file-arrow-up.svg"}
                    alt={'upload'}
                    width={20}
                    height={20}
                />
                <p>{imageURL || bannerFileName ? 'Change file' : 'Upload File'}</p>
                <input type="file" id="banner" name="banner" accept="image/*" hidden />
            </label>
            <div className={styles.text_box}>
                <p className={styles.upload_box_title}>
                    {bannerFileName ? 'Banner Uploaded' : 'Banner Image'}
                </p>
                <p className={styles.upload_box_subtitle}>
                    {bannerFileName ? bannerFileName : 'Choose a file to upload'}
                </p>
                <p className={styles.upload_box_text}>
                    {bannerFileName ? '' : 'PNG or JPEG, Maximum 2 MB'}
                </p>
            </div>
            {bannerFileURL || imageURL ?
                <div className={styles.background_box}>
                    <Image
                        src={bannerFileURL || imageURL || ""}
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