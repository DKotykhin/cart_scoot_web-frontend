"use client";

import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import Image from "next/image";

import { useMutation } from '@apollo/client';
import { ANSWER_DRIVER_LICENSE } from 'apollo/mutations/admin';

import ModalCard from 'components/modalCard/ModalCard';

import styles from './verifyButtons.module.scss';

const VerifyButtons: FC<{ driverId?: string }> = ({ driverId }) => {

    const [openModalCard, setOpenModalCard] = useState(false);

    const [answerDriverLicense] = useMutation(ANSWER_DRIVER_LICENSE);

    const declineClick = async () => setOpenModalCard(true);

    const confirmClick = async () => {
        try {
            const { data } = await answerDriverLicense({
                variables: {
                    answerDriverLicenseInput: {
                        driverId,
                        answer: false,
                    }
                },
            });
            if (data.answerDriverLicense._id) {
                toast.success('Driver documents has been rejected', {
                    bodyClassName: "warn-toast",
                    icon: <Image
                        src={'/icons/warn-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
                const timer = setTimeout(() => {
                    location.reload();
                }, 4000);
                return () => clearTimeout(timer);
            }
        } catch (err: any) {
            toast.warn(err.message, {
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

    const verifyClick = async () => {
        try {
            const { data } = await answerDriverLicense({
                variables: {
                    answerDriverLicenseInput: {
                        driverId,
                        answer: true,
                    }
                },
            });
            if (data.answerDriverLicense._id) {
                toast.success('Driver documents has been approved', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
                const timer = setTimeout(() => {
                    location.reload();
                }, 4000);
                return () => clearTimeout(timer);
            }
        } catch (err: any) {
            toast.warn(err.message, {
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
            <div className={styles.verify_buttons}>
                <div className={styles.line_box}>
                    <div className={styles.line} />
                </div>
                <div className={styles.verify_buttons_box}>
                    <button
                        className='button-grey-outlined'
                        onClick={declineClick}
                    >
                        Decline
                    </button>
                    <button
                        className='button-green-filled'
                        onClick={verifyClick}
                    >
                        Verify Driver
                    </button>
                </div>
            </div>
            {openModalCard &&
                <ModalCard
                    title='Decline Driver'
                    subtitle='Are you sure to decline the driver?'
                    button_1='Cancel'
                    button_2='Decline Driver'
                    imageURL='/avatars/warningAvatar.svg'
                    greenButton={false}
                    cancelClick={() => setOpenModalCard(false)}
                    confirmClick={confirmClick}
                />
            }
        </>
    );
};

export default VerifyButtons;