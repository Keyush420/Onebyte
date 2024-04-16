import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, price, image };
    setMenuItems([...menuItems, newItem]);
    setName('');
    setPrice('');
    setImage('');
  };

  const handleDelete = (index) => {
    const updatedMenuItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedMenuItems);
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
          Choose Image:
          <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" />
        </label>
        {image && <img src={image} alt="Preview" className="preview-image" />}
        <br />
        <button type="submit" className="form-button">Add Item</button>
      </form>
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
          {menuItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td><img src={item.image} alt={item.name} className="menu-item-image" /></td>
              <td><button onClick={() => handleDelete(index)} className="delete-button">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;

