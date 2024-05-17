// AboutPage.js
import React, {useState} from 'react'
import '../About/userAbout.css';
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
    <div className="about-head">
    <h2>OUR TEAM</h2>
   </div>
    <div className="image-container">
      <div className="image-info">
      <img src={general} alt="general" />
      <h2>ETHAN THOPMSON</h2>
      <p>General Manager</p>
      </div>

      <div className="image-info">
      <img src={chef} alt="chef" />
      <h2>OLIVIA BENNETT</h2>
      <p>Executive Chef</p>
      </div>

      <div className="image-info">
      <img src ={bar}alt="bar" />
      <h2>NELSON THOMAS</h2>
      <p>Traditional Beverage Specialist</p>
      </div>
    
      
    </div>

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
          <h1>oneBytefood</h1>
          <div className="middle-container">
          <div className="middle">
          <a href="https://www.instagram.com/">
            <FaInstagram className="icons" />
          </a>
          </div>
          <div className="middle">
          <a href="https://www.facebook.com/">
            <FaFacebook className="icons" />
          </a>
          </div>
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
     
      </footer>
    </div>
  );
};

export default About;
