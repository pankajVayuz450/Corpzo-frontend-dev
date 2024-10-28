import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Option, Switch } from '@material-tailwind/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import InputField from '@/components/formbuilder/InputField';





function FormField2({ index, fieldData, onFieldChange, onRemoveField, availableElements }) {

    const [formFields, setFormFields] = useState([{ inputType: "text" ,id:Date.now()}]);
    console.log("formFields",formFields);
    



    const handleAddField = () => {
        setFormFields([...formFields, { inputType: "text" ,id:Date.now()}]);
    }

    const removeFormField = (index,id) =>{
        console.log("removeFormField id",id);
        
        
        const updatedFields = formFields.filter((field, idx) => field.id !== id);
    
        
        setFormFields(updatedFields);
    }
    // Handle field change
    const handleFieldChange = (index, updatedType) => {
        console.log(formFields);
        
        console.log("handleFieldChange",index, updatedType);
        
        // updatedFields[index] = updatedField;
        formFields[index].inputType = updatedType
        setFormFields(formFields);
    };


    return (

        <div>
            {
                formFields.map((field, idx) => {
                    console.log(field);

                    if (field.inputType === "text") {
                        return <InputField 
                                    key={idx} 
                                    index={idx} 
                                    fieldData={field} 
                                    setFormFields={setFormFields} 
                                    handleRemoveField={removeFormField}
                                    handleFieldChange ={handleFieldChange}
                                />
                    } else if (field.inputType === "paragraph") {
                        // return <InputField key={idx} index={idx} fieldData={field} setFormFields={setFormFields} />
                        return <InputField key={idx} index={idx} fieldData={field} setFormFields={setFormFields} />
                        // console.log("<TextArea/>");

                    }
                })
            }
            <Button onClick={handleAddField} className="mt-4">Add Field</Button>

        </div>

    )
}

export default FormField2;


