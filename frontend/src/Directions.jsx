import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Directions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { location: selectedLocation } = location.state || {};

  if (!selectedLocation) {
    return <div>No location selected</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Directions</h2>
      <div style={styles.locationInfo}>
        <div style={styles.iconContainer}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/1024px-Map_marker.svg.png"
            alt="icon"
            style={styles.icon}
          />
        </div>
        <div>
          <span style={styles.locationName}>{selectedLocation.name}</span>
          <br />
          <span style={styles.directionStatus}>Showing Direction</span>
        </div>
      </div>
      <div style={styles.distance}>
        {selectedLocation.distance.toFixed(2)} meters away from the location
      </div>
      <button
        style={styles.closeButton}
        onClick={() => history.goBack()}
      >
        Close
      </button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '360px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#000',
  },
  locationInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    textAlign: 'left',
  },
  iconContainer: {
    width: '50px',
    height: '50px',
    backgroundColor: '#E5F1FF',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  locationName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
  },
  directionStatus: {
    fontSize: '12px',
    color: '#777',
  },
  distance: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: '10px',
    fontSize: '16px',
    color: '#000',
    backgroundColor: '#FFD700',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
  },
};

export default Directions;
