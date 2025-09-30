import React from 'react'

const Stars = ({ rating }) => {
  const totalStars = 5;
  return (
    <div style={{ color: "#ffd700", fontSize: "20px" }}>
      {Array.from({ length: totalStars }, (_, i) => (
        <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
      ))}
    </div>
  );
};



export default Stars
