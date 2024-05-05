// AboutPage.js
import React, {useState} from 'react'
import './About.css';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const About = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div>
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
          <li><Link to="/reservation">RESERVATION</Link></li>
          <li><Link to="/profile">PROFILE</Link></li>
        </ul>
      </div>
    <div className="about-container">
      <h1>About Us</h1>
      <p>Welcome to Onebyte</p>

<p>At oneBytefood, we're more than just a place to eat – we're a culinary experience. Nestled in the heart of [Kathmandu], our restaurant is where exceptional flavors meet warm hospitality.

Our journey began with a simple yet profound passion for food. Drawing inspiration from local ingredients and global cuisines, our chefs craft dishes that tantalize the taste buds and ignite the senses.

But it's not just about the food. It's about creating memorable moments, whether you're celebrating a special occasion or simply enjoying a casual meal with loved ones. Our inviting atmosphere and attentive staff ensure that every visit is a delightful culinary adventure.

From our farm-fresh salads to our sizzling steaks, every dish tells a story of quality, creativity, and dedication. We take pride in sourcing the finest ingredients and infusing each recipe with love and care.

At [oneBytefood], we're committed to excellence in every aspect of the dining experience. Whether you're joining us for brunch, lunch, or dinner, we invite you to sit back, relax, and savor the flavors of [oneBytefood].

Thank you for choosing us. We look forward to serving you soon.

Bon Appétit! services.</p>
    
    </div>

    </div>
  );
};

export default About;
