import React, { useState } from 'react';
import './Table.css';

const Table = () => {
  const [name, setName] = useState('');
  const [guestNumber, setGuestNumber] = useState('');
  const [status, setStatus] = useState('pending');
  const [location, setLocation] = useState('outside');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { 
      name, 
      guestNumber, 
      status, 
      location, 
      date,
      time
    };
    if (editIndex !== null) {
      const updatedData = tableData.map((item, index) => (index === editIndex ? newData : item));
      setTableData(updatedData);
      setEditIndex(null);
    } else {
      setTableData([...tableData, newData]);
    }
    setName('');
    setGuestNumber('');
    setStatus('pending');
    setLocation('outside');
    setDate(new Date().toLocaleDateString());
    setTime(new Date().toLocaleTimeString());
  };

  const handleEdit = (index) => {
    const data = tableData[index];
    setName(data.name);
    setGuestNumber(data.guestNumber);
    setStatus(data.status);
    setLocation(data.location);
    setDate(data.date);
    setTime(data.time);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Guest Number:
          <input type="number" value={guestNumber} onChange={(e) => setGuestNumber(e.target.value)} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
            <option value="pending">Pending</option>
            <option value="booked">Booked</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </label>
        <br />
        <label className="form-label">
          Location:
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
            <option value="outside">Outside</option>
            <option value="inside">Inside</option>
          </select>
        </label>
        <br />
        <label className="form-label">
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="form-input" />
        </label>
        <br />
        <button type="submit" className="form-button">{editIndex !== null ? 'Update' : 'Submit'}</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Guest Number</th>
            <th>Status</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.guestNumber}</td>
              <td>{data.status}</td>
              <td>{data.location}</td>
              <td>{data.date}</td>
              <td>{data.time}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;