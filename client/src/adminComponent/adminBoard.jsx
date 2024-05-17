import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminBoard.css';

function AdminDashboard() {
    const [totalBookings, setTotalBookings] = useState(0);
    const [acceptedBookings, setAcceptedBookings] = useState(0);
    const [rejectedBookings, setRejectedBookings] = useState(0);
    const [pendingBookings, setPendingBookings] = useState(0); // New state for pending bookings

    useEffect(() => {
        fetchReservationCounts();
    }, []);

    const fetchReservationCounts = async () => {
        try {
            const response = await axios.get('http://localhost:3002/reservations/count');
            const { total, accepted, rejected, pending } = response.data; // Include pending in the response data
            setTotalBookings(total);
            setAcceptedBookings(accepted);
            setRejectedBookings(rejected);
            setPendingBookings(pending); // Set the pending bookings count
        } catch (error) {
            console.error('Error fetching reservation counts:', error);
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
                <div className="dashboard-box">
                    <h2>Accepted Bookings</h2>
                    <p>{acceptedBookings}</p>
                </div>
                <div className="dashboard-box">
                    <h2>Rejected Bookings</h2>
                    <p>{rejectedBookings}</p>
                </div>
                <div className="dashboard-box">
                    <h2>Pending Bookings</h2> {/* New section for pending bookings */}
                    <p>{pendingBookings}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
