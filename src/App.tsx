import React, { useState, useEffect } from 'react';

import Map from './components/Map';
import ControlPanel from './components/ControlPanel';
import { Country } from './types';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [viewport, setViewport] = useState({
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 2,
    bearing: 0,
    pitch: 0,
  });

  const [selectionRange, setSelectionRange] = useState<Date[]>([]);
  const [showPopup, setShowPopup] = useState('close');

  useEffect(() => {
    getCountries();
    getEarthquakes();
  }, []);

  const handleDateRange = (range: Date[]) => {
    console.log(range);
    setSelectionRange(range);
    setShowPopup('close');
  };

  const handleCalendarOpen = () => {
    setShowPopup('close');
  };

  const getCountries = () => {
    fetch('./data/countries.geojson')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log('country', data.features);
        const sortedCountries = data.features.sort((a: Country, b: Country) =>
          a.properties.ADMIN.localeCompare(b.properties.ADMIN)
        );
        setCountries(sortedCountries);
      });
  };

  const getEarthquakes = () => {
    fetch('./data/earthquakes.geojson')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log('earthquake', data.features);
        setEarthquakes(data.features);
      });
  };

  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowPopup('close');
    if (e.target.value === 'all') {
      setViewport({
        latitude: 37.7751,
        longitude: -122.4193,
        zoom: 2,
        bearing: 0,
        pitch: 0,
      });
    } else {
      const coordinates = JSON.parse(e.target.value).geometry.coordinates;
      const longitude = coordinates[0][0][0][0] || coordinates[0][0][0];
      const latitude = coordinates[0][0][0][1] || coordinates[0][0][1];
      setViewport({
        latitude: latitude,
        longitude: longitude,
        zoom: 6,
        bearing: 0,
        pitch: 0,
      });
    }
    setSelectedCountry(e.target.value);
  };

  return (
    <>
      <ControlPanel
        countries={countries}
        handleCountry={handleCountry}
        selectedCountry={selectedCountry}
        handleDateRange={handleDateRange}
        handleCalendarOpen={handleCalendarOpen}
      />
      <Map
        earthquakes={earthquakes}
        setViewport={setViewport}
        viewport={viewport}
        selectionRange={selectionRange}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
}
