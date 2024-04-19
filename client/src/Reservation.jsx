import React, { useState } from 'react';
import './Reservation.css'; // Import your CSS file
import axios from 'axios';

const App = () => {
    const [name, setName] = useState('');
    const [guests, setGuests] = useState('');
    const [status, setStatus] = useState('pending');
    const [location, setLocation] = useState('outside');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');
  
    const handleSubmit = async () => {
      const reservationData = {
        name: name,
        guests: guests,
        status: status,
        location: location,
        date: date,
        time: time,
        note: note,
      };
  
      try {
        const response = await axios.post('http://localhost:3002/reserve', reservationData);
        console.log(response.data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const handleDateChange = (e) => setDate(e.target.value);
    const handleTimeChange = (e) => setTime(e.target.value);
    const handleGuestsChange = (e) => {
      const value = e.target.value;
      if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
        setGuests(value);
      }
    };
    const handleNoteChange = (e) => setNote(e.target.value);
  
    return (
      <div className="container-wrapper">
        <div className="container">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Number of Guests:</label>
          <input type="number" value={guests} onChange={handleGuestsChange} />

          <label className="form-label">
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
              <option value="pending">Pending</option>
              <option value="booked">Booked</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </label>

          <label className="form-label">
            Location:
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
              <option value="outside">Outside</option>
              <option value="inside">Inside</option>
            </select>
          </label>

          <label>Date:</label>
          <input type="date" value={date} onChange={handleDateChange} />
  
          <label>Time:</label>
          <input type="time" value={time} onChange={handleTimeChange} />
  
          <label className="note-label">Note:</label>
          <input className="note-input" type="text" value={note} onChange={handleNoteChange} />
  
          <button onClick={handleSubmit}>Submit</button>
          
          <a href="/reservationpage">Reservation page</a>
        </div>
      </div>
    );
};

export default App;
