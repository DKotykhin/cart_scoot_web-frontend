"use client";

import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from 'apollo/mutations/review';

import Image from "next/image";

import styles from './finishedCard.module.scss';

interface IFinishedCard {
    handleClose: () => void;
    finishedCardData: {
        driverId: string,
        requestCode: string,
    }
}

interface IReviewData {
    comment: string;
}

const starsArray = [1, 2, 3, 4, 5];

const FinishedCard: React.FC<IFinishedCard> = ({ handleClose, finishedCardData }) => {

    const { driverId, requestCode } = finishedCardData;
    const [reviewStars, setReviewStars] = useState(0);

    const [addReview, { loading }] = useMutation(ADD_REVIEW, {
        update(cache) {
            cache.modify({
                fields: {
                    getRequest() { }
                }
            });
        },
        onCompleted: (data) => {
            handleClose();
            toast.success('Review added successfully', {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
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

    const {
        control,
        handleSubmit,
    } = useForm<IReviewData>({
        defaultValues: {
            comment: "",
        }
    });

    const onSubmit = async (formData: IReviewData): Promise<void> => {
        await addReview({
            variables: {
                addReviewInput: {
                    driverId,
                    requestCode,
                    rating: reviewStars,
                    text: formData.comment
                }
            },
        });
    };

    return (
        <div className={styles.container} onClick={handleClose}>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.upperBox}>
                    <Image
                        src={'/avatars/checkAvatar.svg'}
                        alt={'avatar'}
                        width={120}
                        height={120}
                    />
                    <h2 className='title'>Trip Finished</h2>
                    <p className={styles.subtitle}>
                        Your trip has been finished, please submit your comment about you experience in the trip and driver.
                    </p>
                    <div className={styles.stars_box}>
                        {starsArray.map(star => (
                            <Image
                                src={reviewStars >= star ? '/icons/star-green.svg' : '/icons/star-grey.svg'}
                                alt={'star'}
                                width={56}
                                height={56}
                                onClick={() => setReviewStars(star)}
                                key={star}
                            />
                        ))}
                    </div>
                    <div className={styles.textarea}>
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field }) => (
                                <textarea {...field} placeholder='Write you comment (Optional)' />
                            )}
                        />
                    </div>
                </div>
                <div className='line' />
                <div className={styles.lowerBox}>
                    <button type='submit' className='button-green-filled'>
                        {loading ?
                            <Image
                                src={'/spinner.svg'}
                                alt={'spinner'}
                                width={48}
                                height={48}
                            />
                            : 'Send review'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FinishedCard;