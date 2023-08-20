"use client";

import React from 'react';

import Image from "next/image";

import { GoogleMap, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import { Control, Controller } from "react-hook-form";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import styles from './locationInput.module.scss';

interface IPickupInput {
    control: Control<any>;
}

const PickupInput: React.FC<IPickupInput> = ({ control }) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        libraries: ["places"],
    });

    return isLoaded ? (
        <div className={styles.location_box}>
            <Controller
                name='pickup'
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type='text'
                        placeholder="Pickup Location"                    
                    />
                    // <PlacesAutocomplete
                    //     onChange={(data) => field.onChange(data)}
                    // >
                    //     {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    //         <div>
                    //             <input
                    //                 {...getInputProps({
                    //                     placeholder: 'Pickup Location',
                    //                     className: 'location-search-input',
                    //                 })}
                    //             />
                    //             <div className="autocomplete-dropdown-container">
                    //                 {loading && <div>Loading...</div>}
                    //                 {suggestions.map(suggestion => (
                    //                     <div key={suggestion.id} {...getSuggestionItemProps(suggestion)}>
                    //                         <span>{suggestion.description}</span>
                    //                     </div>
                    //                 ))}
                    //             </div>
                    //         </div>
                    //     )}
                    // </PlacesAutocomplete>
                )}
            />
            <Image
                src={'/icons/mapPin.svg'}
                alt={'map pin icon'}
                width={24}
                height={24}
                className={styles.start_icon}
            />
            <Image
                src={'/icons/bxs-chevron-down.svg'}
                alt={'arrow icon'}
                width={24}
                height={24}
                className={styles.arrow_icon}
            />
        </div>
    ) : null;
};

export default PickupInput;