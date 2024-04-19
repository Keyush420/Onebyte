// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost', // Update with your database host
//   user: 'root', // Update with your database username
//   password: '', // Update with your database password
//   database: 'restdb' // Update with your database name
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Endpoint to insert reservation data
// app.post('/reserve', (req, res) => {
//   const { name, guests, status, location, date, time, note } = req.body;

//   const query = 'INSERT INTO reservations (name, guests, status, location, date, time, note) VALUES (?, ?, ?, ?, ?, ?, ?)';
//   db.query(query, [name, guests, status, location, date, time, note], (err, result) => {
//     if (err) {
//       console.error('Error inserting data:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     console.log('Data inserted successfully:', result);
//     res.status(200).json({ message: 'Reservation successful' });
//   });
// });


// // Endpoint to get reservation data
// app.get('/reservations', (req, res) => {
//   const query = 'SELECT * FROM reservations';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching data:', err);
//       res.status(500).json({ error: 'Database error' });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });

// // Start the server
// const port = 3002;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // Update with your database host
  user: 'root', // Update with your database username
  password: '', // Update with your database password
  database: 'restdb' // Update with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint to insert reservation data
app.post('/reserve', (req, res) => {
  const { name, guests, status, location, date, time, note } = req.body;

  const query = 'INSERT INTO reservations (name, guests, status, location, date, time, note) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, guests, status, location, date, time, note], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Data inserted successfully:', result);
    res.status(200).json({ message: 'Reservation successful' });
  });
});

// Endpoint to get reservation data
app.get('/reservations', (req, res) => {
  const query = 'SELECT * FROM reservations';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Start the server
const port = 3002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
