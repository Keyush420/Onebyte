// import React, { useEffect, useState } from 'react';

// function AdminDashboard() {
//     const [totalBookings, setTotalBookings] = useState(0);
//     const [newBookings, setNewBookings] = useState([]);
//     const [acceptedBookings, setAcceptedBookings] = useState([]);
//     const [rejectedBookings, setRejectedBookings] = useState([]);

//     useEffect(() => {
//         // Fetch total bookings
//         fetch('/bookings/total')
//             .then(response => response.json())
//             .then(data => setTotalBookings(data.total))
//             .catch(error => console.error('Error fetching total bookings:', error));

//         // Fetch new bookings
//         fetch('/bookings/new')
//             .then(response => response.json())
//             .then(data => setNewBookings(data))
//             .catch(error => console.error('Error fetching new bookings:', error));

//         // Fetch accepted bookings
//         fetch('/bookings/accepted')
//             .then(response => response.json())
//             .then(data => setAcceptedBookings(data))
//             .catch(error => console.error('Error fetching accepted bookings:', error));

//         // Fetch rejected bookings
//         fetch('/bookings/rejected')
//             .then(response => response.json())
//             .then(data => setRejectedBookings(data))
//             .catch(error => console.error('Error fetching rejected bookings:', error));
//     }, []);

//     return (
//         <div>
//             <h1>Admin Dashboard</h1>
//             <div>Total Bookings: {totalBookings}</div>
//             <div>New Bookings: {newBookings.length}</div>
//             <div>Accepted Bookings: {acceptedBookings.length}</div>
//             <div>Rejected Bookings: {rejectedBookings.length}</div>
//             {/* You can render the details of each booking if needed */}
//         </div>
//     );
// }

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';

function AdminDashboard() {
    const [totalBookings, setTotalBookings] = useState(0);
    const [newBookings, setNewBookings] = useState([]);
    const [acceptedBookings, setAcceptedBookings] = useState([]);
    const [rejectedBookings, setRejectedBookings] = useState([]);

    useEffect(() => {
        fetch('/userReservations')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTotalBookings(data.length);
                const newBookingsData = data.filter(booking => booking.status === 'pending');
                const acceptedBookingsData = data.filter(booking => booking.status === 'accepted');
                const rejectedBookingsData = data.filter(booking => booking.status === 'rejected');
                setNewBookings(newBookingsData);
                setAcceptedBookings(acceptedBookingsData);
                setRejectedBookings(rejectedBookingsData);
            })
            .catch(error => console.error('Error fetching total bookings:', error));
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>Total Bookings: {totalBookings}</div>
            <div>New Bookings: {newBookings.length}</div>
            <div>Accepted Bookings: {acceptedBookings.length}</div>
            <div>Rejected Bookings: {rejectedBookings.length}</div>
            {/* You can render the details of each booking if needed */}
        </div>
    );
}

export default AdminDashboard;
