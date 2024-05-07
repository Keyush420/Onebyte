import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../adminComponent/adminTable.css'; // Import CSS file

const Table = () => {
  const [newTable, setNewTable] = useState({
    name: '',
    price: '',
    imageUrl: '',
    reservationDate: '',
    reservationTime: ''
  });

  const [reservations, setReservations] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If the input field is for reservationDate, format the value to 'yyyy-M-d'
    const formattedValue = name === 'reservationDate' ? formatDate(value) : value;
    
    setNewTable({ ...newTable, [name]: formattedValue });
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate();
  
    // Ensure single digits have leading zeroes
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  };  

  const handleAddTable = () => {
    if (newTable.name && newTable.price && newTable.imageUrl && newTable.reservationDate && newTable.reservationTime) {
      axios.post('http://localhost:3002/add_reservation', newTable)
        .then(response => {
          console.log('New Reservation Added:', response.data);
          fetchReservations();
          setNewTable({ name: '', price: '', imageUrl: '', reservationDate: '', reservationTime: '' });
        })
        .catch(error => {
          console.error('Error adding reservation:', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteTable = (id) => {
    axios.delete(`http://localhost:3002/delete_reservation/${id}`)
      .then(response => {
        console.log('Reservation Deleted:', response.data);
        // Fetch updated reservation data after deletion
        fetchReservations();
      })
      .catch(error => {
        console.error('Error deleting reservation:', error);
      });
  };
  

  const handleUpdateTable = (id) => {
    setUpdateId(id);
    setIsUpdating(true);
    const reservationToUpdate = reservations.find(reservation => reservation.id === id);
    setNewTable({
      name: reservationToUpdate.name,
      price: reservationToUpdate.price,
      imageUrl: reservationToUpdate.imageUrl,
      reservationDate: reservationToUpdate.reservationDate,
      reservationTime: reservationToUpdate.reservationTime
    });
  };

  const handleSubmitUpdate = () => {
    if (newTable.name && newTable.price && newTable.imageUrl && newTable.reservationDate && newTable.reservationTime) {
      // Format the reservation date to 'yyyy-MM-dd' format
      const formattedReservationDate = new Date(newTable.reservationDate).toISOString().split('T')[0];
  
      // Create the updated reservation object with the formatted date
      const updatedReservation = {
        name: newTable.name,
        price: newTable.price,
        imageUrl: newTable.imageUrl,
        reservationDate: formattedReservationDate, // Use the formatted date
        reservationTime: newTable.reservationTime
      };
  
      axios.put(`http://localhost:3002/update_reservation/${updateId}`, updatedReservation)
        .then(response => {
          console.log('Reservation Updated:', response.data);
          fetchReservations();
          setIsUpdating(false);
          setUpdateId(null);
          setNewTable({ name: '', price: '', imageUrl: '', reservationDate: '', reservationTime: '' });
        })
        .catch(error => {
          console.error('Error updating reservation:', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const fetchReservations = () => {
    axios.get('http://localhost:3002/userreservations')
      .then(response => {
        // Format reservation dates before setting the state
        const formattedReservations = response.data.map(reservation => ({
          ...reservation,
          reservationDate: formatDate(reservation.reservationDate)
        }));
        setReservations(formattedReservations);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  };
  

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Reservations</h2>
        <div className="add-table-item">
          <input
            type="text"
            placeholder="Table Name"
            name="name"
            value={newTable.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={newTable.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={newTable.imageUrl}
            onChange={handleInputChange}
          />
          <input
            type="date"
            placeholder="Reservation Date"
            name="reservationDate"
            value={newTable.reservationDate}
            onChange={handleInputChange}
          />
          <input
            type="time"
            placeholder="Reservation Time"
            name="reservationTime"
            value={newTable.reservationTime}
            onChange={handleInputChange}
          />
          {isUpdating ? (
            <button onClick={handleSubmitUpdate} className="update-table-btn">Update</button>
          ) : (
            <button onClick={handleAddTable} className="add-table-btn">Add Reservation</button>
          )}
        </div>
      </div>
      <div className="table-list">
        {reservations.map(reservation => (
          <div key={reservation.id} className="table-item">
            <img src={reservation.imageUrl} alt="Table" />
            <div className="item-details">
              <h3>{reservation.name}</h3>
              <p>Price: {reservation.price}</p>
              <p>Reservation Date: {reservation.reservationDate}</p>
              <p>Reservation Time: {reservation.reservationTime}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleDeleteTable(reservation.id)}>Delete</button>
              <button onClick={() => handleUpdateTable(reservation.id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
