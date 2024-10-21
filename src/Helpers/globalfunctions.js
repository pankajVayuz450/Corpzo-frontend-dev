export function formatReadableDate(dateInput) {
    const date = new Date(dateInput);
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; 
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

