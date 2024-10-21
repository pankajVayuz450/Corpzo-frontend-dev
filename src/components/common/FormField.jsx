import React from 'react'
import { useSelector } from 'react-redux';
import DropDown from '@/components/common/DropDown';


function FormField() {
  const formFields = useSelector((state) => state.formFields.fields);
  

  console.log("formFields:",formFields);

  const handleSelect=()=>{
    console.log("handleSelect");
    
  }
    
  return (
    <div className=' p-5 m-5 border rounded-lg bg-white '> 
      {formFields?.map(field => <DropDown options={field} label={field} onSelect={handleSelect} />)}
     </div>
  )
}

export default FormField