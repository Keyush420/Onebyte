import React from 'react';
// import { useHistory } from 'react-router-dom';

const TableBox = ({ table }) => {
  const history = useHistory();

  const handleViewDetails = () => {
    // Redirect to table details page
    history.push(`/table-details/${table.id}`);
  };

  const handleBookNow = () => {
    // Redirect to booking page
    history.push(`/book-now/${table.id}`);
  };

  return (
    <div className="table-box">
      <img src={table.imageUrl} alt={table.name} className="table-image" />
      <div className="table-details">
        <div className="table-name">{table.name}</div>
        <div className="table-price">Price: ${table.price}</div>
      </div>
      <button onClick={handleViewDetails} className="view-details-btn">View Details</button>
      <button onClick={handleBookNow} className="book-now-btn">Book Now</button>
    </div>
  );
};

export default TableBox;
