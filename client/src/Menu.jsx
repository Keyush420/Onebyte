import React, { useState, useEffect } from 'react';
import './Menu.css';
import axios from 'axios';

const Menu = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  // Function to fetch menu items from the backend
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3002/menu_items');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Fetch menu items when the component mounts
  useEffect(() => {
    fetchMenuItems();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, price, imageUrl: image };

    try {
      const response = await axios.post('http://localhost:3002/menu', newItem);
      console.log(response.data.message);
      setName('');
      setPrice('');
      setImage('');
      // Fetch menu items again after adding a new item
      fetchMenuItems();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/menu_items/${id}`);
      // Fetch menu items again after deleting an item
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <div className="menu-container">
      <form onSubmit={handleSubmit} className="menu-form">
        <label className="form-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="form-input" />
        </label>
        {image && <img src={image} alt="Preview" className="preview-image" />}
        <br />
        <button type="submit" className="form-button">Add Item</button>
      </form>
      <div className="menu-table-container">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;