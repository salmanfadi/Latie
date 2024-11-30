//routes/locations.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM locations');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new location
router.post('/', async (req, res) => {
  const { name, latitude, longitude, radius } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO locations (name, latitude, longitude, radius) VALUES (?, ?, ?, ?)', [name, latitude, longitude, radius]);
    res.status(201).json({ id: result.insertId, name, latitude, longitude, radius });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a location by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM locations WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Location not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a location
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude, radius } = req.body;
  try {
    const [result] = await pool.query('UPDATE locations SET name = ?, latitude = ?, longitude = ?, radius = ? WHERE id = ?', [name, latitude, longitude, radius, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Location not found' });
    res.json({ message: 'Location updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a location
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM locations WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Location not found' });
    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST request to save location
router.post('/locations', async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    const newLocation = await Location.create({ name, latitude, longitude });
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: 'Error saving location' });
  }
});

module.exports = router;
