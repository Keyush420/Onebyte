import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminOrder.css'; // Import CSS file for styling

function AdminOrder() {
  const [userReservations, setUserReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [counts, setCounts] = useState({ total: 0, accepted: 0, rejected: 0 });
  const [verification, setVerification] = useState({}); // State to hold verification inputs

  useEffect(() => {
    fetchUserReservations();
    fetchReservationCounts();
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

  const fetchReservationCounts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/reservations/count');
      setCounts(response.data);
    } catch (error) {
      console.error('Error fetching reservation counts:', error);
    }
  };

  const handleAccept = async (id, username) => {
    try {
      await axios.put(`http://localhost:3002/acceptReservation/${id}`, { username: username });
      fetchUserReservations();
      setMessage('Congratulations! Your booking has been reserved.');
      await axios.post('http://localhost:3002/notification', { username: username, message: 'Congratulations! Your booking has been reserved.' });
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };
  
  const handleReject = async (id, username) => {
    try {
      await axios.put(`http://localhost:3002/rejectReservation/${id}`, { username: username });
      fetchUserReservations();
      setMessage('Sorry, your booking has been rejected due to unavailable tables. Please book for another date.');
      await axios.post('http://localhost:3002/notification', { username: username, message: 'Sorry, your booking has been rejected due to unavailable tables. Please book for another date.' });
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
  };
  
  // Add this function to handle adding reports
  const handleAddReport = async (id) => {
    try {
      await axios.post(`http://localhost:3002/addReport/${id}`);
      fetchUserReservations();
    } catch (error) {
      console.error('Error adding report:', error);
    }
  };
  

  const handleVerificationChange = (id, value) => {
    setVerification(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <h1>User Reservations</h1>
      <div>
        <h2>Total Reservations: {counts.total}</h2>
        <h2>Accepted Reservations: {counts.accepted}</h2>
        <h2>Rejected Reservations: {counts.rejected}</h2>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Number of People</th>
                <th>Reservation Date</th>
                <th>Reservation Time</th>
                <th>Description</th>
                <th>Table Number</th>
                <th>Verify Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userReservations.map(reservation => (
                <tr key={reservation.id}>
                  <td>{reservation.username}</td>
                  <td>{reservation.numberOfPeople}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.reservationTime}</td>
                  <td>{reservation.description}</td>
                  <td>{reservation.tableNumber}</td>
                  <td>
                    <input
                      type="text"
                      value={verification[reservation.id] || ''}
                      onChange={(e) => handleVerificationChange(reservation.id, e.target.value)}
                      placeholder="Enter username"
                    />
                  </td>
                  <td>
  <div className="button-container">
    <button className="button-accept" onClick={() => handleAccept(reservation.id, reservation.username)}>Accept</button>
    <button className="button-reject" onClick={() => handleReject(reservation.id, reservation.username)}>Reject</button>
    <button className="button-report" onClick={() => handleAddReport(reservation.id)}>Add Report</button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AdminOrder;