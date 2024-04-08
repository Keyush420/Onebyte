import React, { useState } from 'react';
// import './Register.css';
import '../../App.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// Import our assets
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.jpg';

// Imported Icons
import { MdMarkEmailRead } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Register = () => {

    // useState to hold our inputs
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    createUser(email, username, password); // Call createUser function
  };

  // Function to create user
  const createUser = () => {
    // Send POST request to server
    Axios.post('http://localhost:3002/register', {
      email: email,
      username: username,
      password: password, // Corrected typo here
    })
      .then((response) => {
        console.log('User has been created');
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };  


  return (
    <div className='registerPage flex'>
      <div className='container flex'>

        <div className='videoDiv'>
          <video src={video} autoPlay muted loop></video>

          <div className='textDiv'>
            <h2 className='title'>Create And Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>

          <div className='footerDiv flex'>
            <span className='text'>Already have an account?</span>
            <Link to={'/login'}>
              <button className='btn'>Login</button>
            </Link>
          </div>
        </div> 

        <div className='formDiv flex'>
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Let Us Know You!</h3>
          </div>

          <form onSubmit={handleSubmit}className='form grid'>
          {/* <span className='showMessage'>Register Status will go here</span> */}

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className='input flex'>
                <MdMarkEmailRead className='icon'/>
                <input type="email" id='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
            
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className='input flex'>
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className='input flex'>
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon'/>
            </button> 

            {/* <span className='forgotPassword'>
              Forgot Your Password? <a href="">Click Here</a>
            </span>   */}
          </form>
        </div>

      </div>    
    </div>
  )
}

export default Register