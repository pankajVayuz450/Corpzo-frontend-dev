import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';  // Using a spinner icon from react-icons, you can use any other spinner if you prefer
import { useSelector } from 'react-redux';

const DynamicStatusSelect = ({ statusList = [], currentStatus, onStatusChange, index, loading = false,disabled,escalatedTo=false }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [selectedIndex, setSelectedIndex] = useState(currentStatus);
  const { activeIndex } = useSelector((state) => state.applications)


  // Sync selectedStatus with currentStatus when it changes (e.g., from the API)
  useEffect(() => {
  }, []);
  console.log("check the index",index,selectedIndex)
  
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus); // Update the internal state
    onStatusChange(newStatus);
    setSelectedIndex(index); // Notify the parent about the status change
  };

  return (
    <div className="w-full">
      {loading  && activeIndex===index? (
        // Loading Spinner
        <div className="flex justify-center items-center py-2">
          <FaSpinner className="animate-spin text-gray-500 text-xl" /> {/* Or any other spinner you prefer */}
        </div>
      ) : (
        // Render the select dropdown when not loading
        <select
          key={index}
          value={selectedStatus}
          onChange={handleStatusChange}
          disabled={disabled}
          className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {statusList.map((status, index) => (
            <option key={index} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default DynamicStatusSelect;
