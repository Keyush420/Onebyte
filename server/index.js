const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Let us run the server.
app.listen(3002, () => {
    console.log('Server is running on port 3002');
});

// Create MySQL database connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', // Provide your MySQL password here if any
    database: 'plantdb'
});

// Check MySQL connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create a route to register a user
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const values = [email, username, password];

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('User inserted successfully!');
        res.status(201).json({ message: 'User added!' });
    });
});


app.post('/login', (req, res) => {
    // Get variables sent from the form
    const username = req.body.username;
    const password = req.body.password;

    // Create SQL statement to select the user from the Database table 'users'
    const SQL = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const values = [username, password];

    // Execute the SQL query
    db.query(SQL, values, (err, results) => {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        if (results.length > 0) {
            res.send(results);
        } else {
            res.status(401).send({ message: "Credentials don't match!" });
        }
    });
});

// Express backend route to fetch all tables
app.get('/tables', async (req, res) => {
    try {
      const tables = await db.query('SELECT * FROM tables');
      res.json(tables);
    } catch (error) {
      console.error('Error fetching tables:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Express backend route to add a new table
  app.post('/tables', async (req, res) => {
    const { name, price, imageUrl } = req.body;
    try {
      await db.query('INSERT INTO tables (name, price, imageUrl) VALUES (?, ?, ?)', [name, price, imageUrl]);
      res.status(201).json({ message: 'Table added successfully' });
    } catch (error) {
      console.error('Error adding table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


