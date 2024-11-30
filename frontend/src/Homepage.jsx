import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const predefinedLocation = [75.779917, 31.232472]; // [longitude, latitude]

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Distance in meters
};

const getColorByDistance = (distance) => {
  if (distance <= 50) return 'green';
  if (distance <= 1000) return 'yellow';
  return 'red';
};

const HomePage = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations from the backend
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/locations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const updatedLocations = data.map(location => {
          const distance = calculateDistance(
            predefinedLocation[1], predefinedLocation[0],
            location.latitude, location.longitude
          );
          return { ...location, distance, color: getColorByDistance(distance) };
        });
        setLocations(updatedLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="homepage">
      <div className="homepage-container">
        <header className="homepage-header">
          <span className="alerts-icon">🚨 Alerts</span>
          <h1>Welcome, John Doe</h1>
          <p className="small-text">Enable location services</p>
          <p className="small-text">
            You can turn on Location Services in your settings to receive notifications when you are near a location.
          </p>
          <a href="#" className="enable-link">Click here to Enable</a>
        </header>
        <section className="location-setup">
          <div className="location-icon">📍</div>
          <div className="location-details">
            <h2>Please Set up your locations</h2>
            {locations.length > 0 ? (
              locations.map((location) => (
                <Link 
                  key={location.id}
                  to={`/directions`} // Redirect to Directions page
                  className="location-item" // Use Link styling if needed
                  style={{ borderColor: location.color }} // Apply color coding
                >
                  <div className="location-item-icon">📡</div>
                  <div className="location-item-text">
                    <h3>{location.name}</h3>
                    <p>{`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</p>
                    <p>{`Distance: ${location.distance.toFixed(2)} meters`}</p>
                  </div>
                  <div className="location-item-arrow">➡️</div>
                </Link>
              ))
            ) : (
              <p>No locations available</p>
            )}
          </div>
        </section>
        <Link to="/add-location">
          <button className="add-location-button">Add location</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
