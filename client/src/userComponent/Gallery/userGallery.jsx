import React, {useState} from 'react'
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import './userGallery.css';
import burger from '../../LoginAssets/burger.jpg';
import momo from '../../LoginAssets/momo.jpg';
import pizza from '../../LoginAssets/pizza.jpg';
import macha from '../../LoginAssets/macha.jpg';
import orange from '../../LoginAssets/orange.jpg';
import sushi from '../../LoginAssets/sushi.jpg';
import straw from '../../LoginAssets/straw.jpg';
import soup from '../../LoginAssets/soup.jpg';
import kimbap from '../../LoginAssets/kimbap.jpg';

const Gallery = () => {
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
      <div className="gallery">
      <img src={burger} alt="burger" />
      <img src={momo} alt="momo" />
      <img src={pizza} alt="pizza" />
      <img src={macha} alt="macha" />
      <img src={orange} alt="orange" />
      <img src={sushi} alt="sushi" />
      <img src={straw} alt="straw" />
      <img src={soup} alt="soup" />
      <img src={kimbap} alt="kimbap" />
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

export default Gallery
