import React, { useEffect, useState } from 'react';
import axios from 'axios'; //A library for making HTTP requests.
import './adminBoard.css';

function AdminDashboard() {
    const [totalBookings, setTotalBookings] = useState(0);       //Initializes totalBookings to store the total number of bookings and reservations to store the list of reservations.
    const [reservations, setReservations] = useState([]);

    useEffect(() => {           //Runs once when the component mounts to fetch reservation counts and all reservations.
        fetchReservationCounts();
        fetchAllReservations();
    }, []);

    const fetchReservationCounts = async () => {   //An asynchronous function that sends a GET request to fetch the total number of reservations. Updates totalBookings with the fetched data.
        try {
            const response = await axios.get('http://localhost:3002/reservations/count');
            const { total } = response.data; // Include pending in the response data
            setTotalBookings(total);
        } catch (error) {
            console.error('Error fetching reservation counts:', error);
        }
    };

    const fetchAllReservations = async () => {   //An asynchronous function that sends a GET request to fetch all reservations. Updates reservations with the fetched data.
        try {
            const response = await axios.get('http://localhost:3002/reservations/all');
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="dashboard-container">
                <div className="dashboard-box">
                    <h2>Total Bookings</h2>
                    <p>{totalBookings}</p>
                </div>
            </div>
            <h2>All Reservations</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Number of People</th>
                        <th>Reservation Date</th>
                        <th>Reservation Time</th>
                        <th>Description</th>
                        <th>Table Number</th>
                        <th>Reservation Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.numberOfPeople}</td>
                            <td>{reservation.reservationDate}</td>
                            <td>{reservation.reservationTime}</td>
                            <td>{reservation.description}</td>
                            <td>{reservation.tableNumber}</td>
                            <td>{reservation.reservationName}</td>
                            <td>{reservation.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;