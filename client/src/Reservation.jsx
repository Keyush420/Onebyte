import React, { useState } from 'react';
import './App.css';

function App() {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    imageName: '',
    tableName: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReservation({ ...newReservation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReservations([...reservations, newReservation]);
    setNewReservation({
      imageName: '',
      tableName: '',
      date: '',
      time: ''
    });
  };

  const handleDelete = (index) => {
    const updatedReservations = reservations.filter((_, i) => i !== index);
    setReservations(updatedReservations);
  };

  return (
    <div className="App">
      <h1>Table Reservation Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="imageName"
          placeholder="Image URL"
          value={newReservation.imageName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tableName"
          placeholder="Table Name"
          value={newReservation.tableName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newReservation.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={newReservation.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Reservation</button>
      </form>
      <div className="reservations">
        {reservations.map((reservation, index) => (
          <div key={index} className="reservation">
            <img src={reservation.imageName} alt={reservation.tableName} />
            <div>
              <p>Table Name: {reservation.tableName}</p>
              <p>Date: {reservation.date}</p>
              <p>Time: {reservation.time}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
