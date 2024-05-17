// ContactUs.js
import React, {useState} from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import "./userContact.css";

const Contact = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="contact-us-container">
      <div className="burger-icon" onClick={() => setShowNav(!showNav)}>
        <MenuIcon />
      </div>
      <div className={`sidenav ${showNav ? 'active' : ''}`}>
        <ul>
        <li><Link to='/userDashboard'>HOME</Link></li>
          <li><Link to="/userMenu">MENU</Link></li>
          <li><Link to="/userAbout">About</Link></li>
          <li><Link to="/userGallery">GALLERY</Link></li>
          <li><Link to="/userContact">CONTACT</Link></li>
          <li><Link to="/userTable">RESERVATION</Link></li>
          <li><Link to="/userProfile">PROFILE</Link></li>
          <li><Link to="/">LOG OUT</Link></li>
        </ul>
      </div>
      <div className="contact-info">
        <div>
          <h2>GET IN TOUCH</h2>
          <h3>CONTACT US</h3>
          <p>
            <strong>Opening hours:</strong> <br />
            Monday: Closed <br />
            Tuesday – Sunday: 10 AM – 10 PM
            <br />
            <strong>Brunch hours:</strong> <br />
            Tuesday – Sunday: 3 PM – Closing
          </p>
          <p>
            6214 Avenue U, Brooklyn, NY 11234 <br />
            (718) 489-9042 <br />
            info@yaffanyc.com
          </p>
        </div>
      </div>
      <div className="contact-form">
        <h2>Contact Us Form</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name (Required)</label>
            <div className="name-inputs">
              <input type="text" id="firstName" placeholder="First" />
              <input type="text" id="lastName" placeholder="Last" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email (Required)</label>
            <input type="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone (Required)</label>
            <input type="tel" id="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea id="comments" rows="4"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
