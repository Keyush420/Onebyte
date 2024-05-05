import React, { useState } from 'react';
import './Login.css';
import '../../App.css';
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import Axios from 'axios';

const Login = () => {
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/login', {
      LoginUserName: loginUserName,
      LoginPassword: loginPassword
    }).then((response) => {
      if (response.data.message) {
        setErrorMessage(response.data.message); // Set error message if authentication fails
      } else {
        navigateTo('/dashboard'); // Navigate to dashboard if login is successful
      }
    }).catch(error => {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred. Please try again.'); // Set generic error message
    });
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo image" />
            <h3>Welcome Back!</h3>
          </div>
          <form action="" className="form grid">
            {errorMessage && <div className="error">{errorMessage}</div>}
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  value={loginUserName}
                  onChange={(event) => setLoginUserName(event.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <span className="forgotPassword">
              Forgot your password? <Link to="/register">Click here!</Link>
            </span>
          </form>
        </div>
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Create and reserve products</h2>
            <p>Adopt the restaurant!</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Don't have an account?</span>
            <Link to={'/register'}>
              <button className="btn">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;