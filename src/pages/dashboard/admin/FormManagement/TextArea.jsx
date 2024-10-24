import React, { useState } from 'react';

function TextArea({ field }) {
    const [value , setValue] = useState("");
    const [isError, setIsError] = useState(false);



    const handleValueChange = (newValue)=>{

        setValue(newValue.trim());
        if(field.inputSubType==="length"){

            if(field.inputSubTypeValidation === "max_char_count"){                
                !(newValue.length <= field.number)? setIsError(true):setIsError(false)

            }else if(field.inputSubTypeValidation === "min_char_count"){                
                !(newValue.trim().length >= field.number)? setIsError(true):setIsError(false)

            }
        }
    }
    

  return (
    <div className="bg-blue-100 p-4 m-4 w-96 rounded-md flex flex-col">
      <div className="flex  flex-col items-center mb-2 mx-4  bg-gray-400 p-4 rounded-md">
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>
        <textarea
          id={field.name}
          value={value || ''}
          onChange={(e) => handleValueChange(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border ${
            field.isValidationRequired && isError ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          rows={4} // You can adjust the number of rows as needed
        ></textarea>
      </div>

      {/* Error message */}
      {field.isValidationRequired && isError ? (
        <p className="text-red-800 text-xs">{field.custom_validation_msg}</p>
      ) : null}
    </div>
  );
}

export default TextArea;
