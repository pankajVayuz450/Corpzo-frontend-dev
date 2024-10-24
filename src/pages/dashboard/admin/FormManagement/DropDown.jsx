import React, { useState } from 'react';

function Dropdown({ field }) {
  // State to hold the selected option
  const [selectedValue, setSelectedValue] = useState('');
  console.log(selectedValue);
  

  // Function to handle changes in the dropdown selection
  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  return (
    <div className="bg-gray-300 p-4 m-4 w-96 rounded-md flex flex-col">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
      </div>

      <select
        value={selectedValue}
        onChange={handleValueChange}
        className="mt-1 p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled>Select an option</option> {/* Placeholder option */}
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      {/* Validation Message */}
      {field.isValidationRequired && !selectedValue && (
        <p className="text-red-800 text-xs">{field.custom_validation_msg}</p>
      )}
    </div>
  );
}

export default Dropdown;
