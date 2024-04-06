// app.js

const express = require('express');
const { Pool } = require('pg');

const app = express();

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'flytask',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database:', res.rows[0].now);
  }
});

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
