// SearchBox.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';

const SearchBoxNew = ({ placeholder = "Search", queryParam = "search"}) => {
  const [searchParams,setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Initialize search input with current query parameter if available
  const initialSearch = searchParams.get(queryParam) || "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    // Update input field if search query in URL changes (for sync with pagination or other components)
    setSearchValue(searchParams.get(queryParam) || "");
  }, [searchParams, queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Validation
    if (searchValue.length < 1) {
      toast.warn("Search term must be at least 1 character long");
      return;
    }
    if (searchValue.length > 50) {
      toast.warn("Search term cannot exceed 50 characters");
      return;
    }
    if (searchValue.trim() === "") {
      // Remove the search parameter if the search is cleared
      searchParams.delete(queryParam);
    } else {
      // Set the search parameter to the value in the input field
      searchParams.set(queryParam, searchValue);
    }
    navigate({ search: searchParams.toString() });
  };


  const handleCrossButton = () => {
    // Clear the search input
    setSearchValue("");
    
    // Remove the query parameter from the URL
    searchParams.delete(queryParam);
    setSearchParams(searchParams); // Update the URL to reflect the removal
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 items-center">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={50}
      />
      <button
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        
      >
        Search
      </button>
      {searchParams.get(queryParam) && (
        <RxCross2 className='cursor-pointer' onClick={handleCrossButton} />
      )}



    </form>
  );
};

export default SearchBoxNew;
