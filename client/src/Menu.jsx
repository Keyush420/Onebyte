// import React, { useState } from 'react';
// import './Menu.css';

// const Menu = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState('');
//   const [menuItems, setMenuItems] = useState([]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newItem = { name, price, image };
//     setMenuItems([...menuItems, newItem]);
//     setName('');
//     setPrice('');
//     setImage('');
//   };

//   const handleDelete = (index) => {
//     const updatedMenuItems = menuItems.filter((_, i) => i !== index);
//     setMenuItems(updatedMenuItems);
//   };

//   return (
//     <div className="menu-container">
//       <form onSubmit={handleSubmit} className="menu-form">
//         <label className="form-label">
//           Name:
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
//         </label>
//         <br />
//         <label className="form-label">
//           Price:
//           <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" />
//         </label>
//         <br />
//         <label className="form-label">
//           Choose Image:
//           <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" />
//         </label>
//         {image && <img src={image} alt="Preview" className="preview-image" />}
//         <br />
//         <button type="submit" className="form-button">Add Item</button>
//       </form>
//       <table className="menu-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Image</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {menuItems.map((item, index) => (
//             <tr key={index}>
//               <td>{item.name}</td>
//               <td>{item.price}</td>
//               <td><img src={item.image} alt={item.name} className="menu-item-image" /></td>
//               <td><button onClick={() => handleDelete(index)} className="delete-button">Delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Menu;

import React, { useState } from 'react';
import './Reservation.css'; // Import your CSS file
import axios from 'axios';

const App = () => {
    const [name, setname] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
  
    const handleSubmit = async () => {
      const reservationData = {
        name: name,
        price: price,
        image: image,
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
          <label>Date:</label>
          <input type="date" value={date} onChange={handleDateChange} />
  
          <label>Time:</label>
          <input type="time" value={time} onChange={handleTimeChange} />
  
          <label>Number of Guests:</label>
          <input type="number" value={guests} onChange={handleGuestsChange} />
  
          <label className="note-label">Note:</label>
          <input className="note-input" type="text" value={note} onChange={handleNoteChange} />
  
          <button onClick={handleSubmit}>Submit</button>
          
          <a href="/reservationpage">Reservation page</a>
        </div>
      </div>
    );
  };
  
  export default App;
  