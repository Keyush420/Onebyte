import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from '../../LoginAssets/Restaurent.png';
import './userTable.css';
import MenuIcon from '@mui/icons-material/Menu';

const Table = () => {
  const [newReservation, setNewReservation] = useState({
    numberOfPeople: 1,
    reservationDate: '',
    reservationTime: '',
    description: '',
    tableNumber: 1,
    reservationName: '',
    username: '' // New field for username
  });

  const [reservations, setReservations] = useState([]);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation({ ...newReservation, [name]: value });
  };

  const handleBookReservation = () => {
    if (
      newReservation.reservationDate &&
      newReservation.reservationTime &&
      newReservation.numberOfPeople &&
      newReservation.description &&
      newReservation.tableNumber &&
      newReservation.reservationName &&
      newReservation.username
    ) {
      checkTableConflict(newReservation);
    } else {
      toast.warn("Please fill in all fields");
    }
  };

  const checkTableConflict = (reservation) => {
    axios.get('http://localhost:3002/userReservations')
      .then(response => {
        const existingReservations = response.data;
        const isConflict = existingReservations.some(existingReservation => 
          existingReservation.tableNumber === reservation.tableNumber &&
          existingReservation.reservationDate === reservation.reservationDate &&
          existingReservation.reservationTime === reservation.reservationTime
        );

        if (isConflict) {
          toast.error("The selected table is already reserved for the specified date and time.");
        } else {
          bookReservation(reservation);
        }
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
        toast.error("Error checking table availability. Please try again later.");
      });
  };

  const bookReservation = (reservation) => {
    axios
      .post("http://localhost:3002/book_reservation", reservation)
      .then((response) => {
        console.log("Reservation Booked:", response.data);
        fetchReservations();
        setNewReservation({
          numberOfPeople: 1,
          reservationDate: "",
          reservationTime: "",
          description: "",
          tableNumber: 1,
          reservationName: "",
          username: "",
        });
        toast.success("Your booking has been sent. Please wait for confirmation.");
      })
      .catch((error) => {
        console.error("Error booking reservation:", error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error booking reservation. Please try again later.");
        }
      });
  };

  const fetchReservations = () => {
    axios.get('http://localhost:3002/userReservations')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  };

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
          <li><Link to="/">LOG OUT</Link></li>
        </ul>
      </div>
      <div className="reservation-container">
        <div className="reservation-header">
          <h2>Table Reservation</h2>
        </div>
        <div className="add-reservation-item">
          <div className="field">
            <h5>Reservation Name</h5>
            <input
              type="text"
              placeholder="Reservation Name"
              name="reservationName"
              value={newReservation.reservationName}
              onChange={handleInputChange}
            />
          </div>
          <div className="field">
            <h5>Number of people</h5>
            <input
              type="number"
              placeholder="Number of People"
              name="numberOfPeople"
              value={newReservation.numberOfPeople}
              onChange={handleInputChange}
              onKeyDown={preventTyping}
              min={1}
              max={16}
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
              onKeyDown={preventTyping}
              min={1}
              max={9}
            />
          </div>
          <div className="name">
            <h3>Enter your username for verification</h3>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={newReservation.username}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button onClick={handleBookReservation} className="book-reservation-btn">Book Reservation</button>
        <div className="image-section">
          <img src={Image} alt="Restaurant"/>
        </div>
        <ToastContainer />
      </div>

      
      <footer className="footer">
        <div className="contact-info">
          <div>
            <h2>GET IN TOUCH</h2>
            <p>
              Kathmandu, Nepal <br />
              (718) 489-9042 <br />
              byteone@gmail.com
            </p>
          </div>
        </div>

        <div className="name">
          <h1>oneBytefood</h1>
          <div className="middle-container">
            <div className="middle">
              <a href="https://www.instagram.com/">
                <FaInstagram className="icons" />
              </a>
            </div>
            <div className="middle">
              <a href="https://www.facebook.com/">
                <FaFacebook className="icons" />
              </a>
            </div>
          </div>
        </div>

        <div className="time">
          <div>
            <p>
              <strong>Hours</strong> <br />
              Monday: Closed <br />
              Tuesday – Sunday: 10 AM – 10 PM
              <br />
              <strong>Brunch hours:</strong> <br />
              Tuesday – Sunday: 3 PM – Closing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

    

export default Table;
