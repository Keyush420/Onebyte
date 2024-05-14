import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
    const [totalBookings, setTotalBookings] = useState(0);
    const [newBookings, setNewBookings] = useState(0);
    const [acceptedBookings, setAcceptedBookings] = useState(0);
    const [rejectedBookings, setRejectedBookings] = useState(0);

    useEffect(() => {
        fetchTotalBookingsSummary();
        fetchUserReservations();
    }, []);

    const fetchTotalBookingsSummary = () => {
        fetch('/bookings/summary')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTotalBookings(data.total);
                setNewBookings(data.pending);
                setAcceptedBookings(data.accepted);
                setRejectedBookings(data.rejected);
            })
            .catch(error => console.error('Error fetching total bookings summary:', error));
    };

    const fetchUserReservations = () => {
        fetch('/userReservations')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Further processing of user reservations if needed
            })
            .catch(error => console.error('Error fetching user reservations:', error));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="dashboard-container">
                <div className="dashboard-box">
                    <h2>Total Bookings</h2>
                    <p>{totalBookings}</p>
                </div>
                <div className="dashboard-box">
                    <h2>New Bookings</h2>
                    <p>{newBookings}</p>
                </div>
                <div className="dashboard-box">
                    <h2>Accepted Bookings</h2>
                    <p>{acceptedBookings}</p>
                </div>
                <div className="dashboard-box">
                    <h2>Rejected Bookings</h2>
                    <p>{rejectedBookings}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
