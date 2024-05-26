import React, { useState } from 'react';
import '../../userApp.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Import our assets
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.jpg';

// Imported Icons
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();

    if (!loginUserName.trim() || !loginPassword.trim()) {
      setErrorMessage('Username and password cannot be left empty.');
      return;
    }

    Axios.post('http://localhost:3002/userLogin', {
      username: loginUserName,
      password: loginPassword
    }).then((response) => {
      if (response.data.message) {
        setErrorMessage(response.data.message);
      } else {
        navigateTo('/userDashboard');
      }
    }).catch(error => {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred. Please try again.');
    });
  };

  return (
    <div className='loginPage flex'>
      <div className='container flex'>
        <div className='formDiv flex'>
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
          </div>

          <form action="" className="form grid" onSubmit={loginUser}>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <span className='message'>Login Status will go here</span>

            <div className="userDiv">
              <label htmlFor="username">Username</label>
              <div className='usernameInput flex'>
                <FaUserShield className='icon'/>
                <input className='out' type="text" id="username" placeholder="Enter Username" value={loginUserName} onChange={(event) => setLoginUserName(event.target.value)}/>
              </div>
            </div>

            <div className="passwordDiv">
              <label htmlFor="password">Password</label>
              <div className='passwordInput flex'>
                <BsFillShieldLockFill className='icon'/>
                <input className='in' type="password" id="password" placeholder="Enter Password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)}/>
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon'/>
            </button>
            <span className='forgotPassword'>
              Forgot Your Password? <a href="">Click Here</a>
            </span>
            <span className='forgotPassword'>
            Are you admin? 
            <a href="/adminLogin">Login Here</a>
            </span>
          </form>
          
        </div>
        
      <div className='videoDiv'>
          <video src={video} autoPlay muted loop></video>

          <div className='textDiv'>
            <h2 className='title'>Create And Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Don't have an account?</span>
            <Link to={'/userRegister'}>
              <button className="btn">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;