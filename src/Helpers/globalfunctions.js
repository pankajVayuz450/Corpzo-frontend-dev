import { routesData } from "@/configs/header-config";

// export function formatReadableDate(dateInput) {
//     const date = new Date(dateInput);
//     const options = { year: 'numeric', month: 'short', day: 'numeric' }; 
//     return new Intl.DateTimeFormat('en-US', options).format(date);
//   }
  export function formatReadableDate(dateInput) {
    // Attempt to parse the date string first
    const timestamp = Date.parse(dateInput);
    // if (isNaN(timestamp)) {
    //     return 'Invalid Date';
    // }

    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

  export function formatReadableDateTime(dateInput) {
    const date = new Date(dateInput);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        second: 'numeric',
        hour12: true 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Function to validate number keys for input type tel
  const validKey = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
  ];


//  export const validateNumber  =(e)=>{
//   if (e.target.value.endsWith('0') && e.key === '0') {
//     e.preventDefault(); // Prevent typing another '0'
//     return;
//   }
//     if (!validKey.includes(e.key)) {
//       e.preventDefault();
//     }
//   }
export const validateNumber = (e) => {
  const inputValue = e.target.value;

  // If the first character is '0' and the user tries to type another '0', prevent it
  if (inputValue === '0' && e.key === '0') {
    e.preventDefault(); // Prevent typing another '0'
    return;
  }

  // Allow backspace, delete, arrow keys, etc.
  const validKey = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];

  // If the key is not a number or one of the valid control keys, prevent input
  if (!/^[0-9]$/.test(e.key) && !validKey.includes(e.key)) {
    e.preventDefault();
  }
};

// function to debounce api requests
 export const throttle = (func, limit) => {
    let timeout;
    return function(...args) {
      const context = this;
      if (!timeout) {
        timeout = setTimeout(() => {
          func.apply(context, args);
          timeout = null;
        }, limit);
      }
    };
  };

  // validate search 

  const validateSearch=(searchQuery)=>{
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (searchQuery === "") {
      toast.warn("Search cannot be empty");
      return;
    } else if (searchQuery.trim() === "") {
      toast.warn("Search cannot be just spaces");
      return;
    } else if (!regex.test(searchQuery)) {
      toast.warn("Special characters are not allowed");
      return;
    } else if (searchQuery.length > 50) {
    } else if (searchQuery.length < 3) {
      toast.warn("Search must be at least 3 characters long");
      return;
    } else if (searchQuery.length > 50) {
      toast.warn("Search query cannot be more than 50 characters long");
      return;
    }
  }

  // remove multiple spaces from text 
  export const handleExtraSpaces = (text) =>{
    let newText = text.split(/[ ]+/);
    return (newText.join(" "))
 }

//  check if path element is a uuid 
export const checkUuid=(path)=>{
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; 
  return path.test(regex);
}
// function to disbale previous dates 
export const setDateMin = () => {
  const today = new Date().toISOString().split("T")[0];
  return today;
};

export const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  return `${year}-${month}-${day}`;
};

export const getRouteDetails = (path) => {
  // Loop through all routes in routesData
  const route = Object.keys(routesData).find(routePath => {
    // Replace dynamic segments (e.g., :id) with a regex to match dynamic values
    const routeRegex = new RegExp(`^${routePath.replace(/:[^/]+/g, '[^/]+')}$`);
    
    // Test if the current path matches this dynamic route
    return routeRegex.test(path);
  });

  // Return the route data if found, or default to { totalCount: 0, title: "Admin" }
  return route ? routesData[route] : { totalCount: 0, title: "Admin" };
};

export  const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so +1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function extractErrorMessage(errorString) {
  if (!errorString.includes(":")) {
    return errorString; // Return the original string if no colon is found
  }
  return errorString.split(":")[1].trim(); // Extract and trim the part after the colon
}

export function formatString(input) {
  // Input string ko uppercase mein convert karo aur spaces ko remove karo
  return input.replace(/\s+/g, '').toUpperCase();
}


