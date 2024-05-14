// import axios from 'axios';

// export const getUserData = async () => {
//   try {
//     const response = await axios.get('/api/users');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw new Error('Failed to fetch user data');
//   }
// };


import axios from 'axios';

// Function to log in
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('/api/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Failed to log in');
  }
};

// Function to fetch user data
export const getUserData = async () => {
  try {
    const response = await axios.get('/api/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};
