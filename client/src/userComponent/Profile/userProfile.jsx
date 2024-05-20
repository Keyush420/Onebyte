import React, {useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";


const Profile = () => {
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
          </ul>
        </div>

        <div className="account">
            <div className="account-header">
                <h1>MY ACCOUNT</h1>
                <button className="back">Log Out</button>
            </div>
            <h2>ORDER HISTORY</h2>
            <p>You havent reserverd yet</p>

            <h2>ACCOUNT DETAILS</h2>
            
            
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

export default Profile;