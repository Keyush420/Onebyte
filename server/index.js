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

// Endpoint to add a menu item
app.post('/menu', (req, res) => {
    const { name, price, imageUrl } = req.body;

    if (!name || !price || !imageUrl) {
        return res.status(400).json({ error: 'Name, price, and imageUrl are required' });
    }

    const SQL = 'INSERT INTO menu_items (name, price, image_url) VALUES (?, ?, ?)';
    const values = [name, price, imageUrl]; // Define values here

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error inserting menu item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Menu item inserted successfully!');
        res.status(201).json({ message: 'Menu item added!', id: results.insertId });
    });
});


// Endpoint to fetch all menu items
app.get('/menu_items', (req, res) => {
    const SQL = 'SELECT * FROM menu_items';

    db.query(SQL, (err, results) => {
        if (err) {
            console.error('Error fetching menu items:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const menuItems = results.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.image_url // Consistent with column name
        }));
        res.status(200).json(menuItems);
    });
});

// Endpoint to delete a menu item
app.delete('/menu_items/:id', (req, res) => {
    const id = req.params.id;
    const SQL = 'DELETE FROM menu_items WHERE id = ?';

    db.query(SQL, id, (err, results) => {
        if (err) {
            console.error('Error deleting menu item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Menu item deleted successfully!');
        res.status(200).json({ message: 'Menu item deleted!' });
    });
});
