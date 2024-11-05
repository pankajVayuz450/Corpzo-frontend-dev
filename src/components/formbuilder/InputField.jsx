import React, { useEffect, useState } from 'react'

import { Button, Input, Select, Option, Switch } from '@material-tailwind/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';



const staticDropdown = [
    { name: 'Short Answer', value: 'short_answer' },
    { name: 'Paragraph', value: 'paragraph' },
    { name: 'Multiple Choice', value: 'multiple_choice' },
    { name: 'Checkboxes', value: 'checkboxes' },
    { name: 'Dropdown', value: 'dropdown' },
];


const staticSubtype = [{ name: "Text", value: "text" }, { name: "Number", value: "number" }, { name: "Length", value: "length" }, { name: "RegEx", value: "regex" }]
const staticTextSubTypeValidation = [{ name: "Does not contains", value: "does_not_contains" },
{ name: "Contains", value: "contains" },
{ name: "Email", value: "email" }
];

const staticNumberSubTypeValidation = [{ name: "Greater than", value: "" },
{ name: "Greater than equal to", value: "" },
{ name: "Less than equal to", value: "" },
{ name: "Equal to", value: "" },
{ name: "Not equal to", value: "" },
]

const staticLengthSubTypeValidation = [{ name: "Max character count", value: "" },
{ name: "Min character count", value: "" },
]

// function InputField({ index, fieldData, setFormFields, handleRemoveField ,handleFieldChange}) {
function InputField({ index,
    fieldData,
    fieldTypesList,
    setFormFields,
    handleRemoveField,
    handleFieldChange,
    setInputSubTypeValidation,
    setValidationContidion,
    setLabel,
    setIsRequired,
    setIsValidation,
    handleSubTypeChange,
    setErrorText,
    handleSubTypeValidationChange
}) {
    console.log({ index, fieldData });


    const [subTypeList, setSubTypeList] = useState([]);
   

    useEffect(()=>{
        const fetchSubTypeList = async ()=>{
         try {
             const response = await axios.get(`${process.env.BACKEND_BASE_URL}/admin/form/form-validation-type`, {
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("authToken")}`,
               },
             });
            //  console.log("fetchSubTypeList response : ",response.data?.data);
            setSubTypeList(response.data?.data)
           } catch (error) {
             console.log(error);
           } finally {
           }
        }
        fetchSubTypeList();
     },[])

    useEffect(() => {
        if (fieldData.selectedSubtype === "text") {
            setInputSubTypeValidation(index, staticTextSubTypeValidation);
            // setValidationPlaceholder("Text");
        }
    }, [])



    // Handle field type change (e.g., from short answer to dropdown)
    const handleTypeChange = (e) => {
        console.log("handleTypeChange");

        setSelectedType(e.target.value);


        // console.log("e.target",e.target.value);


    };

    // const handleSubTypeValidationChange = (e) => {
    //     console.log("handleSubTypeValidationChange");
    //     // console.log("value:", e.target.value);
    // }


    return (
        <div className="mb-4 p-4 bg-white border rounded-md shadow-lg w-auto  hover:border-green-600">
            <div className='flex items-center justify-between'>
                <div className=' flex'>
                    <div className='pr-4'>
                        <input maxLength={30} type="text" placeholder={"label..."} value={fieldData.label} onChange={(e) => setLabel(index, e.target.value)} className='p-2 bg-gray-50   rounded-md border-black border-b-4' />
                    </div>

                    <div>
                        <select label="Field Type" onChange={(e) => handleFieldChange(index, e.target.value)} className=' px-16 rounded-md ml-4 bg-gray-200 p-3'>
                            {fieldTypesList.map((el, idx) => (
                                <option key={idx} value={el.value}>{el.name}</option>
                            ))}
                        </select>
                    </div>
                    {fieldData.isRequired?<div className=' p-2 text-red-600 text-xl'>
                        *
                    </div>:""}
                </div>
                <div>
                    <Button onClick={() => handleRemoveField(index)} color="red" className="p-2 bg-white text-red-700 shadow-md shadow-gray-500 text-2xl"><MdDelete /></Button>
                </div>
            </div>

            {fieldData.isValidation &&
                <div className=' bg-gray-200 rounded-md my-4 p-2 flex flex-wrap'>
                    <div className='flex mx-2 bg-white'>
                        <select name="" id="" className=' px-16 mr-4' onChange={(e) => handleSubTypeChange(index, e.target.value)} value={fieldData.selectedSubtype}>
                            {subTypeList.map((el, idx) => <option key={idx} value={el.value}>{el.name}</option>)}
                        </select>



                        <select name="" id="" className=' px-16 rounded-md ml-4' onChange={(e) => setValidationContidion(index, e.target.value)} >
                            {fieldData.inputSubTypeValidation.map((el, idx) => <option key={idx} value={el.value}>{el.name}</option>)}
                        </select>


                    </div>
                    <input type="text" placeholder={fieldData.validationPlaceholder} value={fieldData.validationContidion ? fieldData.validationContidion : undefined} onChange={(e) => setValidationContidion(index, e.target.value)} className=' mx-4 p-2 bg-gray-50 border-black border-b-2' />

                    <input type="text" placeholder={"Custom error text..."} onChange={(e) => setErrorText(index, e.target.value)} value={fieldData.error ? fieldData.error : undefined} className='p-2 mx-4 bg-gray-50 border-black border-b-2' />


                </div>}

            <div className=' flex items-center justify-between p-2'>

                <div className='flex p-2 justify-between h-10 bg-gray-100 rounded-2xl px-4'>

                    <div className=' pr-2 text'>Validation</div>
                    <Switch checked={fieldData.isValidation} onChange={() => setIsValidation(index, !fieldData.isValidation)} />
                    <div className=' px-2 text'>Required</div>
                    <div className=' flex items-center'>
                        <Switch checked={fieldData.isRequired} onChange={() => setIsRequired(index, !fieldData.isRequired)} />
                        {/* <BsThreeDotsVertical onClick={}/> */}

                    </div>
                </div>
            </div>

        </div>
    );
}

export default InputField