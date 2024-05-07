import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css'; // Import CSS file for styling

function Order() {
  const [userReservations, setUserReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      
      // Send a request to insert a report for the accepted reservation
      await axios.post('http://localhost:3002/report', { id, action: 'accept' });
  
      // Update UI or refetch reservations after accepting
      fetchUserReservations();
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      // Send a request to update the reservation status
      await axios.put(`http://localhost:3002/rejectReservation/${id}`);
      
      // Send a request to insert a report for the rejected reservation
      await axios.post('http://localhost:3002/report', { id, action: 'reject' });
  
      // Update UI or refetch reservations after rejecting
      fetchUserReservations();
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
    </div>
  );
}

export default Order;
