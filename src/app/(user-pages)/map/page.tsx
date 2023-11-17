import React from 'react';

import Advertisement from 'components/advertisement/Advertisement';
import Mapbox from './components/mapbox/Mapbox';

import { getPageAdvertisement } from 'apollo/services/getPageAdvertisement';
import { PageTypes } from 'types/advertisementTypes';

import styles from './mapPage.module.scss';

const MapPage = async () => {

    const advertisement = await getPageAdvertisement(PageTypes.map);

    return (
        <div className={styles.mapPage_wrapper}>
            <div className={styles.mapPage_ads}>
                <Advertisement advertisement={advertisement?.getPageAdvertisement} />
            </div>
            <Mapbox />
        </div>
    );
};

export default MapPage;