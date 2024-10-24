import React, { useState } from 'react';

function CheckBox({ field }) {
  // State to hold selected checkbox values
  const [selectedValues, setSelectedValues] = useState([]);
  console.log(selectedValues);
  

  // Function to handle changes in checkbox selection
  const handleValueChange = (newValue, checked) => {
    if (checked) {
      // Add the new value to selectedValues when checked
      setSelectedValues((prevValues) => [...prevValues, newValue]);
    } else {
      // Remove the value from selectedValues when unchecked
      setSelectedValues((prevValues) => prevValues.filter((value) => value !== newValue));
    }
  };

  return (
    <div className="bg-gray-300 p-4 m-4 w-96 rounded-md flex flex-col">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
      </div>

      <div className="flex flex-col space-y-2 bg-white p-4 rounded-md">
        {field.options.map((option, index) => (
          <label key={index} className="inline-flex items-center">
            <input
              type="checkbox"
              name={option.name}
              value={option.value}
              // Check if the value is in selectedValues array
              checked={selectedValues.includes(option.value)}
              onChange={(e) => handleValueChange(e.target.value, e.target.checked)}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-gray-700">{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckBox;
