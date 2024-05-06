import React, { useState } from 'react';
import '../adminApp.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import video from '../LoginAssets/video.mp4';
import logo from '../LoginAssets/logo.jpg';

import { MdMarkEmailRead } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setEmailError('Please fill in the email field');
      return;
    }

    if (!username) {
      setUsernameError('Please fill in the username field');
      return;
    }

    if (!password) {
      setPasswordError('Please fill in the password field');
      return;
    }

    createUser(email, username, password);
  };

  const createUser = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
        setPasswordError('Password must have at least 8 characters with at least one uppercase letter and one unique symbol');
        return;
    }

    Axios.get(`http://localhost:3002/checkUser?email=${email}&username=${username}`)
        .then((response) => {
            if (response.data.exists) {
                // User already exists with the given email or username
                if (response.data.existsEmail) {
                    setEmailError('User already exists with this email');
                }
                if (response.data.existsUsername) {
                    setUsernameError('User already exists with this username');
                }
            } else {
                // User does not exist, proceed to register
                Axios.post('http://localhost:3002/register', {
                    email: email,
                    username: username,
                    password: password,
                })
                    .then((response) => {
                        console.log('User has been created');
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                    });
            }
        })
        .catch((error) => {
            console.error('Error checking user:', error);
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
            <Link to={'/adminLogin'}>
              <button className='btn'>Login</button>
            </Link>
          </div>
        </div> 

        <div className='formDiv flex'>
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Let Us Know You!</h3>
          </div>

          <form onSubmit={handleSubmit} className='form grid'>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className='input flex'>
                <MdMarkEmailRead className='icon'/>
                <input type="email" id='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <span className="error">{emailError}</span>
            </div>
            
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className='input flex'>
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <span className="error">{usernameError}</span>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className='input flex'>
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <span className="error">{passwordError}</span>
            </div>

            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon'/>
            </button> 
          </form>
        </div>
      </div>    
    </div>
  );
};

export default Register;
