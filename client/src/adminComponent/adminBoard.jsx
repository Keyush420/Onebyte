import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminBoard.css';

function AdminDashboard() {
    const [totalBookings, setTotalBookings] = useState(0);
    useEffect(() => {
        fetchReservationCounts();
    }, []);

    const fetchReservationCounts = async () => {
        try {
            const response = await axios.get('http://localhost:3002/reservations/count');
            const { total} = response.data; // Include pending in the response data
            setTotalBookings(total);
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
            </div>
        </div>
    );
}

export default AdminDashboard;
