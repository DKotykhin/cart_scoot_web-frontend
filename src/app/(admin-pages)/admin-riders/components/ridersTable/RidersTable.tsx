import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import Image from "next/image";

import { useMutation } from '@apollo/client';
import { CHANGE_USER_STATUS } from 'apollo/mutations/admin';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';
import ModalCard from 'components/modalCard/ModalCard';
import StatusButton from '../../../components/statusButton/StatusButton';

import { IRider } from 'types/userTypes';

import styles from './ridersTable.module.scss';

const RidersTable: FC<{ riders?: IRider[] }> = ({ riders }) => {

    const [openUnBanModalCard, setOpenUnBanModalCard] = useState(false);
    const [openBanModalCard, setOpenBanModalCard] = useState(false);
    const [riderId, setRiderId] = useState("");

    const [changeUserStatus] = useMutation(CHANGE_USER_STATUS, {
        update(cache) {
            cache.modify({
                fields: {
                    getAllRiders() { }
                }
            });
        },
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

    const banStatusClick = async (id: string, status: boolean) => {
        setRiderId(id);
        status ? setOpenUnBanModalCard(true) : setOpenBanModalCard(true);
    };

    const confirmUnBanClick = async () => {
        setOpenUnBanModalCard(false);
        await changeUserStatus({
            variables: {
                id: riderId,
                status: false,
            },
        });
    };

    const confirmBanClick = async () => {
        setOpenBanModalCard(false);
        await changeUserStatus({
            variables: {
                id: riderId,
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
                        <th><div>Rider</div></th>
                        <th><div>Active / Deactivate</div></th>
                        <th><div>Email</div></th>
                        <th><div>Phone</div></th>
                    </tr>
                </thead>
                <tbody>
                    {riders?.map((item: IRider, i: number) => (
                        <tr key={i}>
                            <td><div>{i + 1}</div></td>
                            <td>
                                <DriverAvatar
                                    driverAvatarURL={item?.avatarURL}
                                    driverName={item?.userName}
                                />
                            </td>
                            <td><div>
                                <StatusButton
                                    banned={item.banned}
                                    banStatusClick={() => banStatusClick(item._id, item.banned)}
                                />
                            </div></td>
                            <td><div>{item?.email}</div></td>
                            <td><div>{item?.phone?.number}</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openUnBanModalCard &&
                <ModalCard
                    title='Activate rider'
                    subtitle='Are you sure to activate this rider?'
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
                    title='Deactivate rider'
                    subtitle='Are you sure to Deactivate this rider?'
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

export default RidersTable;