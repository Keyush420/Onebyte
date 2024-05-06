import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Image from '../../LoginAssets/Restaurent.png'
import './userTable.css'; // Import CSS file
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon

const Table = () => {
  const [newReservation, setNewReservation] = useState({
    numberOfPeople: 1,
    reservationDate: '',
    reservationTime: '',
    description: '',
    tableNumber: 1
  });

  const [reservations, setReservations] = useState([]);
  const [showNav, setShowNav] = useState(false); // Define showNav state

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation({ ...newReservation, [name]: value });
  };

  const handleBookReservation = () => {
    if (newReservation.reservationDate && newReservation.reservationTime && newReservation.numberOfPeople && newReservation.description && newReservation.tableNumber) {
      axios.post('http://localhost:3002/book_reservation', newReservation)
        .then(response => {
          console.log('Reservation Booked:', response.data);
          fetchReservations();
          setNewReservation({ numberOfPeople: 1, reservationDate: '', reservationTime: '', description: '', tableNumber: 1 });
          alert('Your booking has been sent. Please wait for confirmation.');
        })
        .catch(error => {
          console.error('Error booking reservation:', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const fetchReservations = () => {
    axios.get('http://localhost:3002/reservations')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  };
  
  // Function to prevent typing in input fields
  const preventTyping = (e) => {
    e.preventDefault();
  };
  return (
    <div>
    <div className="burger-icon" onClick={() => setShowNav(!showNav)}>
      <MenuIcon />
    </div>
    <div className={`sidenav ${showNav ? 'active' : ''}`}>
      <ul>
      <li><Link to='/userDashboard'>HOME</Link></li>
        <li><Link to="/userMenu">MENU</Link></li>
        <li><Link to="/userAbout">About</Link></li>
        <li><Link to="/userGallery">GALLERY</Link></li>
        <li><Link to="/userContact">CONTACT</Link></li>
        <li><Link to="/userTable">RESERVATION</Link></li>
        <li><Link to="/userProfile">PROFILE</Link></li>
      </ul>
    </div>
    <div className="reservation-container">
      <div className="reservation-header">
        <h2>Table Reservation</h2>
      </div>
      <div className="add-reservation-item">
        <div className="field">
          <h5>Number of people</h5>
          <input
            type="number"
            placeholder="Number of People"
            name="numberOfPeople"
            value={newReservation.numberOfPeople}
            onChange={handleInputChange}
            onKeyDown={preventTyping} // Prevents typing
            min={1}
            max={16} // Maximum value set to 16
          />
        </div>
        <div className="field">
          <h5>Reservation date</h5>
          <input
            type="date"
            placeholder="Reservation Date"
            name="reservationDate"
            value={newReservation.reservationDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <h5>Reservation Time</h5>
          <input
            type="time"
            placeholder="Reservation Time"
            name="reservationTime"
            value={newReservation.reservationTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <h5>Description</h5>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={newReservation.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <h5>Table Number</h5>
          <input
            type="number"
            placeholder="Table Number"
            name="tableNumber"
            value={newReservation.tableNumber}
            onChange={handleInputChange}
            onKeyDown={preventTyping} // Prevents typing
            min={1}
            max={9} // Maximum value set to 9
          />
        </div>
        <button onClick={handleBookReservation} className="book-reservation-btn">Book Reservation</button>
      </div>
      <div className="image-section">
        <img src={Image}/>
      </div>
    </div>
    </div>
  );
};

export default Table;
