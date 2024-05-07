import React, {useState} from 'react'
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
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
    </div>
  )
}

export default Gallery
