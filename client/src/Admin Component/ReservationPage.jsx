import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reservation.css'; // Import your CSS file

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="reservations-page">
      <h1>Reservations</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.name}</td>
              <td>{reservation.guests}</td>
              <td>{reservation.status}</td>
              <td>{reservation.location}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>{reservation.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsPage;

