import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FaBell } from "react-icons/fa";
import './userDashboard.css';
import cake from '../../LoginAssets/cake.jpg'
import salad from '../../LoginAssets/salad.jpg'
import lunch from '../../LoginAssets/lunch.jpg'
import dinner from '../../LoginAssets/dinner.jpg'
import dessert from '../../LoginAssets/dessert.jpg'
import about from '../../LoginAssets/about.jpg'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNav, setShowNav] = useState(false);

  // Assume the username is available
  const username = ""; // Replace this with actual logic to get the logged-in username

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:3002/notifications/${username}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  const toggleMenuDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setShowMenu(open);
  };

  const toggleNotificationsDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setShowNotifications(open);
  };

  return (
    <div className="landing">
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
      <div className="notifi" onClick={toggleNotificationsDrawer(true)}>
        <FaBell />
      </div>
      <Drawer
        anchor="right"
        open={showNotifications}
        onClose={toggleNotificationsDrawer(false)}
      >
        <div className="notifications">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification.message}</li>
            ))}
          </ul>
        </div>
      </Drawer>
      <div className="main">
        <h1>ONE BYTE</h1>
      </div>
      <section className="menu">  
        <div className="menuHeader">
          <div className="menuTauko">
            <h2>Menus</h2>
          </div>
          <div className="menuImage">
            <img src={lunch} alt="lunch" />
            <img src={dinner} alt="dinner" />
            <img src={dessert} alt="dessert" />
          </div>
        </div>
        
        <div className="atag">
          <Link to="/userMenu">View All</Link>
        </div>
      </section>

      <section className="about">
        <div className="aboutHeader">
          <h2>About Us</h2>
          <div className="aboutbody">
            <div className="aboutImage">
              <img src={about} alt="about" />
            </div>
            <div className="abouttext">
              At Onebyte, we're more than just a place to eat – we're a culinary experience. Nestled in the heart of [Kathmandu], our restaurant is where exceptional flavors meet warm hospitality.

              Our journey began with a simple yet profound passion for food. Drawing inspiration from local ingredients and global cuisines, our chefs craft dishes that tantalize the taste buds and ignite the senses.

              But it's not just about the food. It's about creating memorable moments, whether you're celebrating a special occasion or simply enjoying a casual meal with loved ones. Our inviting atmosphere and attentive staff ensure that every visit is a delightful culinary adventure.
            </div>
          </div>
          <div className="atag">
            <Link to="/userAbout">Read More</Link>
          </div>
        </div>
      </section>
      <section className="gallery">
        <div className="galleryHeader">
          <h2>Gallery</h2>
          <p>Take a visual tour of our restaurant and dishes.</p>
          <div className="galleryImage">
            <img src={cake} alt="cake" />
            <img src={dinner} alt="dinner" />
            <img src={salad} alt="cake" />
          </div>
          <div className="atag">
            <Link to="/userGallery">View Gallery</Link>
          </div>
        </div>
      </section>
      <section className="reservation">
        <div className="reservationHeader">
          <h2>Make a Reservation</h2>
          <p>Book your table now for an unforgettable dining experience.</p>
        </div>
        <div className="atag">
          <Link to="/userTable">Reserve Now</Link>
        </div>
      </section>
      <footer className="footer">
        <div className="contact-info">
          <div>
            <h2>GET IN TOUCH</h2>
            <p>
              Kathmandu, Nepal <br />
              (718) 489-9042 <br />
              byteone@gmail.com
            </p>
          </div>
        </div>
        <div className="name">
          <div>
            <h1>oneBytefood</h1>
          </div>
        </div>
        <div className="time">
          <div>
            <p>
              <strong>Hours</strong> <br />
              Monday: Closed <br />
              Tuesday – Sunday: 10 AM – 10 PM
              <br />
              <strong>Brunch hours:</strong> <br />
              Tuesday – Sunday: 3 PM – Closing
            </p>
          </div>
        </div>
        <div className="social-links">
          <div className="socialIcons">
            <a href="https://www.instagram.com/">
              <FaInstagram className="icons" />
            </a>
            <a href="https://www.facebook.com/">
              <FaFacebook className="icons" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
