import React, { useState } from 'react';
import './userRegister.css';
import '../../userApp.css';
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import Axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createUser = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    Axios.post('http://localhost:3002/userRegister', {
      email: email,
      username: userName,
      password: password
    }).then(() => {
      console.log('User has been created');
      navigate('/'); // Redirect to login page after registration
    }).catch((error) => {
      console.error('Error creating user:', error);
    });
  };

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo image" />
            <h3>Let us Know!</h3>
          </div>
          <form action="" className='form grid'>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdOutlineMail className='icon'/>
                <input type="email" id='email' placeholder='Enter Email' onChange={(event)=>{
                  setEmail(event.target.value)
                }}/>
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' onChange={(event)=>{
                  setUserName(event.target.value)
                }}/>
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' /> 
                <input type="password" id='password' placeholder='Enter Password' onChange={(event)=>{
                  setPassword(event.target.value)
                }}/>
              </div>
            </div>
            <button type='submit' className='btn flex' onClick={createUser}>
              <span>Register</span>
              <AiOutlineSwapRight className='icon' />
            </button>
            <span className="forgotPassword">
              Forgot your password? <a href="">Click here!</a>
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
            <span className="text">Have an account?</span>
            <Link to={'/'}>
              <button className="btn">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
