import React, { useEffect, useState } from 'react';

const DynamicStatusSelect = ({ statusList = [], currentStatus, onStatusChange,index }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  // Sync selectedStatus with currentStatus when it changes (e.g., from the API)
  useEffect(() => {

    if (currentStatus) {
      setSelectedStatus(currentStatus);
    }


  }, [currentStatus]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus); // Update the internal state
    onStatusChange(newStatus); // Notify the parent about the status change
  };

  return (
    <div className="w-full">
      <select
      key={index}
        value={selectedStatus}
        onChange={handleStatusChange}
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {statusList.map((status,index) => (
          <option key={index} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DynamicStatusSelect;
