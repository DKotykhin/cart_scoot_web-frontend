import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_DRIVER_RATING } from 'apollo/queries/review';

import { uploadAvatar } from 'apollo/services/uploadAvatar';
import { useUserStore } from 'stores/userStore';
import { avatarLetters } from 'utils/avatarLetters';

import { IUser, userTypes } from 'types/userTypes';

import styles from './userPanel.module.scss';

interface IUserPanel {
    user: IUser;
    openChangePasswordClick: () => void;
    logoutModalClick: () => void;
    handleCloseClick: () => void;
    addMobileClick: () => void;
    changeNameClick: () => void;
}

const UserPanel: React.FC<IUserPanel> = ({ user, logoutModalClick, openChangePasswordClick, handleCloseClick, addMobileClick, changeNameClick }) => {

    const { data }: { data: { getDriverRating: { avgRating: number, totalCount: number } } } = useSuspenseQuery(GET_DRIVER_RATING);

    const { addUser } = useUserStore();

    const onChange = async (e: any) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0], e.target.files[0].name);
        const newUser = await uploadAvatar(formData);
        addUser(newUser);
    };

    return (
        <div className={styles.container} onClick={handleCloseClick}>
            <div className={styles.user_panel} onClick={(e) => e.stopPropagation()}>
                <div className={styles.rating_wrapper}>
                    {user.role === userTypes.driver && data.getDriverRating.avgRating > 0 &&
                        <div className={styles.rating_box}>
                            <Image
                                src={'/icons/star-green.svg'}
                                alt={'star'}
                                width={20}
                                height={20}
                            />
                            <p className={styles.rating_value}>{data.getDriverRating.avgRating}</p>
                        </div>
                    }
                </div>
                <div className={styles.user_logo_wrapper}>
                    <div className={styles.logo_box}>
                        {user?.avatarURL ?
                            <Image
                                src={user?.avatarURL}
                                alt={'avatar'}
                                width={56}
                                height={56}
                            />
                            :
                            <div className={styles.empty_avatar}>
                                {avatarLetters(user?.userName || 'C S')}
                            </div>
                        }
                    </div>
                    <label htmlFor='avatar' onChange={onChange}>
                        <Image
                            src={"/icons/upload-image.svg"}
                            alt={'upload'}
                            width={20}
                            height={20}
                            className={styles.user_logo_upload}
                        />
                        <input type="file" id="avatar" name="avatar" accept="image/*" hidden />
                    </label>
                </div>
                <p className={styles.user_title}>{user.userName || ""}</p>
                <p className={styles.user_subtitle}>{user.email || ""}</p>
                <div className={styles.user_list} onClick={handleCloseClick}>
                    {user.role === userTypes.driver ?
                        <>
                            <Link href={'/driver-profile'}>
                                <div className={styles.list_item}>
                                    <span>Profile</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </Link>
                            <Link href={'/driver-requests'}>
                                <div className={styles.list_item}>
                                    <span>Requests</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </Link>
                            {!user.phone.number &&
                                <div className={styles.list_item} onClick={addMobileClick}>
                                    <span>Add Mobile Phone</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            }
                            {user.userName ?
                                <div className={styles.list_item} onClick={changeNameClick}>
                                    <span>Change Your Name</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                :
                                <div className={styles.list_item} onClick={changeNameClick}>
                                    <span>Add Your Name</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            }
                            <div
                                className={styles.list_item}
                                onClick={openChangePasswordClick}
                            >
                                <span>Change Password</span>
                                <Image
                                    src={'/icons/caretRight.svg'}
                                    alt={'right'}
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </>
                        :
                        <>
                            <Link href={'/requests-list'}>
                                <div className={styles.list_item}>
                                    <span>Trips & Requests</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </Link>
                            {!user.phone.number &&
                                <div className={styles.list_item} onClick={addMobileClick}>
                                    <span>Add Mobile Phone</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            }
                            {user.userName ?
                                <div className={styles.list_item} onClick={changeNameClick}>
                                    <span>Change Your Name</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                :
                                <div className={styles.list_item} onClick={changeNameClick}>
                                    <span>Add Your Name</span>
                                    <Image
                                        src={'/icons/caretRight.svg'}
                                        alt={'right'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            }
                            <div
                                className={styles.list_item}
                                onClick={openChangePasswordClick}
                            >
                                <span>Change Password</span>
                                <Image
                                    src={'/icons/caretRight.svg'}
                                    alt={'right'}
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </>
                    }
                </div>
                <div
                    className={styles.user_logout}
                    onClick={logoutModalClick}
                >
                    <Image
                        src={'/icons/signOut.svg'}
                        alt={'out'}
                        width={24}
                        height={24}
                    />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;