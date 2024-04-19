// Dashboard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import './Dashboard.css';
import cake from '../../LoginAssets/cake.jpg'
import rum from '../../LoginAssets/rum.jpg'
import salad from '../../LoginAssets/salad.jpg'

const Dashboard = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="landing">
      <div className="burger-icon" onClick={() => setShowNav(!showNav)}>
        <MenuIcon />
      </div>
      <div className={`sidenav ${showNav ? 'active' : ''}`}>
        <ul>
          <li><Link to='/dashboard'>HOME</Link></li>
          <li><Link to="/menu">MENU</Link></li>
          <li><Link to="/about us">About</Link></li>
          <li><Link to="/gallery">GALLERY</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><Link to="/reservation">MAKE RESERVATION</Link></li>
        </ul>
      </div>
      <div className="main">
        <h1>ONE BYTE</h1>
      </div>
      <section className="menu">
        <div className="menuHeader">
          <div className="menuTauko">
            <h2>Our Menu</h2>
            <p>Explore our delicious dishes prepared by our talented chefs. Check our menu with the most vibrant dishes you'll ever see</p>
          </div>
          <div className="menuImage"></div>
        </div>
        <div className="branchMenu">
          <div className="salad">
            <h2>SALAD</h2>
            <h3>Greek</h3>
          </div>
          <div className="meatMain">
            <h2>MEAT</h2>
            <h3>Buff</h3>
          </div>
        </div>
        <div className="atag">
        <Link to="/menu">View Menu</Link>
        </div>
      </section>

      <section className="about">
        <div className="aboutHeader">
          <h2>About Us</h2>
          <p>Learn more about our history, mission, and values.</p>
          <div className="atag">
          <Link to="/about">Read More</Link>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="galleryHeader">
          <h2>Gallery</h2>
          <p>Take a visual tour of our restaurant and dishes.</p>
          <div className="galleryImage">
          <img src={cake} alt="cake" />
            <img src={rum} alt="cake" />
            <img src={salad} alt="cake" />
          </div>
          <div className="atag">
          <Link to="/gallery">View Gallery</Link>
          </div>
        </div>
      </section>

      <section className="contact">
      <div className="atag">
        <Link to="/contact">Contact Us</Link>
        </div>
        <p>Get in touch with us for reservations or any inquiries.</p>
      </section>

      <section className="reservation">
        <div className="reservationHeader">
        <h2>Make a Reservation</h2>
        <p>Book your table now for an unforgettable dining experience.</p>
        </div>
        <div className="atag">
        <Link to="/reservation">Reserve Now</Link>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
