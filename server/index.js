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

// Endpoint to check if a user with the given email or username already exists
app.get('/checkUser', (req, res) => {
    const { email, username } = req.query;

    // Check if email or username exists in the database
    const SQL = 'SELECT * FROM users WHERE email = ? OR username = ?';
    const values = [email, username];

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length > 0) {
            // User with the given email or username already exists
            let existsEmail = false;
            let existsUsername = false;
            results.forEach(user => {
                if (user.email === email) existsEmail = true;
                if (user.username === username) existsUsername = true;
            });
            res.status(200).json({ exists: true, existsEmail, existsUsername });
        } else {
            // User does not exist
            res.status(200).json({ exists: false });
        }
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

// Endpoint to add a table
app.post('/add_table', (req, res) => {
    const { name, price, imageUrl, reservationDate, reservationTime } = req.body;

    if (!name || !price || !imageUrl || !reservationDate || !reservationTime) {
        return res.status(400).json({ error: 'Name, price, imageUrl, reservationDate, and reservationTime are required' });
    }

    const SQL = 'INSERT INTO tables (name, price, imageUrl, reservationDate, reservationTime) VALUES (?, ?, ?, ?, ?)';
    const values = [name, price, imageUrl, reservationDate, reservationTime];

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error inserting table:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Table inserted successfully!');
        res.status(201).json({ message: 'Table added!', id: results.insertId });
    });
});


// Endpoint to fetch all tables
app.get('/tables', (req, res) => {
    const SQL = 'SELECT * FROM tables';

    db.query(SQL, (err, results) => {
        if (err) {
            console.error('Error fetching tables:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(results);
    });
});

// Endpoint to update a table
app.put('/update_table/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, imageUrl,reservationDate, reservationTime } = req.body;

    const SQL = 'UPDATE tables SET name = ?, price = ?, imageUrl = ?,reservationDate = ?, reservationTime = ? WHERE id = ?';
    const values = [name, price, imageUrl,reservationDate, reservationTime, id];

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error updating table:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Table updated successfully!');
        res.status(200).json({ message: 'Table updated!' });
    });
});

// Endpoint to delete a table
app.delete('/delete_table/:id', (req, res) => {
    const id = req.params.id;
    const SQL = 'DELETE FROM tables WHERE id = ?';

    db.query(SQL, id, (err, results) => {
        if (err) {
            console.error('Error deleting table:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Table deleted successfully!');
        res.status(200).json({ message: 'Table deleted!' });
    });
});

// Endpoint to add a menu item
app.post('/add_menu_item', (req, res) => {
    const { name, price, imageUrl } = req.body;

    if (!name || !price || !imageUrl) {
        return res.status(400).json({ error: 'Name, price, and imageUrl are required' });
    }

    const SQL = 'INSERT INTO menu_items (name, price, imageUrl) VALUES (?, ?, ?)';
    const values = [name, price, imageUrl];

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
        res.status(200).json(results);
    });
});

// Endpoint to update a menu item
app.put('/update_menu_item/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, imageUrl } = req.body;

    const SQL = 'UPDATE menu_items SET name = ?, price = ?, imageUrl = ? WHERE id = ?';
    const values = [name, price, imageUrl, id];

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error updating menu item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Menu item updated successfully!');
        res.status(200).json({ message: 'Menu item updated!' });
    });
});

// Endpoint to delete a menu item
app.delete('/delete_menu_item/:id', (req, res) => {
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
