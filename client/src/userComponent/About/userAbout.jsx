import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import general from '../../LoginAssets/general.jpg';
import chef from '../../LoginAssets/chef.jpg';
import bar from '../../LoginAssets/bar.jpg';
import '../About/userAbout.css'; // Import your existing CSS

const About = () => {
  const [showNav, setShowNav] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ethanDescription = `
    Ethan Thompson is the General Manager at oneBytefood. With over 15 years of experience in the hospitality industry, 
    Ethan has a proven track record of excellence in managing high-end restaurants. He is known for his exceptional leadership skills, 
    attention to detail, and dedication to providing an outstanding dining experience for every guest. Ethan's passion for the culinary arts 
    and his commitment to operational excellence ensure that oneBytefood runs smoothly and efficiently.
  `;

  const oliviaDescription = `
    Olivia Bennett is the Executive Chef at oneBytefood. She specializes in contemporary cuisine with a traditional touch, 
    blending modern culinary techniques with classic flavors. Olivia has honed her skills at some of the most prestigious culinary institutions 
    and restaurants around the world. Her creativity and expertise in the kitchen are evident in every dish she creates, making her a favorite among both diners and colleagues. 
    Olivia's innovative approach to cooking and her dedication to using fresh, local ingredients make her an invaluable asset to the team.
  `;

  const nelsonDescription = `
    Nelson Thomas is the Traditional Beverage Specialist at oneBytefood. He crafts unique and classic drinks, bringing a wealth of knowledge and expertise to the bar. 
    Nelson has a deep understanding of mixology and a passion for creating cocktails that are both visually stunning and delicious. His ability to blend flavors 
    and create memorable drinking experiences has earned him a reputation as one of the best in the industry. Nelson's commitment to quality and his innovative spirit 
    make him a key player in enhancing the overall dining experience at oneBytefood.
  `;

  const handleImageClick = (desc) => {
    setModalContent(desc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    content: {
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '500px',
      width: '100%',
      position: 'relative',
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'transparent',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
    },
  };

  return (
    <div>
      <div className="burger-icon" onClick={() => setShowNav(!showNav)}>
        <MenuIcon />
      </div>
      <div className={`sidenav ${showNav ? 'active' : ''}`}>
        <ul>
          <li><Link to="/userDashboard">HOME</Link></li>
          <li><Link to="/userMenu">MENU</Link></li>
          <li><Link to="/userAbout">ABOUT</Link></li>
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
        <p>
          At oneBytefood, we're more than just a place to eat – we're a culinary experience.
          Nestled in the heart of [Kathmandu], our restaurant is where exceptional flavors meet warm hospitality.
          Our journey began with a simple yet profound passion for food. Drawing inspiration from local ingredients and global cuisines,
          our chefs craft dishes that tantalize the taste buds and ignite the senses.
          But it's not just about the food. It's about creating memorable moments, whether you're celebrating a special occasion
          or simply enjoying a casual meal with loved ones. Our inviting atmosphere and attentive staff ensure that every visit is
          a delightful culinary adventure.
          From our farm-fresh salads to our sizzling steaks, every dish tells a story of quality, creativity, and dedication.
          We take pride in sourcing the finest ingredients and infusing each recipe with love and care.
          At [oneBytefood], we're committed to excellence in every aspect of the dining experience. Whether you're joining us for brunch,
          lunch, or dinner, we invite you to sit back, relax, and savor the flavors of [oneBytefood].
          Thank you for choosing us. We look forward to serving you soon.
          Bon Appétit! services.
        </p>
      </div>

      <div className="about-head">
        <h2>OUR TEAM</h2>
      </div>
      <div className="image-container">
        <div className="image-info" onClick={() => handleImageClick(ethanDescription)}>
          <img src={general} alt="general" />
          <h2>ETHAN THOMPSON</h2>
          <p>General Manager</p>
        </div>

        <div className="image-info" onClick={() => handleImageClick(oliviaDescription)}>
          <img src={chef} alt="chef" />
          <h2>OLIVIA BENNETT</h2>
          <p>Executive Chef</p>
        </div>

        <div className="image-info" onClick={() => handleImageClick(nelsonDescription)}>
          <img src={bar} alt="bar" />
          <h2>NELSON THOMAS</h2>
          <p>Traditional Beverage Specialist</p>
        </div>
      </div>

      {isModalOpen && (
        <div style={modalStyles.overlay} onClick={closeModal}>
          <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
            <button style={modalStyles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <p>{modalContent}</p>
          </div>
        </div>
      )}

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
