import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocationForm.css';
import './olamaps/olamaps-js-sdk.umd.js';

function LocationForm() {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    const olaMaps = new OlaMapsSDK.OlaMaps({
      apiKey: '4lXPzP8kpbknOndPkcLgl7VrMd3cAKk4IrsRvE36',
    });

    const myMap = olaMaps.init({
      style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
      container: 'map',
      center: [75.779917, 31.232472],
      zoom: 15,
    });

    myMap.on('click', (e) => {
      const { lat, lng } = e.lngLat;
      console.log('Map clicked at:', { lat, lng });
      setLatitude(lat);
      setLongitude(lng);
    });

    return () => {
      myMap.remove();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('HandleSubmit function called'); // Check if this log appears
    console.log('Submitting location:', { name, latitude, longitude });
  
    const newLocation = { name, latitude, longitude };
    
    axios.post('http://localhost:5000/locations', newLocation)
      .then(response => {
        console.log('Response from server:', response.data);
        alert(response.data); // Show the response in an alert box
      })
      .catch(error => {
        console.error('There was an error saving the location!', error);
      });
  };

  return (
    <div className="location-form">
      <div className="location-form-container">
        <header className="location-form-header">
          <h3>Add Location</h3>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={latitude}
              readOnly
              placeholder="Latitude"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={longitude}
              readOnly
              placeholder="Longitude"
              required
            />
          </div>
          <button type="submit" className="add-location-button">
            Add Location
          </button>
        </form>
        <div id="map" style={{ height: '400px' }}></div>
      </div>
    </div>
  );
}

export default LocationForm;
