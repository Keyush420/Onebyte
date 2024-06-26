import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminReport.css'; // Import CSS file for styling

function Report() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:3002/reports');
      setReports(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setIsLoading(false);
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0]; // Extract date portion
    return formattedDate;
  };

  return (
    <div>
      <h1>Reports</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Reservation Name</th>
              <th>Table Number</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.reservation_id}</td>
                <td>{report.reservationName}</td>
                <td>{report.tableNumber}</td>
                <td>{formatDate(report.created_at)}</td> {/* Format date here */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Report;
