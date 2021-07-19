import React, { useEffect, useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { Grid } from 'rsuite';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapMaker from './MapMarker';
import { Earthquake, Viewport } from '../types';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWRhbXBhdHRlcm5hZyIsImEiOiJja21udWtzOWYxc3FhMm9yd3k0azNhc3NlIn0.8AK6rDX4v_85w2hM-PxmMQ';

export interface MapProps {
  earthquakes: Earthquake[];
  viewport: Viewport;
  setViewport(ev: Viewport): void;
  selectionRange: Date[];
  setShowPopup(ev: string): void;
  showPopup: string;
}

const MapView: React.FC<MapProps> = ({
  earthquakes,
  viewport,
  setViewport,
  selectionRange,
  setShowPopup,
  showPopup,
}) => {
  const [filteredEarthquakes, setFilteredEarthquakes] = useState<Earthquake[]>(
    []
  );

  useEffect(() => {
    setFilteredEarthquakes(earthquakes);
    filterEarthquakes(selectionRange);
  }, [selectionRange, earthquakes]);

  const filterEarthquakes = (selectionRange: Date[]) => {
    if (selectionRange.length === 0) {
      setFilteredEarthquakes(earthquakes);
      return;
    }
    const filteredArr = earthquakes.filter((earthquake: Earthquake) => {
      if (
        new Date(earthquake.properties.time) >= selectionRange[0] &&
        new Date(earthquake.properties.time) < selectionRange[1]
      ) {
        return earthquake;
      }
      return null;
    });
    setFilteredEarthquakes(filteredArr);
  };

  return (
    <Grid fluid>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 70px)"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        dragRotate={false}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {filteredEarthquakes.map((earthquake: Earthquake) => (
          <MapMaker
            earthquake={earthquake}
            key={earthquake.id}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 10,
            padding: 10,
          }}
        >
          <NavigationControl />
        </div>
      </ReactMapGL>
    </Grid>
  );
};

export default MapView;
