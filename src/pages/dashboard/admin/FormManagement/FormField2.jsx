import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Option, Switch } from '@material-tailwind/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import InputField from '@/components/formbuilder/InputField';
import MultipleChoiceField from '@/components/formbuilder/MultipleChoiceField';
import CheckBoxField from '@/components/formbuilder/CheckBoxField';
import DropdownField from '@/components/formbuilder/DropdownField';
import FileField from '@/components/formbuilder/FileField';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import TitleComponent from '@/components/common/TitleComponent';
import formAPIs from '@/constants/APIList/formAPIs';
import { TailSpin } from 'react-loader-spinner';
import HeaderTitle from '@/components/common/HeaderTitle';


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
const staticRegexSubTypeValidation = [{ name: "Does not contains", value: "does_not_contains" },
{ name: "Contains", value: "contains" },
];
const staticNumberSubTypeValidation = [{ name: "Greater than", value: "greater_than" },
{ name: "Greater than equal to", value: "greater_than_equal_to" },
{ name: "Less than equal to", value: "less_than_equal_to" },
{ name: "Equal to", value: "equal_to" },
{ name: "Not equal to", value: "not_equal_to" },
]

const staticLengthSubTypeValidation = [{ name: "Max character count", value: "max_character_count" },
{ name: "Min Character Count", value: "min_character_count" },
]



