import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './adminTable.css'; // Import CSS file

const adminTable = () => {
  const [newTable, setNewTable] = useState({
    name: '',
    price: '',
    imageUrl: '',
    reservationDate: '',
    reservationTime: ''
  });

  const [tables, setTables] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchTables();
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
      axios.post('http://localhost:3002/add_table', newTable)
        .then(response => {
          console.log('New Table Added:', response.data);
          fetchTables();
          setNewTable({ name: '', price: '', imageUrl: '', reservationDate: '', reservationTime: '' });
        })
        .catch(error => {
          console.error('Error adding table:', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteTable = (id) => {
    axios.delete(`http://localhost:3002/delete_table/${id}`)
      .then(response => {
        console.log('Table Deleted:', response.data);
        // Fetch updated table data after deletion
        fetchTables();
      })
      .catch(error => {
        console.error('Error deleting table:', error);
      });
  };


  const handleUpdateTable = (id) => {
    setUpdateId(id);
    setIsUpdating(true);
    const tableToUpdate = tables.find(table => table.id === id);
    setNewTable({
      name: tableToUpdate.name,
      price: tableToUpdate.price,
      imageUrl: tableToUpdate.imageUrl,
      reservationDate: tableToUpdate.reservationDate,
      reservationTime: tableToUpdate.reservationTime
    });
  };

  const handleSubmitUpdate = () => {
    if (newTable.name && newTable.price && newTable.imageUrl && newTable.reservationDate && newTable.reservationTime) {
      // Format the reservation date to 'yyyy-MM-dd' format
      const formattedReservationDate = new Date(newTable.reservationDate).toISOString().split('T')[0];

      // Create the updated table object with the formatted date
      const updatedTable = {
        name: newTable.name,
        price: newTable.price,
        imageUrl: newTable.imageUrl,
        reservationDate: formattedReservationDate, // Use the formatted date
        reservationTime: newTable.reservationTime
      };

      axios.put(`http://localhost:3002/update_table/${updateId}`, updatedTable)
        .then(response => {
          console.log('Table Updated:', response.data);
          fetchTables();
          setIsUpdating(false);
          setUpdateId(null);
          setNewTable({ name: '', price: '', imageUrl: '', reservationDate: '', reservationTime: '' });
        })
        .catch(error => {
          console.error('Error updating table:', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const fetchTables = () => {
    axios.get('http://localhost:3002/tables')
      .then(response => {
        // Format reservation dates before setting the state
        const formattedTables = response.data.map(table => ({
          ...table,
          reservationDate: formatDate(table.reservationDate)
        }));
        setTables(formattedTables);
      })
      .catch(error => {
        console.error('Error fetching tables:', error);
      });
  };


  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Table For Reservation</h2>
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
            <button onClick={handleAddTable} className="add-table-btn">Add Table</button>
          )}
        </div>
      </div>
      <div className="table-list">
        {tables.map(table => (
          <div key={table.id} className="table-item">
            <img src={table.imageUrl} alt="Table" />
            <div className="item-details">
              <h3>{table.name}</h3>
              <p>Price: {table.price}</p>
              <p>Reservation Date: {table.reservationDate}</p>
              <p>Reservation Time: {table.reservationTime}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleDeleteTable(table.id)}>Delete</button>
              <button onClick={() => handleUpdateTable(table.id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default adminTable;