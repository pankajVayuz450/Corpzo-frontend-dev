// SearchBox.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBox = ({ placeholder = "Search...", queryParam = "search"}) => {
  const [searchParams] = useSearchParams();
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
    if (searchValue.trim() === "") {
      // Remove the search parameter if the search is cleared
      searchParams.delete(queryParam);
    } else {
      // Set the search parameter to the value in the input field
      searchParams.set(queryParam, searchValue);
    }
    navigate({ search: searchParams.toString() });
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 items-center">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
