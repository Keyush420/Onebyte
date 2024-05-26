import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./userContact.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [showNav, setShowNav] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    ph_num: "",
    message: ""
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_dze6wed", "template_2pyk0oz", form.current, "2NwL35lIkcC9LEYnx")
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Email sent successfully!");
          setFormData({
            user_name: "",
            user_email: "",
            ph_num: "",
            message: ""
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed to send email.");
        }
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="contact-us-container">
      <div className="burger-icon" onClick={() => setShowNav(!showNav)}>
        <MenuIcon />
      </div>
      <div className={`sidenav ${showNav ? 'active' : ''}`}>
        <ul>
          <li><Link to='/userDashboard'>Home</Link></li>
          <li><Link to="/userMenu">Menu</Link></li>
          <li><Link to="/userAbout">About</Link></li>
          <li><Link to="/userGallery">Gallery</Link></li>
          <li><Link to="/userContact">Contact</Link></li>
          <li><Link to="/userTable">Reservations</Link></li>
          <li><Link to="/">LogOut</Link></li>
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
        <form ref={form} onSubmit={sendEmail}>
          <div className="form-group">
            <label htmlFor="name">Name (Required)</label>
            <div className="name-inputs">
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email (Required)</label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone (Required)</label>
            <input
              type="tel"
              name="ph_num"
              value={formData.ph_num}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>
          <input type="submit" className="button" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
