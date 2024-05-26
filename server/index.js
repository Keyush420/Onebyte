const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

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
app.post('/userRegister', (req, res) => {       //Defines a POST endpoint for userRegister.
  const { email, username, password } = req.body;  //req.body: Contains the request data (email, username, password).

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
app.post('/userLogin', (req, res) => {      //Defines a POST endpoint for user login.
  const { username, password } = req.body       //req.body: Contains the request data (username, password)

  // Create SQL statement to select the user from the Database table 'users'
  const SQL = 'SELECT * FROM user WHERE username = ? AND password = ?';
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

// Book reservation endpoint with conflict check
app.post('/book_reservation', (req, res) => {
  const { reservationDate, reservationTime, numberOfPeople, description, tableNumber, reservationName} = req.body;

  // Check for table conflicts
  const conflictQuery = 'SELECT * FROM userReservations WHERE tableNumber = ? AND reservationDate = ? AND HOUR(reservationTime) = HOUR(?)';
  const conflictValues = [tableNumber, reservationDate, reservationTime];

  db.query(conflictQuery, conflictValues, (err, results) => {
    if (err) {
      console.error('Error checking table conflicts:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      // Conflict found
      return res.status(400).json({ message: 'The selected table is already reserved for the specified hour.' });
    }

    // No conflict, proceed to book reservation
    const SQL = 'INSERT INTO userReservations (numberOfPeople, reservationDate, reservationTime, description, tableNumber, reservationName) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [numberOfPeople, reservationDate, reservationTime, description, tableNumber, reservationName];

    db.query(SQL, values, (err, results) => {
      if (err) {
        console.error('Error booking reservation:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Reservation booked successfully!');
      res.status(201).json({ message: 'Reservation Booked!' });
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

app.post('/addReport/:id', (req, res) => {
  const id = req.params.id;

  // Fetch reservation details by id
  const fetchReservationQuery = 'SELECT * FROM userReservations WHERE id = ?';
 
  db.query(fetchReservationQuery, [id], (err, reservationResults) => {
    if (err) {
      console.error('Error fetching reservation:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
   
    if (reservationResults.length === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    const reservation = reservationResults[0];
    const { reservationName, tableNumber, numberOfPeople, reservationDate, reservationTime, description, username } = reservation;

    // Insert report details
    const SQL = 'INSERT INTO report (reservation_id, reservationName, tableNumber, numberOfPeople, reservationDate, reservationTime, description, username, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())';
    const values = [id, reservationName, tableNumber, numberOfPeople, reservationDate, reservationTime, description, username];

    db.query(SQL, values, (err, result) => {
      if (err) {
        console.error('Error adding report:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Report added successfully!');
      res.status(200).json({ message: 'Report added!' });
    });
  });
});


// Example endpoint to fetch reports
app.get('/reports', (req, res) => {
  const SQL = 'SELECT reservation_id, reservationName, tableNumber, created_at FROM report';

  db.query(SQL, (err, results) => {
    if (err) {
      console.error('Error fetching reports:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});



app.get('/reservations/count', (req, res) => {
  const SQL = `
    SELECT 
      COUNT(*) AS total
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

// Endpoint to fetch all user reservations in ascending order by date
app.get('/reservations/all', (req, res) => {
  const SQL = 'SELECT * FROM userreservations ORDER BY reservationDate ASC';

  db.query(SQL, (error, results) => {
    if (error) {
      console.error('Error fetching user reservations:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
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



// Endpoint to fetch admin username
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
