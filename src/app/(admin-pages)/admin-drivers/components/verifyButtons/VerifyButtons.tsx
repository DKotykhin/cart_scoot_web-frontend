"use client";

import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import Image from "next/image";

import { useMutation } from '@apollo/client';
import { ANSWER_DRIVER_LICENSE } from 'apollo/mutations/admin';

import ModalCard from 'components/modalCard/ModalCard';
import { licenseStatusTypes } from 'types/userTypes';

import styles from './verifyButtons.module.scss';

const VerifyButtons: FC<{ driverId?: string }> = ({ driverId }) => {

    const [openVerifyModalCard, setOpenVerifyModalCard] = useState(false);
    const [openDeclineModalCard, setOpenDeclineModalCard] = useState(false);

    const [answerDriverLicense, { loading }] = useMutation(ANSWER_DRIVER_LICENSE, {
        update(cache) {
            cache.modify({
                fields: {
                    getDriverWithRating() { }
                }
            });
        },
        onCompleted: (data) => {
            setOpenVerifyModalCard(false);
            setOpenDeclineModalCard(false);
            if (data.answerDriverLicense.license.status === licenseStatusTypes.approved) {
                toast.success('Driver documents has been approved', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
            } else toast.success('Driver documents has been rejected', {
                bodyClassName: "warn-toast",
                icon: <Image
                    src={'/icons/warn-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        },
        onError: (err) => toast.warn(err.message, {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        }),
    });

    const confirmDeclineClick = async () => {
        await answerDriverLicense({
            variables: {
                answerDriverLicenseInput: {
                    driverId,
                    answer: false,
                }
            },
        });
    };

    const confirmVerifyClick = async () => {
        await answerDriverLicense({
            variables: {
                answerDriverLicenseInput: {
                    driverId,
                    answer: true,
                }
            },
        });
    };

    return (
        <>
            <div className={styles.verify_buttons}>
                <div className={styles.line_box}>
                    <div className={styles.line} />
                </div>
                <div className={styles.verify_buttons_box}>
                    <button
                        className='button-grey-outlined'
                        onClick={() => setOpenDeclineModalCard(true)}
                    >
                        Decline
                    </button>
                    <button
                        className='button-green-filled'
                        onClick={() => setOpenVerifyModalCard(true)}
                    >
                        Verify Driver
                    </button>
                </div>
            </div>
            {openDeclineModalCard &&
                <ModalCard
                    title='Decline Driver'
                    subtitle='Are you sure to decline the driver?'
                    button_1='Cancel'
                    button_2={loading ?
                        <Image
                            src={'/spinner.svg'}
                            alt={'spinner'}
                            width={48}
                            height={48}
                        />
                        : 'Decline Driver'}
                    imageURL='/avatars/warningAvatar.svg'
                    greenButton={false}
                    cancelClick={() => setOpenDeclineModalCard(false)}
                    confirmClick={confirmDeclineClick}
                />
            }
            {openVerifyModalCard &&
                <ModalCard
                    title='Verify Driver'
                    subtitle='Are you sure to verify the driver?'
                    button_1='Cancel'
                    button_2={loading ?
                        <Image
                            src={'/spinner.svg'}
                            alt={'spinner'}
                            width={48}
                            height={48}
                        />
                        : 'Verify Driver'}
                    imageURL='/avatars/activeAvatar.svg'
                    greenButton={true}
                    cancelClick={() => setOpenVerifyModalCard(false)}
                    confirmClick={confirmVerifyClick}
                />
            }
        </>
    );
};

export default VerifyButtons;