import React from 'react';

import Advertisement from 'components/advertisement/Advertisement';
import Mapbox from './components/mapbox/Mapbox';

import { getPageAdvertisement } from 'apollo/services/getPageAdvertisement';
import { PageTypes } from 'types/advertisementTypes';

const MapPage = async () => {

    const advertisement = await getPageAdvertisement(PageTypes.map);

    return (
        <div style={{ width: '100vw' }}>
            <Advertisement advertisement={advertisement?.getPageAdvertisement} />
            <Mapbox />
        </div>
    );
};

export default MapPage;