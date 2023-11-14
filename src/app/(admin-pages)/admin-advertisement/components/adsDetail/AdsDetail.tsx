"use client";

import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { toast } from 'react-toastify';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ADVERTISEMENT_BY_ID } from 'apollo/queries/admin';
import { useMutation } from '@apollo/client';
import { UPDATE_ADVERTISEMENT } from 'apollo/mutations/admin';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';
import DatePickerInput from 'components/inputs/dateTimePickers/DatePickerInput';
import TextInput from 'app/(admin-pages)/components/textInput/TextInput';
import UploadBox from '../../../components/uploadBox/UploadBox';

import { IAdvertisement, PageTypes } from 'types/advertisementTypes';

import styles from './adsDetail.module.scss';

interface IAdsFormData {
    title: string;
    description: string;
    link: string;
    position: PageTypes;
    from: Date | string;
    to: Date | string;
}

const options = [
    // { value: null, label: '-- All --' },
    { value: PageTypes.main, label: 'MAIN' },
    { value: PageTypes.map, label: 'MAP' },
    { value: PageTypes.trip, label: 'TRIP' },
];

const stylesOptions = {
    control: (styles: any) => ({
        ...styles,
        borderRadius: '20px',
        height: '48px',
        minWidth: '180px',
        paddingLeft: '10px',
        cursor: 'pointer',
    }),
    option: (styles: any) => {
        return { ...styles };
    }

};

const AdsDetail: React.FC<{ _id: string }> = ({ _id }) => {

    const router = useRouter();

    const { data }: { data: { getAdvertisementById: IAdvertisement } } = useSuspenseQuery(GET_ADVERTISEMENT_BY_ID, {
        variables: {
            adsId: _id,
        }
    });

    const [desktopImage, setDesktopImage] = useState({
        bannerURL: data?.getAdvertisementById.imageURL?.desktop,
        fileName: '',
    });
    const [tabletImage, setTabletImage] = useState({
        bannerURL: data?.getAdvertisementById.imageURL?.tablet,
        fileName: '',
    });
    const [mobileImage, setMobileImage] = useState({
        bannerURL: data?.getAdvertisementById.imageURL?.mobile,
        fileName: ''
    });

    const [updateAdvertisement, { loading }] = useMutation(UPDATE_ADVERTISEMENT, {
        update(cache) {
            cache.modify({
                fields: {
                    getAllAdvertisements() { }
                }
            });
        },
        onCompleted: (data) => {
            toast.success('Ads updated successfully', {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
            router.push('/admin-advertisement');
        },
        onError: (err) => toast.warn(err.message, {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        })
    });

    const {
        control,
        handleSubmit,
    } = useForm<IAdsFormData>({
        defaultValues: {
            title: data?.getAdvertisementById.title || "",
            description: data?.getAdvertisementById.description || "",
            link: data?.getAdvertisementById.link || "",
            position: data?.getAdvertisementById.position || PageTypes.main,
            from: new Date(data?.getAdvertisementById.from) || undefined,
            to: new Date(data?.getAdvertisementById.to) || undefined,
        }
    });

    const onSubmit = async (data: IAdsFormData): Promise<void> => {
        const fullData = {
            imageURL: {
                desktop: desktopImage?.bannerURL,
                tablet: tabletImage?.bannerURL,
                mobile: mobileImage?.bannerURL,
            },
            ...data,
        };
        // console.log(fullData);
        await updateAdvertisement({
            variables: {
                updateAdvertisementInput: {
                    _id,
                    data: fullData,
                }
            },
        });
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    return (
        <div className={styles.ads_detail_container}>
            <TitleWithBackButton title='Back to Advertisements' pageURL='/admin-advertisement' />
            <div className={styles.ads_detail}>
                <form
                    className={styles.ads_form}
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={(e) => checkKeyDown(e)}
                >
                    <div className={styles.input_box}>
                        <TextInput
                            control={control}
                            name='title'
                            placeholder='Title'
                        />
                        <TextInput
                            control={control}
                            name='link'
                            placeholder='Link'
                        />
                        <div className={styles.select_box}>
                            <p>Position</p>
                            <Controller
                                name="position"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        options={options}
                                        onChange={(value) => field.onChange(value?.value)}
                                        placeholder="Position"
                                        styles={stylesOptions}
                                        defaultInputValue={data?.getAdvertisementById.position}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className={styles.input_box}>
                        <div className={styles.date_picker_box}>
                            <p className={styles.input_title}>From</p>
                            <DatePickerInput
                                control={control}
                                name='from'
                                placeholder='From'
                            />
                        </div>
                        <div className={styles.date_picker_box}>
                            <p className={styles.input_title}>To</p>
                            <DatePickerInput
                                control={control}
                                name='to'
                                placeholder='To'
                            />
                        </div>
                        <TextInput
                            control={control}
                            name='description'
                            placeholder='Description'
                        />
                    </div>
                    <div className={styles.upload_box_wrapper}>
                        <UploadBox
                            imageURL={desktopImage.bannerURL}
                            imageName={desktopImage?.fileName}
                            setImageFile={(data) => setDesktopImage(data)}
                            title='Desktop'
                        />
                        <UploadBox
                            imageURL={tabletImage?.bannerURL}
                            imageName={tabletImage?.fileName}
                            setImageFile={(data) => setTabletImage(data)}
                            title='Tablet'
                        />
                        <UploadBox
                            imageURL={mobileImage?.bannerURL}
                            imageName={mobileImage?.fileName}
                            setImageFile={(data) => setMobileImage(data)}
                            title='Mobile'
                        />
                    </div>
                    <div className='line' />
                    <div className={styles.button_box}>
                        <button
                            type='button'
                            className="button-grey-outlined"
                            onClick={() => router.push('/admin-advertisement')}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="button-green-filled"
                        >
                            {loading ?
                                <Image
                                    src={'/spinner.svg'}
                                    alt={'spinner'}
                                    width={48}
                                    height={48}
                                />
                                : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdsDetail;