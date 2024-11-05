import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import TextArea from './TextArea';
import CheckBox from './CheckBox';
import RadioButton from './RadioButton';
import Dropdown from './DropDown';
import { useParams } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import { TailSpin } from 'react-loader-spinner';
import FileUpload from './FileUpload';


const staticFormFieldData =  [
    {
        "_id": "6717420b9287d283d0ba204f",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Name Two",
        "name":"user_name",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "text",
        "inputSubTypeValidation": "does_not_contains",
        "shouldNotContain":"Vayuz",   //Added by me
        "custom_validation_msg": "Number should not contains Vayuz",
        "options": [],
        "dynamicFormId": "a42c0efd-ce6f-4363-bb1f-c34f9a2caed1",
        "createdAt": "2024-10-22T06:11:23.339Z",
        "updatedAt": "2024-10-22T06:11:23.339Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba204e",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Name One",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "text",
        "inputSubTypeValidation": "contains",
        "shouldContain":"Vayuz",   //Added by me
        "custom_validation_msg": "Name should contains Vayuz",
        "options": [],
        "dynamicFormId": "b8a10d3e-8c70-45cf-9500-db0de8e96a7c",
        "createdAt": "2024-10-22T06:11:23.339Z",
        "updatedAt": "2024-10-22T06:11:23.339Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2050",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Email",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "text",
        "inputSubTypeValidation": "email",
        "custom_validation_msg": "Enter corract email",
        "options": [],
        "dynamicFormId": "2ec5ba18-3d96-4237-99be-75998c1ed4a6",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2051",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter Url ",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "text",
        "inputSubTypeValidation": "url",
        "custom_validation_msg": "Url should be valid",
        "options": [],
        "dynamicFormId": "86913215-c305-42cd-9d02-95870c3568de",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2052",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Name Three",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "length",
        "inputSubTypeValidation": "max_char_count",
        "number": 500,
        "custom_validation_msg": "Name should be less then 500 char",
        "options": [],
        "dynamicFormId": "ad4164c2-cd84-45b2-9934-c22e23600fa8",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2053",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Name Four",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "length",
        "inputSubTypeValidation": "min_char_count",
        "number": 3,
        "custom_validation_msg": "Name should be greater then 3 char",
        "options": [],
        "dynamicFormId": "283e1032-63fe-4243-a79e-a1c889d3a4ed",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2054",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Name five",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "regex",   //changed by Raja regax -> regex
        "inputSubTypeValidation": "contains",
        "contains":" ",  //added by Raja
        "custom_validation_msg": "Please provide a valid full name eg: 'Raja Sah'",
        "options": [],
        "dynamicFormId": "8d8a61f9-b0ca-4b76-8ebd-188f1fe0bbb4",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2055",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Name Six",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "regex",   //changed by Raja regax -> regex
        "inputSubTypeValidation": "does_not_contains",
        "contains":" ",  //added by Raja
        "custom_validation_msg": "Please provide a valid username eg: rajasah143rk",
        "options": [],
        "dynamicFormId": "ad588f7e-7822-4f9b-8dd3-3e507d242fd3",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2056",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Name Seven",
        "inputType": "text",
        "isValidationRequired": true,
        "inputSubType": "regax",
        "inputSubTypeValidation": "matches",
        "custom_validation_msg": "Please provide a valid name six",
        "options": [],
        "dynamicFormId": "512fb9c0-1611-40d0-a0b5-af570109c816",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2059",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Number Two",
        "inputType": "text", //changed by Raja number -> text
        "isValidationRequired": true,
        "inputSubType": "number",
        "inputSubTypeValidation": "greater_then_equal_to",
        "number": 15,
        "custom_validation_msg": "Number should be greater than equal to 15",
        "options": [],
        "dynamicFormId": "6133ea71-2d70-4589-b77a-55c9fe094ea7",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba205a",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Number Three",
        "inputType":  "text", //changed by Raja number -> text
        "isValidationRequired": true,
        "inputSubType": "number",
        "inputSubTypeValidation": "less_then",
        "number": 15,
        "custom_validation_msg": "Number should be less than 15",
        "options": [],
        "dynamicFormId": "385580f4-020b-4805-849f-79766e40dc0f",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba205b",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Number Three",
        "inputType": "text", //changed by Raja number -> text
        "isValidationRequired": true,
        "inputSubType": "number",
        "inputSubTypeValidation": "less_then_equal_to",
        "number": 15,
        "custom_validation_msg": "Number should be less than equal to 15",
        "options": [],
        "dynamicFormId": "bda0ec67-c969-45f9-b8ba-6287d91aa1ec",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba205c",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Number Four",
        "inputType": "text", //changed by Raja number -> text
        "isValidationRequired": true,
        "inputSubType": "number",
        "inputSubTypeValidation": "equal_to",
        "number": 15,
        "custom_validation_msg": "Number should be equal to 15",
        "options": [],
        "dynamicFormId": "d86c7de5-575e-4086-8836-0b8c3a1e52a1",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba205d",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Number Five",
        "inputType": "text", //changed by Raja number -> text
        "isValidationRequired": true,
        "inputSubType": "number",
        "inputSubTypeValidation": "not_equal_to",
        "number": 15,
        "custom_validation_msg": "Number should be not equal to 15",
        "options": [],
        "dynamicFormId": "05d8b19f-aac2-4a66-bdf4-d589254670cb",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba205e",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Number Six",
        "inputType": "text", //changed by Raja number -> text
        "isValidationRequired": true,
        "inputSubTypeValidation": "is_number",
        "custom_validation_msg": "Input should be number",
        "options": [],
        "dynamicFormId": "a536ffd4-0326-4e83-bec9-42753d524c77",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba205f",
        "formId": "671607ff69688d31daa1a687",
        "label": "Enter User Number Seven",// changed by raja lebal-> label
        "inputType": "number",
        "isValidationRequired": true,
        "inputSubTypeValidation": "whole_number",
        "custom_validation_msg": "Input should be whole number",
        "options": [],
        "dynamicFormId": "fcb5556c-aafa-40eb-ac78-fa89336964ce",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2061",
        "formId": "671607ff69688d31daa1a687",
        "label": "Enter User Number Seven",// changed by raja lebal-> label
        "inputType": "textarea",
        "isValidationRequired": true,
        "inputSubType": "length",
        "inputSubTypeValidation": "min_char_count",
        "number": 3,
        "custom_validation_msg": "About user should be greater then 3 char",
        "options": [],
        "dynamicFormId": "93beaeda-8228-4d19-b3e7-6626037a0ce6",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2060",
        "formId": "671607ff69688d31daa1a687",
        "label": "Enter About User One", // changed by raja lebal-> label
        "inputType": "textarea",
        "isValidationRequired": true,
        "inputSubType": "length",
        "inputSubTypeValidation": "max_char_count",
        "number": 1500,
        "custom_validation_msg": "About user should be less then 1500 char",
        "options": [],
        "dynamicFormId": "bb98fb4a-ed68-4161-9cea-f5f560b14647",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2062",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Select Profile Picture",
        "inputType": "file",
        "isValidationRequired": true,
        "custom_validation_msg": "File should be less than 1 mb and only pdf,doc image allowed",
        "options": [],
        "onlySpecificType": true,
        "maxSize": 1,
        "isPdf": true,
        "isDocument": true,
        "isImage": true,
        "dynamicFormId": "b6938a0e-dd19-47f2-989b-e1248a6a6e6d",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2063",
        "formId": "671607ff69688d31daa1a687",
        "label": "Select your age range", // changed by raja lebal-> label
        "inputType": "multiple_choice",
        "isValidationRequired": true,
        "custom_validation_msg": "Select at least one option",
        "options": [
            {
                "value": "0-20",
                "name": "0-20"
            },
            {
                "value": "21-40",
                "name": "21-40"
            },
            {
                "value": "41-60",
                "name": "41-60"
            },
            {
                "value": "Above 60",
                "name": "Above 60"
            }
        ],
        "dynamicFormId": "9815b697-cd42-48eb-8285-fbaa97528184",
        "createdAt": "2024-10-22T06:11:23.341Z",
        "updatedAt": "2024-10-22T06:11:23.341Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2064",
        "formId": "671607ff69688d31daa1a687",
        "label": "Select vehicle", // changed by raja lebal-> label
        "inputType": "checkbox",
        "isValidationRequired": false,
        "options": [
            {
                "value": "Bike",
                "name": "Bike"
            },
            {
                "value": "Cycle",
                "name": "Cycle"
            },
            {
                "value": "Car",
                "name": "Car"
            },
            {
                "value": "Boat",
                "name": "Boat"
            }
        ],
        "dynamicFormId": "defa05f3-8b08-4927-b7e4-bb6844cec386",
        "createdAt": "2024-10-22T06:11:23.341Z",
        "updatedAt": "2024-10-22T06:11:23.341Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2065",
        "formId": "671607ff69688d31daa1a687",
        "label": "Select User Role", // changed by raja lebal-> label
        "inputType": "dropdown",  //changed by Raja select -> dropdown
        "isValidationRequired": true,
        "custom_validation_msg": "Select vehicle type you have",
        "options": [
            {
                "value": "Admin",
                "name": "Admin"
            },
            {
                "value": "Manager",
                "name": "Manager"
            },
            {
                "value": "Agent",
                "name": "Agent"
            },
            {
                "value": "User",
                "name": "User"
            },
            {
                "value": "Sub Admin",
                "name": "Sub Admin"
            }
        ],
        "dynamicFormId": "049c71d5-b669-4334-967d-446bf1a686e4",
        "createdAt": "2024-10-22T06:11:23.341Z",
        "updatedAt": "2024-10-22T06:11:23.341Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2058",
        "formId": "671607ff69688d31daa1a687",
        "lebal": "Enter User Number One",
        "inputType":"text", //changed by Raja number -> text
        "isValidationRequired": true,
        "inputSubType": "number",
        "inputSubTypeValidation": "greater_then",
        "number": 15,
        "custom_validation_msg": "Number should be greater than 15",
        "options": [],
        "dynamicFormId": "4cb5bf6c-37ca-4a63-805d-2ede1992e531",
        "createdAt": "2024-10-22T06:11:23.340Z",
        "updatedAt": "2024-10-22T06:11:23.340Z",
        "__v": 0
    },
    {
        "_id": "6717420b9287d283d0ba2062",
        "formId": "671607ff69688d31daa1a687",
        "label": "Gender", // changed by raja lebal-> label
        "inputType": "multiple_choice",
        "isValidationRequired": true,
        "custom_validation_msg": "Select at least one option",
        "options": [
            {
                "value": "male",
                "name": "Male"
            },
            {
                "value": "female",
                "name": "Female"
            }
        ],
        "dynamicFormId": "9815b697-cd42-48eb-8285-fbaa97528184",
        "createdAt": "2024-10-22T06:11:23.341Z",
        "updatedAt": "2024-10-22T06:11:23.341Z",
        "__v": 0
    },
]

function ViewFom() {
    const [formFields,setFormFields] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    console.log("formFields:",formFields);
    const { id } = useParams();
    console.log(id);
    

    
    useEffect(()=>{
        const fetchFormfields = async ()=>{
            setIsLoading(true);
            const response = await axios.get(`https://backend-ns7g.onrender.com/api/admin/form/dynamic-form?formId=${id}`,{
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjhiYjcwYWJjODA0YmJkYmI0NjExOWQiLCJuYW1lIjoiUGFua2FqIiwiZW1haWwiOiJyYWphcy52YXl1ekBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjczMzU5NDd9.xTcXjlhoMTYCUcZB4s8xc8UL-OJ8qoCEPfHMDf05Xqg`,
                  }
            })
            setIsLoading(false)
            console.log("response",response.data?.data);
            if(response.data?.data.length<=0){
                setNoData(true);
            }else{
                setNoData(false);
            }
            setFormFields(response.data?.data)
            
        }
        fetchFormfields();
    },[]);

    

    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target; // Reference to the form element
        const data = new FormData(form); // Create a FormData object
        // Iterate over the FormData entries and log them
    for (const [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
    }
        
    }

    if(isLoading){
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
      </div>
    }

    if(noData){
        return <div>NO DATA</div>
    }

  return (
    <div>
        <h1>View form page</h1>
        <form action="" className=' border-red-500' onSubmit={e=>handleSubmit(e)}>
        {formFields.length>0 && formFields.map((field)=>{
            if(field.inputType === 'text'){

                return <InputField field={field}/>
            }
            else if(field.inputType === "paragraph"){

                return <TextArea field={field}/>
            }else if(field.inputType === 'checkboxes'){

                return <CheckBox field={field}/>
            }else if(field.inputType === 'multiple_choice'){

                return <RadioButton field={field}/>
            }else if(field.inputType === 'dropdown'){

                return <Dropdown field={field}/>
            }else if(field.inputType === 'file'){

                return <FileUpload field={field}/>
            }
        })}
        <button>Submit</button>
        </form>
    </div>
  )
}

export default ViewFom