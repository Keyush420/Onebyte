import React, {useState} from 'react'
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
const Menu = () => {
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
          <li><Link to="/reservation">MAKE RESERVATION</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Menu
