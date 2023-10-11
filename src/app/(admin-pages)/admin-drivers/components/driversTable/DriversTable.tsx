import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { CHANGE_USER_STATUS } from 'apollo/mutations/admin';
import { useUserStore } from 'stores/userStore';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import StatusButton from '../../../components/statusButton/StatusButton';

import { IUser, licenseStatusTypes } from 'types/userTypes';

import styles from './driversTable.module.scss';

const DriversTable: React.FC<{ drivers: [IUser] }> = ({ drivers }) => {

    const router = useRouter();
    const { addUser } = useUserStore();
    const [changeUserStatus] = useMutation(CHANGE_USER_STATUS);

    const handleClick = (_id: string) => router.push(`/admin-drivers/${_id}`);

    const banStatusClick = async (id: string, status: boolean) => {
        try {
            const { data } = await changeUserStatus({
                variables: {
                    id,
                    status: !status,
                },
            });
            if (data.changeUserStatus._id) {
                toast.success('User status changed successfully', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
                addUser(data?.changeUserStatus!);
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
        <table className={styles.container}>
            <thead>
                <tr>
                    <th><div>#</div></th>
                    <th><div>Driver</div></th>
                    <th><div>Active / Deactivate</div></th>
                    <th><div>Email</div></th>
                    <th><div>Status</div></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {drivers.map((item: IUser, i: number) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td>
                            <DriverAvatar
                                driverAvatarURL={item?.avatarURL}
                                driverName={item?.userName}
                            />
                        </td>
                        <td><div><StatusButton banned={item.banned} banStatusClick={() => banStatusClick(item._id, item.banned)} /></div></td>
                        <td><div>{item.email}</div></td>
                        <td className={item.license.status === licenseStatusTypes.waiting ? styles.status_waiting
                            : item.license.status === licenseStatusTypes.rejected ? styles.status_rejected
                                : item.license.status === licenseStatusTypes.approved ? styles.status_approved
                                    : styles.status_pending}
                        >
                            {item.license.status === licenseStatusTypes.waiting ?
                                <span>Wait for Approve</span>
                                : item.license.status === licenseStatusTypes.rejected ?
                                    <span>Rejected</span>
                                    : item.license.status === licenseStatusTypes.approved ?
                                        <span>Verified</span>
                                        :
                                        <span>Unverified</span>
                            }
                        </td>
                        <td className={styles.image_box}>
                            <Image
                                src={'/icons/caretRight-grey.svg'}
                                alt={'caret'}
                                width={20}
                                height={20}
                                onClick={() => handleClick(item._id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DriversTable;