import '../styles/LocationInfo.css'
import React from 'react';

const LocationInfo = ({ location }) => {
    if (!location) {
        return null;
    }

    const { name, id, type, dimension, residents } = location;
    return (
        <article className="card__location">
            <p className="info__location">Name: <b>{name}</b></p>
            <p className="info__location">Location: <b>{id}</b></p>
            <span className="info__location">Type: <b>{type}</b></span>
            <span className="info__location">Dimension: <b>{dimension}</b></span>
            <span className="info__location">Population: <b>{residents.length} Hab</b></span>
        </article>
    );
};

export default LocationInfo;
