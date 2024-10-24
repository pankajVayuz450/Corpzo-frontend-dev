import React, { useState } from 'react';

function RadioButton({ field }) {
  // State to hold the selected radio button value
  const [selectedValue, setSelectedValue] = useState('');
  console.log(selectedValue);
  

  // Function to handle changes in radio button selection
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
  };

  return (
    <div className="bg-gray-300 p-4 m-4 w-96 rounded-md flex flex-col">
      {/* Label */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
      </div>

      {/* Radio Buttons */}
      <div className="flex flex-col space-y-2 bg-white p-4 rounded-md">
        {field.options.map((option, index) => (
          <label key={index} className="inline-flex items-center">
            <input
              type="radio"
              name={field.label}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => handleValueChange(e.target.value)}
              className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-gray-700">{option.name}</span>
          </label>
        ))}
      </div>

      {/* Validation Message */}
      {field.isValidationRequired && !selectedValue && (
        <p className="text-red-800 text-xs">{field.custom_validation_msg}</p>
      )}
    </div>
  );
}

export default RadioButton;
