import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <ul>
        {reservations.map((reservation, index) => (
          <li key={index}>
            <p>Name: {reservation.name}</p>
            <p>Guests: {reservation.guests}</p>
            <p>Status: {reservation.status}</p>
            <p>Location: {reservation.location}</p>
            <p>Date: {reservation.date}</p>
            <p>Time: {reservation.time}</p>
            <p>Note: {reservation.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsPage;
