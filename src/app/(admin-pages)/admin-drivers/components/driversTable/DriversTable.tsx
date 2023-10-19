import { FC, useState } from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { CHANGE_USER_STATUS } from 'apollo/mutations/admin';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import ModalCard from 'components/modalCard/ModalCard';
import StatusButton from '../../../components/statusButton/StatusButton';

import { IUser, licenseStatusTypes } from 'types/userTypes';

import styles from './driversTable.module.scss';

const DriversTable: FC<{ drivers: IUser[] }> = ({ drivers }) => {

    const [openUnBanModalCard, setOpenUnBanModalCard] = useState(false);
    const [openBanModalCard, setOpenBanModalCard] = useState(false);
    const [driverId, setDriverId] = useState("");

    const router = useRouter();
    const [changeUserStatus] = useMutation(CHANGE_USER_STATUS, {
        onCompleted: (data) => {
            if (data.changeUserStatus.banned === false) {
                toast.success('User activated successfully', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
            } else toast.success('User was blocked', {
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
        })
    });

    const handleClick = (_id: string) => router.push(`/admin-drivers/${_id}`);

    const banStatusClick = async (id: string, status: boolean) => {
        setDriverId(id);
        status ? setOpenUnBanModalCard(true) : setOpenBanModalCard(true);
    };

    const confirmUnBanClick = async () => {
        setOpenUnBanModalCard(false);
        await changeUserStatus({
            variables: {
                id: driverId,
                status: false,
            },
        });
    };

    const confirmBanClick = async () => {
        setOpenBanModalCard(false);
        await changeUserStatus({
            variables: {
                id: driverId,
                status: true,
            },
        });
    };

    return (
        <>
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
                    {drivers?.map((item: IUser, i: number) => (
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
                            <td className={styles.image_box} onClick={() => handleClick(item._id)}>
                                <Image
                                    src={'/icons/caretRight-grey.svg'}
                                    alt={'caret'}
                                    width={20}
                                    height={20}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openUnBanModalCard &&
                <ModalCard
                    title='Activate driver'
                    subtitle='Are you sure to activate this driver?'
                    button_1='Cancel'
                    button_2='Activate'
                    imageURL='/avatars/activeAvatar.svg'
                    greenButton={true}
                    cancelClick={() => setOpenUnBanModalCard(false)}
                    confirmClick={confirmUnBanClick}
                />
            }
            {openBanModalCard &&
                <ModalCard
                    title='Deactivate driver'
                    subtitle='Are you sure to Deactivate this driver?'
                    button_1='Cancel'
                    button_2='Deactivate'
                    imageURL='/avatars/warningAvatar.svg'
                    greenButton={false}
                    cancelClick={() => setOpenBanModalCard(false)}
                    confirmClick={confirmBanClick}
                />
            }
        </>
    );
};

export default DriversTable;