require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken'); // Import JWT library
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// Set up JWT secret key (use a secure secret key)
const SECRET_KEY = process.env.JWT_SECRET
// MySQL connection for user registration and login
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '', // Provide your MySQL password here if any
  database: 'finaldb'
});

// Check MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// User registration endpoint
app.post('/userRegister', (req, res) => {
  const { email, username, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const SQL = 'INSERT INTO user (email, username, password) VALUES (?, ?, ?)';
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

// User login endpoint
app.post('/userLogin', (req, res) => {
  const { username, password } = req.body;

  // Validate username and password
  const SQL = 'SELECT id, username FROM users WHERE username = ? AND password = ?';

  db.query(SQL, [username, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      // Generate a token
      const token = jwt.sign({ id: results[0].id, username: results[0].username }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ username: results[0].username, token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

// Middleware function to verify JWT token and user identity
function verifyTokenAndUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    const username = decoded.username; // Extract username from decoded token
    const requestedUsername = req.params.username; // Extract username from URL parameters

    if (username !== requestedUsername) {
      return res.status(403).json({ message: 'Unauthorized access to notifications' });
    }

    next();
  });
}

// Protected route example
app.get('/protectedRoute', verifyToken, (req, res) => {
  // This route is protected, only accessible with a valid token
  res.json({ message: 'This is a protected route' });
});

// Admin login endpoint
app.post('/adminLogin', (req, res) => {
  // Get variables sent from the form
  const username = req.body.username;
  const password = req.body.password;

  // Create SQL statement to select the user from the Database table 'users'
  const SQL = 'SELECT * FROM adminuser WHERE username = ? AND password = ?';
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

// MySQL connection for reservation
const dbReservation = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '', // Provide your MySQL password here if any
  database: 'finaldb'
});

dbReservation.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database for reservations:', err);
    return;
  }
  console.log('Connected to MySQL database for reservations');
});

// Endpoint to handle reservation booking
// Endpoint to handle reservation booking
app.post('/book_reservation', (req, res) => {
  const { numberOfPeople, reservationDate, reservationTime, description, tableNumber, reservationName, username } = req.body;

  // Check if the username exists in the user table
  const userQuery = 'SELECT * FROM user WHERE username = ?';
  const userValues = [username];

  db.query(userQuery, userValues, (userErr, userResults) => {
    if (userErr) {
      console.error('Error checking username:', userErr);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (userResults.length === 0) {
      // Username does not exist, return an error
      res.status(401).json({ message: "Invalid username!" });
      return;
    }

    // Username exists, proceed with the reservation booking process
    const SQL = 'INSERT INTO userreservations (numberOfPeople, reservationDate, reservationTime, description, tableNumber, reservationName, username, status) VALUES (?, ?, ?, ?, ?, ?, ?, "pending")';

    db.query(SQL, [numberOfPeople, reservationDate, reservationTime, description, tableNumber, reservationName, username], (err, result) => {
      if (err) {
        console.error('Error booking reservation:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json({ message: 'Reservation booked successfully', reservationId: result.insertId });
    });
  });
});





// Fetch user reservations from database
app.get('/userReservations', (req, res) => {
  const SQL = 'SELECT * FROM userreservations';

  db.query(SQL, (error, results) => {
    if (error) {
      console.error('Error fetching user reservations:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// Endpoint to add a report
app.post('/addReport/:id', (req, res) => {
  const id = req.params.id;

  // Add report to the report table
  const SQL = 'INSERT INTO report (reservation_id, action) VALUES (?, ?)';
  const values = [id, 'report'];

  db.query(SQL, values, (err, result) => {
    if (err) {
      console.error('Error adding report:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('Report added successfully!');
    res.status(200).json({ message: 'Report added!' });
  });
});

// Modify the accept endpoint to accept reservation with the given id and username
app.put('/acceptReservation/:id', (req, res) => {
  const id = req.params.id;
  const username = req.body.username;

  // Update status of the reservation with the given id
  const SQL = 'UPDATE userreservations SET status = "accepted" WHERE id = ?';

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.error('Error accepting reservation:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Reservation accepted successfully!');

    // Add record to the report table
    const reportSQL = 'INSERT INTO report (reservation_id, action) VALUES (?, ?)';
    const values = [id, 'accept'];

    db.query(reportSQL, values, (reportErr, reportResult) => {
      if (reportErr) {
        console.error('Error adding report:', reportErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log('Report added for reservation acceptance!');
      res.status(200).json({ message: 'Reservation accepted!' });
    });
  });
});

// Modify the reject endpoint to reject reservation with the given id and username
app.put('/rejectReservation/:id', (req, res) => {
  const id = req.params.id;
  const username = req.body.username;

  // Update status of the reservation with the given id
  const SQL = 'UPDATE userreservations SET status = "rejected" WHERE id = ?';

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.error('Error rejecting reservation:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Reservation rejected successfully!');

    // Add record to the report table
    const reportSQL = 'INSERT INTO report (reservation_id, action) VALUES (?, ?)';
    const values = [id, 'reject'];

    db.query(reportSQL, values, (reportErr, reportResult) => {
      if (reportErr) {
        console.error('Error adding report:', reportErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log('Report added for reservation rejection!');
      res.status(200).json({ message: 'Reservation rejected!' });
    });
  });
});

// Modify the notification endpoint to accept the username along with the message
app.post('/notification', (req, res) => {
  const { username, message } = req.body;

  // Insert the notification message and username into the notification table
  const SQL = 'INSERT INTO notification (username, message) VALUES (?, ?)';
  const values = [username, message];

  db.query(SQL, values, (err, result) => {
    if (err) {
      console.error('Error inserting notification:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('Notification added successfully!');
    res.status(201).json({ message: 'Notification added!' });
  });
});


// Endpoint to fetch notifications for a specific user
app.get('/notifications/:username', verifyTokenAndUser, (req, res) => {
  const username = req.params.username;
  const SQL = 'SELECT message FROM notification WHERE username = ?';

  db.query(SQL, [username], (err, results) => {
    if (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json(results);
  });
});



app.get('/reservations/count', (req, res) => {
  const SQL = `
    SELECT 
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) AS accepted,
      SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending
    FROM userreservations`;

  db.query(SQL, (err, results) => {
    if (err) {
      console.error('Error fetching reservation counts:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});



app.get('/adminUsername', (req, res) => {
  // Create SQL statement to select the username from the adminuser table
  const SQL = 'SELECT username FROM adminuser';

  // Execute the SQL query
  db.query(SQL, (err, results) => {
      if (err) {
          res.status(500).send({ error: err });
          return;
      }
      if (results.length > 0) {
          res.send(results[0].username);
      } else {
          res.status(404).send({ message: "Admin username not found!" });
      }
  });
});

// Start the server
const port = 3002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});