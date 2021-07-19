import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Earthquake } from '../types';
import styles from './MapMarker.module.css';
import PinImg from '../assets/icons/pin.png';

export interface MapMakerProps {
  earthquake: Earthquake;
  showPopup: string;
  setShowPopup(ev: string): void;
}

const MapMaker: React.FC<MapMakerProps> = ({
  earthquake,
  showPopup,
  setShowPopup,
}) => {
  const converTime = (unix_timestamp: number) => {
    const date = new Date(unix_timestamp);
    return date.toDateString();
  };

  return (
    <>
      <Marker
        latitude={earthquake.geometry.coordinates[1]}
        longitude={earthquake.geometry.coordinates[0]}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <img
          src={PinImg}
          alt="pin"
          className={styles.pin}
          onClick={() => {
            setShowPopup(earthquake.id);
          }}
        />
      </Marker>

      {showPopup === earthquake.id && (
        <Popup
          latitude={earthquake.geometry.coordinates[1]}
          longitude={earthquake.geometry.coordinates[0]}
          closeButton={false}
          closeOnClick={true}
          onClose={() => setShowPopup('close')}
          anchor="top"
          offsetLeft={-10}
          offsetTop={10}
          className={styles.marker}
        >
          <div>
            <p>
              <span className={styles.label}>Place:</span>
              {earthquake.properties.place}
            </p>
            <p>
              <span className={styles.label}>Magnitude:</span>
              {earthquake.properties.mag}
              {earthquake.properties.magType}
            </p>
            <p>
              <span className={styles.label}>Title:</span>
              {earthquake.properties.title}
            </p>
            <p>
              <span className={styles.label}>Timestamp:</span>
              {converTime(earthquake.properties.time)}
            </p>
          </div>
        </Popup>
      )}
    </>
  );
};

export default MapMaker;
