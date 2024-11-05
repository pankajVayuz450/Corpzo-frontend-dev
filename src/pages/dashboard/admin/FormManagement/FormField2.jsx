import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Option, Switch } from '@material-tailwind/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import InputField from '@/components/formbuilder/InputField';
import MultipleChoiceField from '@/components/formbuilder/MultipleChoiceField';
import CheckBoxField from '@/components/formbuilder/CheckBoxField';
import DropdownField from '@/components/formbuilder/DropdownField';
import FileField from '@/components/formbuilder/FileField';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const staticDropdown = [
    { name: 'Short Answer', value: 'short_answer' },
    { name: 'Paragraph', value: 'paragraph' },
    { name: 'Multiple Choice', value: 'multiple_choice' },
    { name: 'Checkboxes', value: 'checkboxes' },
    { name: 'Dropdown', value: 'dropdown' },
    { name: 'File', value: 'file' },
];

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
    const { id } = useParams();
    

    const [formFields, setFormFields] = useState([
        {
            inputType: "text",
            label: "",
            selectedType: "short_answer",
            isRequired: false,
            isValidation: false,
            selectedSubtype: "text",
            inputSubTypeValidation: staticTextSubTypeValidation,
            validationPlaceholder: "",
            validationContidion: "",
            error: null
        },

    ]);
    console.log("formFields", formFields);

    const [fieldType,setFieldType] = useState([]);   
    console.log("fieldType",fieldType);
     

    useEffect(()=>{
        const fetchDropdownList = async ()=>{
         try {
             const response = await axios.get(`${process.env.BACKEND_BASE_URL}/admin/form/form-type`, {
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("authToken")}`,
               },
             });
            //  console.log("response : ",response.data?.data);
             setFieldType(response.data?.data)
           } catch (error) {
             console.log(error);
           } finally {
           }
        }
        fetchDropdownList();
     },[])

    const setInputSubTypeValidation = (index, data) => {
        formFields[index].inputSubTypeValidation = data;
        setFormFields(formFields);
    }


    const handleAddField = () => {
        setFormFields([...formFields, {
            inputType: "text",
            label: "",
            selectedType: "short_answer",
            isRequired: false,
            isValidation: false,
            selectedSubtype: "text",
            inputSubTypeValidation: staticTextSubTypeValidation,
            validationPlaceholder: "",
            validationContidion: "",
            error: null
        }]);
    }

    const removeFormField = (index) => {
        // console.log("removeFormField id", id);


        const updatedFields = formFields.filter((field, idx) => idx !== index);


        setFormFields(updatedFields);
    }
    // Handle field change
    const handleFieldChange = (index, updatedType) => {
        // console.log(index, updatedType);

        console.log("handleFieldChange", index, updatedType);

        if (updatedType === "short_answer") {
            formFields[index] = {
                inputType: "text",
                label: "",
                selectedType: updatedType,
                isRequired: false,
                isValidation: false,
                selectedSubtype: null,
                inputSubTypeValidation: [],
                validationPlaceholder: "",
                validationContidion: null,
                error: null
            }
        } else if (updatedType === "paragraph") {
            formFields[index] = {
                inputType: "paragraph",
                label: "",
                selectedType: "short_answer",
                isRequired: false,
                isValidation: false,
                selectedSubtype: "text",
                inputSubTypeValidation: staticTextSubTypeValidation,
                validationPlaceholder: "",
                validationContidion: "",
                error: null
            }
        } else if (updatedType === "multiple_choice") {
            formFields[index] = {
                inputType: "multiple_choice",
                label: "",
                isRequired: false,
                options: ["option1", "option2"]
            }
        } else if (updatedType === "checkboxes") {
            formFields[index] = {
                inputType: "checkboxes",
                label: "",
                isRequired: false,
                options: ["option1", "option2"]
            }
        } else if (updatedType === "dropdown") {
            formFields[index] = {
                inputType: "dropdown",
                label: "",
                isRequired: false,
                options: ["option1", "option2"]
            }
        } else if (updatedType === "file") {
            formFields[index] = {
                inputType: "file",
                label: "",
                isRequired: false,
                fileSize: 1
            }
        }
        setFormFields([...formFields]);
    };

    const setLabel = (index, newLabel) => {
        console.log("setLabel", index, newLabel);

        formFields[index].label = newLabel;
        setFormFields([...formFields]);
    }
    const setIsRequired = (index, newValue) => {
        console.log("setLabel", index, newValue);

        formFields[index].isRequired = newValue;
        setFormFields([...formFields]);
    }
    const setIsValidation = (index, newValue) => {
        console.log("setIsValidation", index, newValue);

        formFields[index].isValidation = newValue;
        setFormFields([...formFields]);
    }
    const handleSubTypeChange = (index, newValue) => {
        console.log("handleSubTypeChange:", index, newValue);
        formFields[index].selectedSubtype = newValue;
        if (newValue === "text") {
            formFields[index].validationPlaceholder = "Text";
            formFields[index].inputSubTypeValidation = staticTextSubTypeValidation;
        } else if (newValue === "number") {
            formFields[index].validationPlaceholder = "Number"
            formFields[index].inputSubTypeValidation = staticNumberSubTypeValidation;
        } else if (newValue === "length") {
            formFields[index].validationPlaceholder = "Number"
            formFields[index].inputSubTypeValidation = staticLengthSubTypeValidation;
        }
        setFormFields([...formFields]);
    }

    const handleSubTypeValidationChange = () => {

    }

    const setValidationContidion = (index, newValue) => {
        formFields[index].validationContidion = newValue;
        setFormFields([...formFields]);
    }

    const setErrorText = (index, newValue) => {
        formFields[index].error = newValue;
        setFormFields([...formFields]);
    }





    //Functions related to Multiple choice field
    const addMoreOption = (index) => {
        console.log("addMoreOption ", index);

        formFields[index].options.push("new option");
        setFormFields([...formFields]);
    }

    const handleOptionNameChange = (index, id, newValue) => {
        formFields[index].options[id] = newValue;
        setFormFields([...formFields]);
    }
    const handleDeleteOption = (index, id) => {
        const updatedOptions = formFields[index].options.filter((_, idx) => idx !== id);
        formFields[index].options = updatedOptions;
        setFormFields([...formFields]);

    }


    //Functions related to File Upload Field
    const setMaxSize = (index,newValue)=>{
        // console.log("setMaxSize",index,newValue);
        formFields[index].fileSize = newValue
        setFormFields([...formFields]);
    }


    //Handling save/submit form 
    const handleSubmitForm = ()=>{
        console.log("handleSubmitForm");
       

    const formData   =formFields.map((field)=>{
            const payload ={
                dynamicFormId:id,
                formId:id,
            }

            payload.inputType = field.inputType;
            payload.lebel = field.label;
            payload.isRequired = field.isRequired;

            if (field.inputType==="text") {
                payload.isValidationRequired = field.isValidation;
                payload.selectedSubtype = field.selectedSubtype;
                payload.validationContidion = field.validationContidion;
                payload.validationPlaceholder = field.validationPlaceholder;
            }else if (field.inputType==="paragraph"){

            }else if (field.inputType==="multiple_choice"){
                payload.options = field.options;

            }else if (field.inputType==="checkboxes"){
                payload.options = field.options;

            }else if (field.inputType==="dropdown"){
                payload.options = field.options;

            }
            return payload
        })

        console.log("formData :" ,formData);

        formData.map((data)=>saveFormData(data));

       
        
    }

    const saveFormData= async (payload)=>{
        console.log("saving....",payload);
        
        axios.post(`${process.env.BACKEND_BASE_URL}/admin/form/dynamic-form`,payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        })
        .then((response) => {
            toast.success("Form Saved")
            console.log(response);
        }).catch((error)=>{
            toast.error("Form not saved")
            console.log(error);
            
        })
    }



    return (

        <div>
            {
                formFields.map((field, idx) => {
                    console.log(field);

                    if (field.inputType === "text") {
                        return <InputField
                            key={idx}
                            index={idx}
                            fieldTypesList={fieldType}
                            fieldData={field}
                            setFormFields={setFormFields}
                            handleRemoveField={removeFormField}
                            handleFieldChange={handleFieldChange}
                            setInputSubTypeValidation={setInputSubTypeValidation}
                            setLabel={setLabel}
                            setIsRequired={setIsRequired}
                            setIsValidation={setIsValidation}
                            handleSubTypeChange={handleSubTypeChange}
                            setValidationContidion={setValidationContidion}
                            setErrorText={setErrorText}
                        />
                    } else if (field.inputType === "paragraph") {
                        return <InputField
                            key={idx}
                            index={idx}
                            fieldTypesList={fieldType}
                            fieldData={field}
                            setFormFields={setFormFields}
                            handleRemoveField={removeFormField}
                            handleFieldChange={handleFieldChange}
                            setInputSubTypeValidation={setInputSubTypeValidation}
                            setLabel={setLabel}
                            setIsRequired={setIsRequired}
                            setIsValidation={setIsValidation}
                            handleSubTypeChange={handleSubTypeChange}
                            setValidationContidion={setValidationContidion}
                            setErrorText={setErrorText}
                        />
                        console.log("<TextArea/>");

                    } else if (field.inputType === "multiple_choice") {

                        return <MultipleChoiceField
                            key={idx}
                            index={idx}
                            fieldData={field}
                            fieldTypesList={fieldType}
                            setLabel={setLabel}
                            handleFieldChange={handleFieldChange}
                            setIsRequired={setIsRequired}
                            addMoreOption={addMoreOption}
                            handleOptionNameChange={handleOptionNameChange}
                            handleDeleteOption={handleDeleteOption}

                        />
                    } else if (field.inputType === "checkboxes") {
                        return <CheckBoxField
                            key={idx}
                            index={idx}
                            fieldData={field}
                            fieldTypesList={fieldType}
                            setLabel={setLabel}
                            handleFieldChange={handleFieldChange}
                            setIsRequired={setIsRequired}
                            handleRemoveField={removeFormField}
                            addMoreOption={addMoreOption}
                            handleOptionNameChange={handleOptionNameChange}
                            handleDeleteOption={handleDeleteOption}
                        />
                    } else if (field.inputType === "dropdown") {
                        return <DropdownField
                            key={idx}
                            index={idx}
                            fieldData={field}
                            fieldTypesList={fieldType}
                            setLabel={setLabel}
                            handleFieldChange={handleFieldChange}
                            setIsRequired={setIsRequired}
                            handleRemoveField={removeFormField}
                            addMoreOption={addMoreOption}
                            handleOptionNameChange={handleOptionNameChange}
                            handleDeleteOption={handleDeleteOption}
                        />
                    } else if (field.inputType === "file") {
                        return <FileField
                            key={idx}
                            index={idx}
                            fieldData={field}
                            fieldTypesList={fieldType}
                            setLabel={setLabel}
                            handleFieldChange={handleFieldChange}
                            setIsRequired={setIsRequired}
                            handleRemoveField={removeFormField}
                            setMaxSize={setMaxSize}
                        />
                    }
                })
            }
            <div className='flex items-center justify-between px-5'>
                <button onClick={handleAddField} className=" hover:shadow-lg text-4xl"><MdAddCircleOutline />
                </button>

                <Button onClick={handleSubmitForm}>Save form</Button>
            </div>

        </div>

    )
}

export default FormField2;


