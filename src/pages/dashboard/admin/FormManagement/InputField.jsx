import { Input } from '@material-tailwind/react';
import React, { useState } from 'react'

function InputField({ field }) {
     const [value , setValue] = useState("");
     const [isError, setIsError] = useState(false);
     console.log(value);


     
     const isNumber =()=>{
        if(value.trim() == "") return true
        return !isNaN(value);
    }

    const isNumberInRange=(condition,limit)=>{
        console.log(condition,limit);

        if(condition==="less_then_equal_to"){
            return value<=limit 
        }else if(condition === "max_char_count"){
            
            return false
            return value.length <= limit;
        }
    }

    function verifyRegex(pattern, testString) {
        try {
            const regex = new RegExp(pattern);
            return regex.test(testString); // Returns true if matches, false if not
        } catch (e) {
            return false; // Return false if the regex pattern is invalid
        }
    }

    // const validateValue(condition,limit)

    const handleValueChange = (newValue)=>{

        setValue(newValue);
        

        if(field.inputSubType==="text"){
            if(field.inputSubTypeValidation === "does_not_contains"){
                field.shouldNotContain && newValue.includes(field.shouldNotContain) ?  setIsError(true):setIsError(false);

            }else if(field.inputSubTypeValidation === "contains"){                
                field.shouldContain && !newValue.includes(field.shouldContain) ?  setIsError(true):setIsError(false);

            }else if(field.inputSubTypeValidation === "email"){
                //For now adding static Email RegEx
                !verifyRegex('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', newValue) ? setIsError(true):setIsError(false);

            }else if(field.inputSubTypeValidation === "url"){
                //For now adding static url regEx
                !verifyRegex('^(https?:\\/\\/)?([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})(\\/\\S*)?$', newValue) ? setIsError(true):setIsError(false);

            }
        }else if(field.inputSubType==="length"){
            if(field.inputSubTypeValidation === "max_char_count"){
                !(newValue.length <= field.number)? setIsError(true):setIsError(false)

            }else if(field.inputSubTypeValidation === "min_char_count"){
                !(newValue.length > field.number)? setIsError(true):setIsError(false)

            }
        }else if(field.inputSubType==="regex"){
            if(field.inputSubTypeValidation === "contains"){
                field.contains && !newValue.includes(field.contains) ?  setIsError(true):setIsError(false);

            }else if(field.inputSubTypeValidation === "does_not_contains"){
                field.contains && newValue.includes(field.contains) ?  setIsError(true):setIsError(false);

            }
        }else if(field.inputSubType==="number"){
            if(isNaN(newValue)) {
                setValue("");
                setIsError(false)
                return;
            }


            if(field.inputSubTypeValidation==="greater_then_equal_to"){
               !(newValue >= field.number) ?  setIsError(true):setIsError(false);
               
            }else if(field.inputSubTypeValidation==="less_then_equal_to"){
               !(newValue <= field.number) ?  setIsError(true):setIsError(false);                
            }else if(field.inputSubTypeValidation==="less_then"){
               !(newValue < field.number) ?  setIsError(true):setIsError(false);                
            }else if(field.inputSubTypeValidation==="equal_to"){
               (newValue != field.number) ?  setIsError(true):setIsError(false);                
            }else if(field.inputSubTypeValidation==="not_equal_to"){
               (newValue == field.number) ?  setIsError(true):setIsError(false);                
            }else if(field.inputSubTypeValidation==="greater_then"){
               !(newValue > field.number) ?  setIsError(true):setIsError(false);                
            }
        }
        // setIsError(!isError);
    }


    return (
        <div className=' bg-gray-300 p-4 m-4 w-96 rounded-md flex flex-col'>
            <div className="flex items-center mb-2 mx-4 bg-white rounded-md">
              <Input
                label={field.lebel}
                name={field.name}
                value={value || ''} 
                onChange={(e) => handleValueChange(e.target.value)}  
                error={field.isValidationRequired && isError}          
              />
            </div>

            {field.isValidationRequired && isError ? <p className=' text-red-800 text-xs'>{field.custom_validation_msg}</p>:""}
        </div>)

}

export default InputField