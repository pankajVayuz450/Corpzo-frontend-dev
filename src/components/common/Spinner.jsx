// Spinner.jsx
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Spinner = ({ size = '8', color = 'text-blue-500' }) => {
  return (
    <FaSpinner
      className={`animate-spin ${color}`}
      style={{ fontSize: `${size}rem` }}
      aria-label="Loading"
    />
  );
};

export default Spinner;