function FormField2({ index, fieldData, onFieldChange, onRemoveField, availableElements }) {
    const { id } = useParams();
    const navigate = useNavigate();


    const [formFields, setFormFields] = useState([
        {
            inputType: "text",
            label: "",
            isLabelValid: true,
            selectedType: "short_answer",
            isRequired: false,
            isValidation: false,
            inputSubType: "text",
            inputSubTypeValidationList: staticTextSubTypeValidation,
            validationPlaceholder: "",
            validationContidion: "",
            error: null,
            adminApprovalRequired: true,
            agentApprovalRequired: true,
            mangerApprovalRequired: true,
            escalationDegree: 1
        },

    ]);
    console.log("formFields", formFields);

    const [fieldType, setFieldType] = useState([]);
    const [isLabelsValid, setIsLabelsValid] = useState(true);
    const [formDetails, setFormDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);



    console.log("fieldType", fieldType);

    useEffect(() => {
        const fetchExistingFields = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.BACKEND_BASE_URL}/admin/form/dynamic-form?formId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                console.log("response fetchExistingFields: ", response.data?.data);

                const filteredData = response.data?.data.map((data, idx) => {
                    // console.log(idx,data);

                    const newData = {
                        _id: data._id,
                        formId: data.formId,
                        dynamicFormId: data.dynamicFormId,
                        inputType: data.inputType,
                        label: data.lebel,
                        isLabelValid: true,//
                        selectedType: "short_answer",  //not provided
                        isRequired: data.isRequired,
                        options: data.options,
                        isValidation: data.isValidationRequired,
                        inputSubType: data.inputSubType,
                        inputSubTypeValidationList: staticTextSubTypeValidation,
                        inputSubTypeValidation: data.inputSubTypeValidation,
                        text: data.text,
                        number: data.nuumber,
                        validationPlaceholder: "",  //not provided
                        validationContidion: "",  // not provided
                        error: data.custom_validation_msg,
                        adminApprovalRequired: data.adminApprovalRequired,
                        agentApprovalRequired: data.agentApprovalRequired,
                        mangerApprovalRequired: data.mangerApprovalRequired,
                        escalationDegree: data.escalationDegree || 1

                    }
                    return newData;

                })

                console.log("filteredData", filteredData);



                setFormFields(filteredData);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchExistingFields();
    }, [])

    useEffect(() => {
        const fetchDropdownList = async () => {
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
    }, [])

    const setInputSubTypeValidation = (index, data) => {
        formFields[index].inputSubTypeValidationList = data;
        setFormFields(formFields);
    }


    const handleAddField = () => {
        setFormFields([...formFields, {
            inputType: "text",
            label: "",
            isLabelValid: true,
            selectedType: "short_answer",
            isRequired: false,
            isValidation: false,
            inputSubType: "text",
            inputSubTypeValidationList: staticTextSubTypeValidation,
            validationPlaceholder: "",
            validationContidion: "",
            error: null,
            adminApprovalRequired: true,
            agentApprovalRequired: true,
            mangerApprovalRequired: true,
            escalationDegree: 1
        }]);
    }

    const removeFormField = async (index) => {
        // console.log("removeFormField id", id);
        if (formFields[index]._id) {
            const payload ={ formInputId: formFields[index]._id}
            axios.put(`${process.env.BACKEND_BASE_URL}/admin/form/inactive-dynamic-form`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
                .then((response) => {
                    const updatedFields = formFields.filter((field, idx) => idx !== index);
                    setFormFields(updatedFields);
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })
        } else {
            const updatedFields = formFields.filter((field, idx) => idx !== index);
            setFormFields(updatedFields);
        }

    }
    // Handle field change
    const handleFieldChange = (index, updatedType) => {
        // console.log(index, updatedType);

        console.log("handleFieldChange", index, updatedType);

        if (updatedType === "short_answer") {
            formFields[index] = {
                inputType: "text",
                label: "",
                isLabelValid: true,
                selectedType: updatedType,
                isRequired: false,
                isValidation: false,
                inputSubType: null,
                inputSubTypeValidationList: [],
                validationPlaceholder: "",
                validationContidion: null,
                error: null,
                adminApprovalRequired: true,
                agentApprovalRequired: true,
                mangerApprovalRequired: true,
                escalationDegree: 1
            }
        } else if (updatedType === "paragraph") {
            formFields[index] = {
                inputType: "paragraph",
                label: "",
                isLabelValid: true,
                selectedType: "short_answer",
                isRequired: false,
                isValidation: false,
                inputSubType: "text",
                inputSubTypeValidationList: staticTextSubTypeValidation,
                validationPlaceholder: "",
                validationContidion: "",
                error: null,
                adminApprovalRequired: true,
                agentApprovalRequired: true,
                mangerApprovalRequired: true,
                escalationDegree: 1
            }
        } else if (updatedType === "multiple_choice") {
            formFields[index] = {
                inputType: "multiple_choice",
                label: "",
                isLabelValid: true,
                isRequired: false,
                options: ["option1", "option2"],
                adminApprovalRequired: true,
                agentApprovalRequired: true,
                mangerApprovalRequired: true,
                escalationDegree: 1
            }
        } else if (updatedType === "checkboxes") {
            formFields[index] = {
                inputType: "checkboxes",
                label: "",
                isLabelValid: true,
                isRequired: false,
                options: ["option1", "option2"],
                adminApprovalRequired: true,
                agentApprovalRequired: true,
                mangerApprovalRequired: true,
                escalationDegree: 1
            }
        } else if (updatedType === "dropdown") {
            formFields[index] = {
                inputType: "dropdown",
                label: "",
                isLabelValid: true,
                isRequired: false,
                options: ["option1", "option2"],
                adminApprovalRequired: true,
                agentApprovalRequired: true,
                mangerApprovalRequired: true,
                escalationDegree: 1
            }
        } else if (updatedType === "file") {
            formFields[index] = {
                inputType: "file",
                label: "",
                isLabelValid: true,
                isRequired: false,
                fileSize: 1,
                adminApprovalRequired: true,
                agentApprovalRequired: true,
                mangerApprovalRequired: true,
                escalationDegree: 1
            }
        }
        setFormFields([...formFields]);
    };

    const setLabel = (index, newLabel) => {
        console.log("setLabel", index, newLabel);

        const regex = /^[a-zA-Z0-9 ]{3,30}$/; // Alphanumeric and spaces, between 3 and 30 characters

        (regex.test(newLabel)) ? formFields[index].isLabelValid = true : formFields[index].isLabelValid = false;



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
        if (formFields[index].isValidation) {
            formFields[index].inputSubType = "text";
            formFields[index].inputSubTypeValidation = "does_not_contains";
            formFields[index].text = "";
            formFields[index].error = "";
        }
        setFormFields([...formFields]);
    }
    const handleSubTypeChange = (index, newValue) => {
        console.log("handleSubTypeChange:", index, newValue);
        formFields[index].inputSubType = newValue;
        if (newValue === "text") {
            formFields[index].validationPlaceholder = "Text";
            formFields[index].inputSubTypeValidationList = staticTextSubTypeValidation;

            formFields[index].inputSubTypeValidation = "does_not_contains";
            formFields[index].text = "";
            formFields[index].error = "";
        } else if (newValue === "number") {
            formFields[index].validationPlaceholder = "Number"
            formFields[index].inputSubTypeValidationList = staticNumberSubTypeValidation;

            formFields[index].inputSubTypeValidation = "greater_than";
            formFields[index].number = "";
            formFields[index].error = "";
        } else if (newValue === "length") {
            formFields[index].validationPlaceholder = "Number"
            formFields[index].inputSubTypeValidationList = staticLengthSubTypeValidation;

            formFields[index].inputSubTypeValidation = "max_character_count";
            formFields[index].number = "";
            formFields[index].error = "";
        }else if(newValue === "regex"){
            formFields[index].validationPlaceholder = "Pattern";
            formFields[index].inputSubTypeValidationList = staticRegexSubTypeValidation;

            formFields[index].inputSubTypeValidation = "does_not_contains";
            formFields[index].text = "";
            formFields[index].error = "";
        }
        setFormFields([...formFields]);
    }

    const handleSubTypeValidationChange = () => {

    }

    const setValidationContidion = (index, newValue) => {
        console.log("setValidationContidion", newValue);

        formFields[index].inputSubTypeValidation = newValue;
        setFormFields([...formFields]);
    }
    const setCondition = (index, condition, newValue) => {
        console.log("setCondition",index,condition,newValue);
        if (condition === "text") {
            formFields[index].text = newValue;
        } else {
            formFields[index].number = newValue;
        }
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
    const setMaxSize = (index, newValue) => {
        // console.log("setMaxSize",index,newValue);
        formFields[index].fileSize = newValue
        setFormFields([...formFields]);
    }


    //Handling save/submit form 
    const handleSubmitForm =async () => {
        console.log("handleSubmitForm");


        const formData = formFields.map((field) => {
            const payload = {
                dynamicFormId: id,
                formId: id,
            }

            payload._id = field._id;
            payload.inputType = field.inputType;
            payload.lebel = field.label;
            payload.isRequired = field.isRequired;
            payload.adminApprovalRequired = field.adminApprovalRequired;
            payload.agentApprovalRequired = field.agentApprovalRequired;
            payload.mangerApprovalRequired = field.mangerApprovalRequired;
            payload.escalationDegree = field.escalationDegree;


            if (field.inputType === "text" || field.inputType === "paragraph") {
                payload.isValidationRequired = field.isValidation;
                payload.inputSubType = field.inputSubType;
                // payload.validationContidion = field.validationContidion;
                // payload.validationPlaceholder = field.validationPlaceholder;
                payload.inputSubTypeValidation = field.inputSubTypeValidation;
                if (payload.inputSubType === "text"||payload.inputSubType === "regex") {
                    payload.text = field.text;
                    payload.custom_validation_msg = field.error;

                } else {
                    payload.number = Number(field.number);
                    payload.custom_validation_msg = field.error;
                }
            } else if (field.inputType === "multiple_choice") {
                payload.options = field.options;
                payload.inputSubType = field.inputSubType;


            } else if (field.inputType === "checkboxes") {
                payload.options = field.options;

            } else if (field.inputType === "dropdown") {
                payload.options = field.options;
            } else if (field.inputType === "file") {
                payload.maxSize = field.fileSize;
            }
            return payload
        })

        console.log("Saving....formData :", formData);


        //Loop to call saving formData in DB
        // formData.map((data) => {
        //     console.log(data._id);

        //     if (data._id) {
        //         data.formInputId = data._id
        //         updateFormData(data);
        //     } else {
        //         saveFormData(data);
        //     }
        // });


        try {
            // Simulate API calls for each child
            setIsSaving(true);
            const savePromises = Object.entries(formData).map(([key, payload]) => {
                const requestData = { ...payload };
                if (payload._id) {
                    requestData.formInputId = payload._id;
                    return axios.put(`${process.env.BACKEND_BASE_URL}/admin/form/dynamic-form`, requestData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    });
                } else {
                    return axios.post(`${process.env.BACKEND_BASE_URL}/admin/form/dynamic-form`, requestData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    });
                }
            });
            
            await Promise.all(savePromises); // Wait for all API calls to complete
            // alert("All data saved successfully!");
            toast.success("Form Saved")
          } catch (error) {
            console.error("Error saving data:", error);
          } finally {
            setIsSaving(false);
          }
        

        navigate('/dashboard/admin/form')


    }

    const saveFormData = async (payload) => {
        console.log("saving....", payload);

        axios.post(`${process.env.BACKEND_BASE_URL}/admin/form/dynamic-form`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        })
            .then((response) => {
                // toast.success("A Form feild Saved")
                // console.log(response);
                // navigate('/dashboard/admin/form')
            }).catch((error) => {
                // toast.error("A Form field not saved")
                console.log(error);

            })
    }

    const updateFormData = async (payload) => {
        console.log("updating....", payload);

        axios.put(`${process.env.BACKEND_BASE_URL}/admin/form/dynamic-form`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        })
            .then((response) => {
                // toast.success("A Form Field Updated")
                console.log(response);
                // navigate('/dashboard/admin/form')
            }).catch((error) => {
                // toast.error("A Field not updated")
                console.log(error);

            })
    }

    const setadminApproval = (index, newValue) => {
        formFields[index].adminApprovalRequired = newValue;
        setFormFields([...formFields]);
    }
    const setmangerApproval = (index, newValue) => {
        formFields[index].mangerApprovalRequired = newValue;
        setFormFields([...formFields]);
    }
    const setagentApproval = (index, newValue) => {
        formFields[index].agentApprovalRequired = newValue;
        setFormFields([...formFields]);
    }
    const setEscalationDegree = (index, newValue) => {
        if (newValue < 0 || newValue > 10) return;

        formFields[index].escalationDegree = newValue;
        setFormFields([...formFields]);
    }


    useEffect(() => {
        const fetchformDetails = async () => {
            const response = await axios.get(`${formAPIs.getFormById}?formId=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            })
            // console.log("responsessss",response.data?.data[0]);
            setFormDetails(response.data?.data[0])
        }
        fetchformDetails();
    }, []);

    useEffect(()=>{
        const hasInvalidLabel = formFields.some((field) => !field.isLabelValid);
        if(hasInvalidLabel) setIsLabelsValid(false);
        else setIsLabelsValid(true);
        
    },[setLabel])

    if (isLoading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
    }

    return (

        <div>
            <HeaderTitle title={"Form Management"} />
            <div className='border-b-2 p-3 flex flex-col justify-center items-center  '>
                <p className=' text-3xl'>{formDetails?.title}</p>
                <p>{formDetails?.description}</p>

            </div>
            <TitleComponent title={"CORPZO | Add Field"}></TitleComponent>
            {
                formFields.map((field, idx) => {
                    // console.log(field);

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
                            setCondition={setCondition}
                            setErrorText={setErrorText}
                            setadminApproval={setadminApproval}
                            setmangerApproval={setmangerApproval}
                            setagentApproval={setagentApproval}
                            setEscalationDegree={setEscalationDegree}
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
                            setadminApproval={setadminApproval}
                            setmangerApproval={setmangerApproval}
                            setagentApproval={setagentApproval}
                            setEscalationDegree={setEscalationDegree}
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
                            handleRemoveField={removeFormField}
                            setIsRequired={setIsRequired}
                            addMoreOption={addMoreOption}
                            handleOptionNameChange={handleOptionNameChange}
                            handleDeleteOption={handleDeleteOption}
                            setadminApproval={setadminApproval}
                            setmangerApproval={setmangerApproval}
                            setagentApproval={setagentApproval}
                            setEscalationDegree={setEscalationDegree}
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
                            setadminApproval={setadminApproval}
                            setmangerApproval={setmangerApproval}
                            setagentApproval={setagentApproval}
                            setEscalationDegree={setEscalationDegree}
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
                            setadminApproval={setadminApproval}
                            setmangerApproval={setmangerApproval}
                            setagentApproval={setagentApproval}
                            setEscalationDegree={setEscalationDegree}
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
                            setadminApproval={setadminApproval}
                            setmangerApproval={setmangerApproval}
                            setagentApproval={setagentApproval}
                            setEscalationDegree={setEscalationDegree}
                        />
                    }
                })
            }
            <div className='flex items-center justify-between px-5'>
                <button onClick={handleAddField} className=" hover:shadow-lg text-4xl"><MdAddCircleOutline />
                </button>
            {
                isSaving ? <TailSpin color="#000" height={40} width={40} timeout={3000} />
                :
                <Button disabled={!isLabelsValid} onClick={handleSubmitForm}>Save form</Button>            
            }
            </div>

        </div>

    )
}

export default FormField2;


