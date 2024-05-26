import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import './userDashboard.css';
import cake from '../../LoginAssets/cake.jpg'
import salad from '../../LoginAssets/salad.jpg'
import lunch from '../../LoginAssets/lunch.jpg'
import dinner from '../../LoginAssets/dinner.jpg'
import oreo from '../../LoginAssets/oreo.jpg'
import dessert from '../../LoginAssets/dessert.jpg'
import about from '../../LoginAssets/about.jpg'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Dashboard = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="landing">
      <div className="burger-icon" onClick={() => setShowNav(!showNav)}>
        <MenuIcon />
      </div>
        <div className={`sidenav ${showNav ? 'active' : ''}`}>
        <ul>
          <li><Link to='/userDashboard'>HOME</Link></li>
          <li><Link to="/userMenu">MENU</Link></li>
          <li><Link to="/userAbout">ABOUT</Link></li>
          <li><Link to="/userGallery">GALLERY</Link></li>
          <li><Link to="/userContact">CONTACT</Link></li>
          <li><Link to="/userTable">RESERVATION</Link></li>
          <li><Link to="/">LOG OUT</Link></li>
        </ul>
      </div>
     
      <div className="main">
        <h1>ONE BYTE</h1>
      </div>
      <section className="menu">  
        <div className="menuHeader">
          <div className="menuTauko">
            <h2>Menus</h2>
          </div>
          <p>You can view our menu items from here. All and everything is exquisite and will make your taste buds tingle with joy.
          </p>
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
      <hr />
      <section className="galleryMain">
        <div className="galleryHeader">
          <h2>Gallery</h2>
          <p>Take a visual tour of our restaurant and dishes.</p>
          <div className="galleryImage">
            <img src={cake} alt="cake" />
            <img src={oreo} alt="dinner" />
            <img src={salad} alt="cake" />
          </div>
          <div className="atag">
            <Link to="/userGallery">View Gallery</Link>
          </div>
        </div>
      </section>
      <hr />
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


export default Dashboard;