import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Import our assets
import video from './LoginAssets/video.mp4';
import logo from './LoginAssets/logo.jpg';

// Imported Icons
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  // useState Hook to store inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if username or password is empty
    if (!username || !password) {
      console.error('Please enter both username and password');
      return;
    }

    // Call loginUser function if validation passes
    loginUser();
  };

  // Function to login user
  const loginUser = () => {
    // Send POST request to server
    Axios.post('http://localhost:3002/login', {
      username: username,
      password: password,
    })
      .then((response) => {
        console.log(response);

        if (response.data.message) {
          navigate('/'); // Redirect to '/' if login fails
        } else {
          navigate('/dashboard'); // Redirect to '/dashboard' if login succeeds
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <div className='loginPage flex'>
      <div className='container flex'>

        <div className='videoDiv'>
          <video src={video} autoPlay muted loop></video>

          <div className='textDiv'>
            <h2 className='title'>Create And Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>

          <div className='footerDiv flex'>
            <span className='text'>Don't have an account?</span>
            <Link to={'/register'}>
              <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>

        <div className='formDiv flex'>
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
          </div>

          <form onSubmit={handleSubmit} className='form grid'>
            <span className='message'>Login Status will go here</span>

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
              <span>Login</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className='forgotPassword'>
              Forgot Your Password? <a href="">Click Here</a>
            </span>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login;
