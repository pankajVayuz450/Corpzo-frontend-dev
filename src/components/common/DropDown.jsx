import React, { useState } from 'react';

function DropDown({ options, label, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full text-left bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {selectedOption}
        <span className="float-right inline-block transform transition-transform duration-300 ease-in-out">
          &#x25BE;
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
          {options?.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
