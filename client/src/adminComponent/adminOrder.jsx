// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './adminOrder.css'; // Import CSS file for styling

// function adminOrder() {
//   const [userReservations, setUserReservations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchUserReservations();
//   }, []);

//   const fetchUserReservations = async () => {
//     try {
//       const response = await axios.get('http://localhost:3002/userReservations');
//       setUserReservations(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching user reservations:', error);
//       setIsLoading(false);
//     }
//   };

//   const handleAccept = async (id) => {
//     try {
//         // Send a request to update the reservation status
//         await axios.put(`http://localhost:3002/acceptReservation/${id}`);

//         // Update UI or refetch reservations after accepting
//         fetchUserReservations();
//     } catch (error) {
//         console.error('Error accepting reservation:', error);
//     }
// };

// const handleReject = async (id) => {
//     try {
//         // Send a request to update the reservation status
//         await axios.put(`http://localhost:3002/rejectReservation/${id}`);

//         // Update UI or refetch reservations after rejecting
//         fetchUserReservations();
//     } catch (error) {
//         console.error('Error rejecting reservation:', error);
//     }
// };  
  
//   return (
//     <div>
//       <h1>User Reservations</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="table-container">
//           <table className="reservation-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Number of People</th>
//                 <th>Reservation Date</th>
//                 <th>Reservation Time</th>
//                 <th>Description</th>
//                 <th>Table Number</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userReservations.map(reservation => (
//                 <tr key={reservation.id}>
//                   <td>{reservation.id}</td>
//                   <td>{reservation.numberOfPeople}</td>
//                   <td>{reservation.reservationDate}</td>
//                   <td>{reservation.reservationTime}</td>
//                   <td>{reservation.description}</td>
//                   <td>{reservation.tableNumber}</td>
//                   <td>
//                     <button onClick={() => handleAccept(reservation.id)}>Accept</button>
//                     <button onClick={() => handleReject(reservation.id)}>Reject</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default adminOrder;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminOrder.css'; // Import CSS file for styling

function adminOrder() {
  const [userReservations, setUserReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserReservations();
  }, []);

  const fetchUserReservations = async () => {
    try {
      const response = await axios.get('http://localhost:3002/userReservations');
      setUserReservations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      setIsLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      // Send a request to update the reservation status
      await axios.put(`http://localhost:3002/acceptReservation/${id}`);
      // Update UI or refetch reservations after accepting
      fetchUserReservations();
      setMessage('Congratulations! Your booking has been reserved.');
      
      // Insert notification message into the notification table
      await axios.post('http://localhost:3002/notification', { message: 'Congratulations! Your booking has been reserved.' });
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      // Send a request to update the reservation status
      await axios.put(`http://localhost:3002/rejectReservation/${id}`);
      // Update UI or refetch reservations after rejecting
      fetchUserReservations();
      setMessage('Sorry, your booking has been rejected due to unavailable tables. Please book for another date.');

      // Insert notification message into the notification table
      await axios.post('http://localhost:3002/notification', { message: 'Sorry, your booking has been rejected due to unavailable tables. Please book for another date.' });
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
  }; 

  return (
    <div>
      <h1>User Reservations</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Number of People</th>
                <th>Reservation Date</th>
                <th>Reservation Time</th>
                <th>Description</th>
                <th>Table Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userReservations.map(reservation => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.numberOfPeople}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.reservationTime}</td>
                  <td>{reservation.description}</td>
                  <td>{reservation.tableNumber}</td>
                  <td>
                    <button onClick={() => handleAccept(reservation.id)}>Accept</button>
                    <button onClick={() => handleReject(reservation.id)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default adminOrder;
