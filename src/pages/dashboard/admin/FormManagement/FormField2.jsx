import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Option, Switch } from '@material-tailwind/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';


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

function FormField2({ index, fieldData, onFieldChange, onRemoveField, availableElements }) {


    const [label, setLabel] = useState(null);
    const [selectedType, setSelectedType] = useState(null);


    const [isRequired, setIsRequired] = useState(false);
    const [isValidation, setIsValidation] = useState(false);
    const [subTypeList, setSubTypeList] = useState(staticSubtype);
    const [selectedSubtype, setSelectedSubtype] = useState(null);
    const [inputSubTypeValidation, setInputSubTypeValidation] = useState([]);
    const [validationPlaceholder, setValidationPlaceholder] = useState("");
    const [validationContidion, setValidationContidion] = useState(null);
    const [error, setError] = useState(null);
    console.log("label:", label);

    console.log("selectedtype", selectedType);
    console.log("selectedSubtype", selectedSubtype);

    console.log({ label, selectedType, isRequired, selectedSubtype, selectedSubtype, validationContidion, error });


    // console.log("inputSubTypeValidation",inputSubTypeValidation);

    useEffect(() => {
        if (selectedSubtype === "text") {
            setInputSubTypeValidation(staticTextSubTypeValidation);
            setValidationPlaceholder("Text");
        } else if (selectedSubtype === "number") {
            setInputSubTypeValidation(staticNumberSubTypeValidation)
            setValidationPlaceholder("Number");
        } else if (selectedSubtype === "length") {
            setInputSubTypeValidation(staticLengthSubTypeValidation);
            setValidationPlaceholder("Number");
        }
    }, [selectedSubtype])



    // Handle field label change
    const handleLabelChange = (e) => {
        // const updatedField = { ...fieldData, label: e.target.value };
        // onFieldChange(index, updatedField);
        setLabel(e.target.value);

    };

    // Handle field type change (e.g., from short answer to dropdown)
    const handleTypeChange = (e) => {
        // console.log("handleTypeChange");
        // const updatedField = { ...fieldData, type: e.target.value, options: [] }; // Reset options if type changes        
        // onFieldChange(index, updatedField);
        setSelectedType(e.target.value);
        // console.log("e.target",e.target.value);


    };

    const handleSubTypeChange = (e) => {
        // console.log("handleSubTypeChange");
        setSelectedSubtype(e.target.value);
        // console.log("updatedField", e.target.value);

    }
    const handleSubTypeValidationChange = (e) => {
        // console.log("handleSubTypeValidationChange");
        // console.log("value:", e.target.value);
    }

    // Handle adding options (for dropdown, multiple choice, checkboxes)
    const handleOptionChange = (e, optionIdx) => {
        const updatedOptions = [...fieldData.options];
        updatedOptions[optionIdx] = e.target.value;
        const updatedField = { ...fieldData, options: updatedOptions };
        onFieldChange(index, updatedField);
    };

    // Add a new option for multiple choice or dropdown
    const handleAddOption = () => {
        const updatedField = { ...fieldData, options: [...fieldData.options, ''] };
        onFieldChange(index, updatedField);
    };

    // console.log(fieldData);


    return (
        <div className="mb-4 p-4 bg-white border rounded-md shadow-lg w-auto">
            <div className=' flex'>
                <div className='pr-4'>
                    <input type="text" placeholder={"label..."} value={label} onChange={handleLabelChange} className='p-2 bg-gray-50   rounded-md border-black border-b-4' />
                </div>

                <div>
                    <select label="Field Type" onChange={handleTypeChange} className=' px-16 rounded-md ml-4 bg-gray-200 p-3'>
                        {availableElements.map((el, idx) => (
                            <option key={idx} value={el.value}>{el.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {isValidation &&
                <div className=' bg-gray-200 rounded-md my-4 p-2 flex flex-wrap'>
                    <div className='flex mx-2 bg-white'>
                        <select name="" id="" className=' px-16 mr-4' onChange={(e) => handleSubTypeChange(e)} >
                            {subTypeList.map((el, idx) => <option key={idx} value={el.value}>{el.name}</option>)}
                        </select>



                        <select name="" id="" className=' px-16 rounded-md ml-4' onChange={(e) => handleSubTypeValidationChange(e)} >
                            {inputSubTypeValidation.map((el, idx) => <option key={idx} value={el.value}>{el.name}</option>)}
                        </select>


                    </div>
                    <input type="text" placeholder={validationPlaceholder} value={validationContidion ? validationContidion : undefined} onChange={(e) => setValidationContidion(e.target.value)} className=' mx-4 p-2 bg-gray-50 border-black border-b-2' />

                    <input type="text" placeholder={"Custom error text..."} onChange={(e) => setError(e.target.value)} value={error ? error : undefined} className='p-2 mx-4 bg-gray-50 border-black border-b-2' />


                </div>}

            <div className=' flex items-center justify-between p-2'>
                <Button onClick={() => onRemoveField(index)} color="red" className="p-2 bg-white text-red-700 shadow-md shadow-gray-500 text-2xl"><MdDelete /></Button>
                <div className='flex p-2 justify-between h-10 bg-gray-100 rounded-2xl px-4'>

                    <div className=' pr-2 text'>Validation</div>
                    <Switch checked={isValidation} onChange={() => setIsValidation(!isValidation)} />
                    <div className=' px-2 text'>Required</div>
                    <div className=' flex items-center'>
                        <Switch checked={isRequired} onChange={() => setIsRequired(!isRequired)} />
                        {/* <BsThreeDotsVertical onClick={}/> */}

                    </div>
                </div>
            </div>

        </div>
    );
}

export default FormField2;
