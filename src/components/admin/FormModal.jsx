import React, { useState } from 'react';

const FormModal = ({ closeModal, addField, currentFieldType }) => {
  const [label, setLabel] = useState('');
  const [options, setOptions] = useState(['']);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [attributeValue, setAttributeValue] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleAddField = () => {
    const newField = {
      type: currentFieldType,
      label,
      name: label.toLowerCase().replace(/\s+/g, '_'),
      options: currentFieldType === 'select' ? options : [],
      attributes: selectedAttribute ? { [selectedAttribute]: attributeValue } : {}
    };
    addField(newField);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">
          Add {currentFieldType.charAt(0).toUpperCase() + currentFieldType.slice(1)} Field
        </h2>
        <label className="block mb-2">
          Field Label:
          <input
            type="text"
            name="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mt-2"
          />
        </label>
        {currentFieldType === 'select' && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Options</h3>
            {options.map((option, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {index === options.length - 1 && (
                  <button
                    onClick={addOption}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add Option
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2">Attribute:</label>
          <select
            value={selectedAttribute}
            onChange={(e) => setSelectedAttribute(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">Select Attribute</option>
            <option value="minWidth">Min Width</option>
            <option value="maxWidth">Max Width</option>
            {/* Add more attributes as needed */}
          </select>
          {selectedAttribute && (
            <input
              type="text"
              placeholder={`Enter ${selectedAttribute}`}
              value={attributeValue}
              onChange={(e) => setAttributeValue(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mt-2"
            />
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddField}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
