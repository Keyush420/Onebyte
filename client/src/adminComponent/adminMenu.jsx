import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './adminMenu.css'; // Import CSS file

const Menu = () => {
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    imageUrl: '',
  });

  const [menuItems, setMenuItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price && newMenuItem.imageUrl) {
      axios.post('http://localhost:3002/add_menu_item', newMenuItem)
        .then(response => {
          console.log('New Menu Item Added:', response.data);
          fetchMenuItems();
          setNewMenuItem({ name: '', price: '', imageUrl: '' });
        })
        .catch(error => {
          console.error('Error adding menu item:', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteMenuItem = (id) => {
    axios.delete(`http://localhost:3002/delete_menu_item/${id}`)
      .then(response => {
        console.log('Menu Item Deleted:', response.data);
        fetchMenuItems();
      })
      .catch(error => {
        console.error('Error deleting menu item:', error);
      });
  };

  const handleUpdateMenuItem = (id) => {
    setUpdateId(id);
    setIsUpdating(true);
    const menuItemToUpdate = menuItems.find(item => item.id === id);
    setNewMenuItem({
      name: menuItemToUpdate.name,
      price: menuItemToUpdate.price,
      imageUrl: menuItemToUpdate.imageUrl,
    });
  };

  const handleSubmitUpdate = () => {
    if (newMenuItem.name && newMenuItem.price && newMenuItem.imageUrl) {
      const updatedMenuItem = {
        name: newMenuItem.name,
        price: newMenuItem.price,
        imageUrl: newMenuItem.imageUrl,
      };

      axios.put(`http://localhost:3002/update_menu_item/${updateId}`, updatedMenuItem)
        .then(response => {
          console.log('Menu Item Updated:', response.data);
          fetchMenuItems();
          setIsUpdating(false);
          setUpdateId(null);
          setNewMenuItem({ name: '', price: '', imageUrl: '' });
        })
        .catch(error => {
          console.error('Error updating menu item:', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const fetchMenuItems = () => {
    axios.get('http://localhost:3002/menu_items')
      .then(response => {
        console.log(response.data); // Log the fetched menu items
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Menu</h2>
        <div className="add-menu-item">
          <input
            type="text"
            placeholder="Item Name"
            value={newMenuItem.name}
            onChange={e => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            value={newMenuItem.price}
            onChange={e => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMenuItem.imageUrl}
            onChange={e => setNewMenuItem({ ...newMenuItem, imageUrl: e.target.value })}
          />
          {isUpdating ? (
            <button onClick={handleSubmitUpdate} className="update-menu-btn">Update</button>
          ) : (
            <button onClick={handleAddMenuItem} className="add-menu-btn">Add Item</button>
          )}
        </div>
      </div>
      <div className="menu-list">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
              <button onClick={() => handleUpdateMenuItem(item.id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

