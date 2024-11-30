const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Enable CORS for all origins with more configuration
const corsOptions = {
    origin: 'http://localhost:5173', // your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// Enable JSON parsing in Express
app.use(express.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Misriya2014@',
  database: 'Latie'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define the /locations endpoint for POST requests
// Define the /locations endpoint for POST requests
app.post('/locations', (req, res) => {
    const { name, latitude, longitude } = req.body;
    console.log('Received data:', { name, latitude, longitude });
  
    // Insert the location data into the database
    const query = 'INSERT INTO locations (name, latitude, longitude) VALUES (?, ?, ?)';
    connection.query(query, [name, latitude, longitude], (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).send('Error saving the location');
        return;
      }
      console.log('Location saved successfully');
      res.send('Location saved successfully');
    });
  });

  app.get('/locations', (req, res) => {
    connection.query('SELECT * FROM locations', (err, results) => {
      if (err) {
        console.error('Error fetching data from database:', err);
        return res.status(500).send('Server Error');
      }
      res.json(results);
    });
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
