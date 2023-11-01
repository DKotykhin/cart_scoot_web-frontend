import React from 'react';

import Advertisement from 'components/advertisement/Advertisement';
import Mapbox from './components/mapbox/Mapbox';

const MapPage = () => {
    return (
        <div style={{ width: '100vw' }}>
            <Advertisement />
            <Mapbox />
        </div>
    );
};

export default MapPage;