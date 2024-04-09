import React, { useState } from 'react';
import './Table.css'; // Import CSS file for styling

const Table = () => {
  const [tables, setTables] = useState([
    { name: 'Two seat Table', price: 500, imageUrl: 'https://img.freepik.com/premium-photo/sign-with-text-10-off-restaurant_872074-21405.jpg?w=1060' },
    { name: 'Single Sitting', price: 350, imageUrl: 'https://img.freepik.com/free-photo/businessman-with-protective-face-mask-using-touchpad-cafe_637285-8913.jpg?size=626&ext=jpg&ga=GA1.1.1927692380.1712591530&semt=ais' },
    { name: 'Combo Table Sitting', price: 900, imageUrl: 'https://img.freepik.com/free-photo/happy-couple-making-order-cafe-while-waiter-is-showing-them-menu-digital-table_637285-529.jpg?w=1480&t=st=1712591833~exp=1712592433~hmac=bc9135beee3bce15e8945fbe589fbec0987521205417d207dfca20c936b27caf' }
  ]);

  const [newTable, setNewTable] = useState({
    name: '',
    price: '',
    imageUrl: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTable({ ...newTable, [name]: value });
  };

  const handleAddTable = () => {
    setTables([...tables, newTable]);
    setNewTable({ name: '', price: '', imageUrl: '' }); // Clear input fields after adding the table
    console.log('New Table Added:', newTable);
  };

  return (
    <div>
      <div className="table-header">
        <h2>Table For Reservation</h2>
        <div>
          <button onClick={handleAddTable} className="add-table-btn">Add Table</button>
          <button onClick={() => console.log('Update Table clicked')} className="add-table-btn">Update Table</button>
          <button onClick={() => console.log('Delete Table clicked')} className="add-table-btn">Delete Table</button>
        </div>
      </div>
      <div className="table-list">
        {tables.map((table, index) => (
          <div key={index} className="table-box">
            <img src={table.imageUrl} alt={table.name} className="table-image" />
            <div className="table-details">
              <div className="table-name">{table.name}</div>
              <div className="table-price">Price: ${table.price}</div>
              <button className="view-details-btn">View Details</button>
              <button className="book-now-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
