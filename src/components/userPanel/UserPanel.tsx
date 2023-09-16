import React from 'react';

import Image from "next/image";
import Link from 'next/link';
import Cookies from 'js-cookie';
import axios from 'axios';

import { useUserStore } from 'stores/userStore';

import { IUser } from 'types/userTypes';

import styles from './userPanel.module.scss';

interface IUserPanel {
    changePasswordClick: () => void;
    logoutModalClick: () => void;
    user: IUser;
    handleCloseClick: () => void;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_REST_API;

const UserPanel: React.FC<IUserPanel> = ({ logoutModalClick, changePasswordClick, user, handleCloseClick }) => {

    const { addUser } = useUserStore();

    const onChange = async (e: any) => {
        // console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append("avatar", e.target.files[0], e.target.files[0].name);
        const token = Cookies.get('token');
        const config = {
            method: "POST",
            url: "/avatar",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        };
        await axios(config)
            .then(response => addUser(response.data.user))
            .catch(err => console.log(err.message));
    };

    return (
        <div className={styles.user_panel}>
            <div className={styles.user_logo_wrapper}>
                <Image
                    src={user.avatarURL || "/icons/user-black.svg"}
                    alt={'avatar'}
                    width={56}
                    height={56}
                    className={styles.user_logo_image}
                />
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
                <div className={styles.list_item}>
                    <span>Add Mobile Phone</span>
                    <Image
                        src={'/icons/caretRight.svg'}
                        alt={'right'}
                        width={24}
                        height={24}
                    />
                </div>
                <div
                    className={styles.list_item}
                    onClick={changePasswordClick}
                >
                    <span>Change Password</span>
                    <Image
                        src={'/icons/caretRight.svg'}
                        alt={'right'}
                        width={24}
                        height={24}
                    />
                </div>
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
    );
};

export default UserPanel;