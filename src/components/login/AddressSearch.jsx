// AddressSearch.js
import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const AddressSearch = () => {
    const handleComplete = (data) => {
        window.opener.postMessage({
            type: 'ADDRESS_SELECTED',
            payload: data,
        }, window.location.origin);
        window.close();
    };

    return (
        <div>
            <DaumPostcode onComplete={handleComplete} />
        </div>
    );
};

export default AddressSearch;
