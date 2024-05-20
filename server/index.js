import React from 'react';
import './UserProfile.css'; // Importing CSS file for styling

const userProfile = () => {
  return (
    <div className="user-profile">
      <img src="profile-picture.jpg" alt="Profile" className="profile-picture" />
      <div className="user-details">
        <h2 className="username">John Doe</h2>
        <p className="user-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <ul className="user-stats">
          <li>Posts: 100</li>
          <li>Followers: 500</li>
          <li>Following: 200</li>
        </ul>
      </div>
    </div>
  );
}

export default userProfile;
