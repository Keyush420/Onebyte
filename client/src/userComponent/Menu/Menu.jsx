import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import eating from '../../LoginAssets/eating.jpg'
import './Menu.css';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";


const Menu = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeMenu, setActiveMenu] = useState('brunch');

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
  };

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
          <li><Link to="/profile">PROFILE</Link></li>
        </ul>
      </div>
      <div className="imageMenu">
        <img src={eating} alt="eating" />
      </div>
      <div className="menu-sections">
        <div className="section-box">
          {/* Placeholder for lunch items */}
          <h1>{activeMenu === 'brunch' ? 'BRUNCH HOURS (10AM - 2PM)' : activeMenu === 'lunch' ? 'LUNCH HOURS (3PM - 5PM)' : activeMenu === 'dinner' ? 'DINNER HOURS (10AM - 2PM)' : ''}</h1>
          <ul>
            {activeMenu === 'brunch' && (
              <>
             <h2>Beverages</h2>
                <li>Freshly squeezed orange juice - NPR 150</li>
                <li>Mimosa - NPR 350</li>
                <li>Bloody Mary - NPR 400</li>
                <li>Iced coffee - NPR 200</li>
                <li>Hot tea selection - NPR 150</li>
                <li>Sparkling water with fruit garnish - NPR 200</li>
                

              <h2>Main Courses</h2>
                <li>Egg Sandwich - NPR 150</li>
                <li>Vegetable Omelette - NPR 120</li>
                <li>Pancakes with Syrup - NPR 180</li>
                <li>Fried Rice with Egg - NPR 200</li>
               

              <h2>Sides</h2>
                <li>Toast with Butter and Jam - NPR 50</li>
                <li>Hash Browns - NPR 80</li>
                <li>Fruit Salad - NPR 100</li>
                

              </>
              
            )}
            {activeMenu === 'lunch' && (
              <>
                <h2>Appetizers</h2>
                <li>Lobster Bisque with Herb Croutons - NPR 600</li>
                <li>Seared Foie Gras with Fig Compote - NPR 800</li>
                <li>Tempura Shrimp with Ponzu Dipping Sauce - NPR 700</li>
               
              <h2>Main Courses</h2>
                <li>Grilled Salmon with Lemon-Dill Sauce - NPR 850</li>
                <li>Beef Wellington with Truffle Mash and Red Wine Jus - NPR 1200</li>
                <li>Mushroom Risotto with Parmesan Crisps - NPR 650</li>
                <li>Duck Confit with Orange Gastrique and Roasted Potatoes - NPR 900</li>
                <li>Seafood Paella with Saffron Aioli - NPR 1000</li>

                <h2>Sides</h2>
                <li>Truffle Fries - NPR 350</li>
                <li>Grilled Asparagus with Hollandaise - NPR 400</li>
                <li>Wild Rice Pilaf - NPR 300</li>

                <h2>Desserts</h2>
                <li>Crème Brûlée with Fresh Berries - NPR 450</li>
                <li>Flourless Chocolate Torte with Raspberry Coulis - NPR 500</li>
                <li>Tiramisu with Espresso Anglaise - NPR 480</li>

                <h2>Beverages</h2>
                <li>Champagne (per glass) - NPR 1200</li>
                <li>White Wine (per bottle) - NPR 2000</li>
                <li>Red Wine (per bottle) - NPR 2200</li>
                <li>Craft Cocktails - Prices vary, starting from NPR 800</li>
              </>
            )}
            {activeMenu === 'dinner' && (
              <>
                <h2>Soups and Salads</h2>
                <li>Butternut Squash Soup with Toasted Pumpkin Seeds - NPR 500</li>
                <li>Classic Caesar Salad with Garlic Croutons - NPR 450</li>
                <li>Waldorf Salad with Apples, Celery, Grapes, and Walnuts - NPR 550</li>
                
                <h2>Main Courses-Seafood</h2>
                <li>Grilled Lobster Tails with Lemon Butter - NPR 1800</li>
                <li>Pan-Seared Sea Bass with Herb Beurre Blanc - NPR 1500</li>
                <li>Shrimp Scampi with Linguine - NPR 1200</li>
                
                <h2>Main Courses-Meat</h2>
                <li>Filet Mignon with Red Wine Reduction - NPR 2000</li>
                <li>Rack of Lamb with Mint Chimichurri - NPR 1800</li>
                <li>Chicken Piccata with Capers and Lemon Caper Sauce - NPR 1000</li>
                
                <h2>Vegetarian Main Courses</h2>
                <li>Eggplant Parmesan with Marinara Sauce - NPR 900</li>
                <li>Wild Mushroom Risotto with Truffle Oil - NPR 1200</li>
                <li>Stuffed Bell Peppers with Quinoa and Ratatouille - NPR 800</li>

                <h2>Sides</h2>
                <li>Truffle Mashed Potatoes - NPR 400</li>
                <li>Grilled Asparagus with Hollandaise - NPR 450</li>
                <li>Garlic Butter Roasted Potatoes - NPR 350</li>
               
                <h2>Desserts</h2>
                <li>Molten Chocolate Lava Cake with Vanilla Ice Cream - NPR 600</li>
                <li>Tiramisu with Espresso Anglaise - NPR 550</li>
                <li>Crème Brûlée with Fresh Berries - NPR 500</li>
               
                <h2>Beverages</h2>
                <li>Wine Selection (per bottle) - Prices vary, starting from NPR 1500</li>
                <li>Signature Cocktails - Prices vary, starting from NPR 800</li>
                <li>Digestifs (e.g., Cognac, Port Wine) - Prices vary, starting from NPR 1000</li> 
              </>
            )}
          </ul>
        </div>
        <div className='atag'>
          <button onClick={() => handleMenuChange('brunch')}>Brunch</button>
        </div>

        <div className='atag'>
          <button onClick={() => handleMenuChange('lunch')}>Lunch</button>
        </div>

        <div className='atag'>
          <button onClick={() => handleMenuChange('dinner')}>Dinner</button>
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
        <div className="social-linksIcons">
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
};

export default Menu;
