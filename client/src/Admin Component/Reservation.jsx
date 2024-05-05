// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Reservation.css'; // Import your CSS file

// const Reservation = () => {
//     const [name, setName] = useState('');
//     const [guests, setGuests] = useState('');
//     const [status, setStatus] = useState('pending');
//     const [location, setLocation] = useState('outside');
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     const [note, setNote] = useState('');
//     const [reservations, setReservations] = useState([]);

//     useEffect(() => {
//         // Fetch data from the server
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3002/reservations');
//                 setReservations(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleSubmit = async () => {
//         const reservationData = {
//             name: name,
//             guests: guests,
//             status: status,
//             location: location,
//             date: date,
//             time: time,
//             note: note,
//         };

//         try {
//             const response = await axios.post('http://localhost:3002/reserve', reservationData);
//             console.log(response.data.message);
//             // After successfully submitting the reservation, fetch the updated data
//             fetchData();
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleDateChange = (e) => setDate(e.target.value);
//     const handleTimeChange = (e) => setTime(e.target.value);
//     const handleGuestsChange = (e) => {
//         const value = e.target.value;
//         if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
//             setGuests(value);
//         }
//     };
//     const handleNoteChange = (e) => setNote(e.target.value);

//     return (
//         <div className="container-wrapper">
//             <div className="containerreservation">
//                 <label>Name:</label>
//                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

//                 <label>Number of Guests:</label>
//                 <input type="number" value={guests} onChange={handleGuestsChange} />

//                 <label className="form-label">
//                     Status:
//                     <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
//                         <option value="pending">Pending</option>
//                         <option value="booked">Booked</option>
//                         <option value="unassigned">Unassigned</option>
//                     </select>
//                 </label>

//                 <label className="form-label">
//                     Location:
//                     <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
//                         <option value="outside">Outside</option>
//                         <option value="inside">Inside</option>
//                     </select>
//                 </label>

//                 <label>Date:</label>
//                 <input type="date" value={date} onChange={handleDateChange} />

//                 <label>Time:</label>
//                 <input type="time" value={time} onChange={handleTimeChange} />

//                 <label className="note-label">Note:</label>
//                 <input className="note-input" type="text" value={note} onChange={handleNoteChange} />

//                 <button onClick={handleSubmit}>Submit</button>

//                 <a href="/reservationpage">Reservation page</a>
//             </div>
//         </div>
//     );
// };

// export default Reservation;

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
