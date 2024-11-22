import TitleComponent from '@/components/common/TitleComponent';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Input, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicationId, setAttributeId, setCurrentStatus } from '@/redux/admin/slices/AppliationManagement/Index';
import { addCaseHistory, manageApplicationEscalateStatus, manageApplicationFormStatus, updateApplicationStatus } from '@/redux/admin/actions/ApplicationManagement';
import { FaSpinner } from 'react-icons/fa';
import HeaderTitle from '@/components/common/HeaderTitle';
import { getCurrentDateTime } from '@/Helpers/globalfunctions';
import FileDownloader from './FileDownloader';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import axios from 'axios';
import InputField from '../FormManagement/InputField';
import TextArea from '../FormManagement/TextArea';
import CheckBox from '../FormManagement/CheckBox';
import RadioButton from '../FormManagement/RadioButton';
import Dropdown from '../FormManagement/DropDown';
import FileUpload from '../FormManagement/FileUpload';
import { toast } from 'react-toastify';

const FormRenderer = ({ formData, caseId, amount, startDate, agentData, agentList, completionDate }) => {
    const { attributeId, isStatusLoading, userId, applicationId, isFetching, submitLoading } = useSelector((state) => state.applications);
    const [formValues, setFormValues] = useState({});
    const [activeButton, setActiveButton] = useState({});
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [selectedAttributeId, setSelectedAttributeId] = useState(null);
    const [todayDate, setTodayDate] = useState('');
    const [todayDateValidation, setTodayDateValidation] = useState('');
    const [rejectStatus, setRejectStatus] = useState('');
    const [agentState, setAgentState] = useState(agentData[0]?._id);
    const [expectedCompletionDate, setExpectedCompletionDate] = useState(completionDate);
    const { id } = useParams();   //id == applicationId

    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const role = localStorage.getItem('role');
    // console.log("agentState",agentState);
    // console.log("expectedCompletionDate",expectedCompletionDate);



    let applicationIdLocal = localStorage.getItem("applicationId")

   

    if(!applicationId){
        dispatch(setApplicationId(applicationIdLocal))
      }
  
   

    console.log("storedData:", role);



    // console.log("params",params.get("formId"),params.get("userId"));

    // console.log("propsData", { formData, caseId, amount, startDate, agentData });


    // Handle change for inputs
    const handleChange = (e) => {
        setExpectedCompletionDate(e.target.value)
        // const { name, value } = e?.target;
        // setFormValues((prevValues) => ({
        //     ...prevValues,
        //     [name]: value,
        // }));
    };

    

    // Handle form submission
    const handleSubmit = (e) => {


        const dateTimeString = formValues.completionDate || expectedCompletionDate;
        const dateTime = new Date(dateTimeString);  // Convert string to Date object
        const timestamp = dateTime.getTime();
        e.preventDefault();

        if (!timestamp) {
            toast.error("Please select expected completion date");
            return;
        }
        if (!agentState) {
            toast.error("Please select agent");
            return;
        }

        dispatch(updateApplicationStatus({

            "applicationId": id,
            "expectedCompletionDate": timestamp,
            "agentId": agentState
        }));

        console.log({
            "applicationId": id,
            "action": `Agent and Expected date of completion update`,
            "performedBy": params.get("userId"),
            //   "reason": rejectReason,
            // "statusBefore": status,
            // "statusAfter": value
        });


        dispatch(addCaseHistory({
            "applicationId": id,
            "action": `Agent and Expected date of completion update`,
            "performedBy": params.get("userId"),
            //   "reason": rejectReason,
            // "statusBefore": status,
            // "statusAfter": value
        }));

    };

    console.log("check form data in form page", formData?.[0]?.user_application?.[0]?.expectedCompletionDate || "")

    useEffect(() => {
        const todayDate = getCurrentDateTime();
        setTodayDateValidation(todayDate)

    }, []);

    // Handle rejection reason submission
    const handleRejectSubmit = () => {
        const data = {
            "attributeId": selectedAttributeId,
            "status": "reject",
            "rejectReason": rejectReason
        };
        dispatch(addCaseHistory({
            "applicationId": id,
            "action": `Application Status changed  ${rejectStatus} To reject`,
            "performedBy": params.get("userId"),
            "reason": rejectReason,
            "statusBefore": rejectStatus,
            "statusAfter": "reject"
        }));
        dispatch(setAttributeId(selectedAttributeId));
        dispatch(manageApplicationFormStatus(data));
        setRejectModalOpen(false);
        setRejectReason("");
    };

    const getAttributeId = (attributeId, value, status, inputValue) => {
        // console.log("attributeId, value, status, inputValue", attributeId, value, status, inputValue);

        const data = {
            "attributeId": attributeId,
            "status": value
        };
        setActiveButton(value);
        dispatch(setAttributeId(attributeId));
        dispatch(setCurrentStatus(value));
        dispatch(manageApplicationFormStatus(data));
        dispatch(addCaseHistory({
            "applicationId": id,
            "action": `${inputValue} field Status changed ${status} to ${value}`,
            "performedBy": params.get("userId"),
            "reason": rejectReason,
            "statusBefore": status,
            "statusAfter": value
        }));

        if (value === "escalate") {

            const payload = {
                "applicationId": id,
                "attributeId": attributeId,
                "status": "escalate"

            }

            dispatch(manageApplicationEscalateStatus(payload))

        }

    };

    const handleEscalateButton = (attributeId, rejectReason) => {
        setActiveButton("escalate")
        dispatch(setAttributeId(attributeId))
        const payload = {
            "applicationId": id,
            // "attributeId":attributeId
        }
        // console.log("check handle escalate button data", attributeId, rejectReason)
        dispatch(manageApplicationEscalateStatus(payload))

    }

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const formattedDate = date.toISOString().slice(0, 16); // Gets YYYY-MM-DDTHH:MM format
        return formattedDate;
    };





    const formattedAgentList = agentList?.map(agent => ({
        value: agent._id,
        label: agent.name
    }));

    const breadcrumbData = [
        {


            name: 'Application',
            url: "/dashboard/admin/application-management",
            children: [
                {
                    name: 'Application Form',
                    url: `/dashboard/admin/add-application/${applicationId}`


                },
            ],
        }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbData} />
            <form onSubmit={handleSubmit} className="w-100">

                <div>
                    <TitleComponent title={"CORPZO |Application Form"} />
                    {/* <h1 className="text-xl md:text-3xl font-semibold mb-4">{"Application Form"} </h1> */}
                    <HeaderTitle title="Application Form" />
                    <div className='w-100 flex flex-row justify-between items-center mb-4'>
                        <div className='w-1/4'>


                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Select Agent
                            </Typography>
                            <Select
                                name="agent"
                                options={formattedAgentList}
                                className="basic-single" // Change class name to basic-single for single select
                                classNamePrefix="select"
                                value={formattedAgentList?.find(option => option.value === agentState)}
                                onChange={(selectedOption) => {
                                    // console.log("selectedOption",selectedOption);

                                    const selectedValue = selectedOption ? selectedOption.value : null;

                                    setAgentState(selectedValue);
                                }}
                                isSearchable // This keeps the search functionality enabled
                            />


                        </div>




                        <div className='w-1/2 flex gap-4 justify-center items-center'>
                            <NavLink to={"/dashboard/admin/team-history"} className="bg-blue-500 text-center text-white w-full mt-4 font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Team Note
                            </NavLink>
                            <NavLink to={"/dashboard/admin/case-history"} className="bg-blue-500 text-white w-full mt-4 font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Case History
                            </NavLink>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center justify-evenly'>
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Case Id
                            </Typography>
                            <Input
                                size="sm"
                                type='text'
                                name="caseId"
                                placeholder="Enter Offer title"
                                value={formValues.caseId || caseId}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleChange}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Start Date
                            </Typography>
                            <Input
                                size="sm"
                                type='date'
                                name="startDate"
                                value={formValues.startDate || startDate}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleChange}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Amount
                            </Typography>
                            <Input
                                size="sm"
                                type='text'
                                name="amount"
                                value={formValues.amount || amount}
                                placeholder="Enter Offer title"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleChange}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Expected date of completion
                            </Typography>
                            <Input
                                size="sm"
                                type='datetime-local'
                                name="completionDate"
                                value={formValues.completionDate || formatDateForInput(expectedCompletionDate) || ''}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                min={todayDateValidation}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

              
                {formData.length > 0 && formData.map((field) => {
                    return <div className='flex items-center border-l-2 border-blue-400 shadow-lg m-4 justify-between pr-10'>
                        {field.inputType === 'text' && <InputField field={field} />}
                        {field.inputType === 'paragraph' && <TextArea field={field} />}
                        {field.inputType === 'checkboxes' && <CheckBox field={field} />}
                        {field.inputType === 'multiple_choice' && <RadioButton field={field} />}
                        {field.inputType === 'dropdown' && <Dropdown field={field} />}
                        {field.inputType === 'file' && <FileUpload field={field} />}

                        <div className="flex gap-2 flex-col ">
                            <button
                                type="button"
                                className={`py-0 px-4 rounded-lg ${field.status === "accept" ? "bg-green-600" : "border border-gray-500 text-gray-500"} hover:bg-green-600 hover:text-white`}
                                onClick={() => (role === "admin" && field.adminApprovalRequired) ||
                                    (role === "manager" && field.managerApprovalRequired) ||
                                    (role === "agent" && field.agentApprovalRequired) ? getAttributeId(field._id, "accept", field.status, field.value) : toast.warning("You don't have the permission to change this.")
                                }
                                disabled={field.status === "accept" ? true : false || isStatusLoading}
                            >
                                {isStatusLoading && activeButton === "accept" && field._id === attributeId ? (
                                    <FaSpinner className="animate-spin text-black text-xl inline " />
                                ) : "Accept"}
                            </button>

                            <button
                                type="button"
                                className={`py-0 px-4 rounded-lg ${field.status === "hold" ? "bg-yellow-600" : "border border-gray-500 text-gray-500"} hover:bg-yellow-600 hover:text-white`}
                                onClick={() => (role === "admin" && field.adminApprovalRequired) ||
                                    (role === "manager" && field.managerApprovalRequired) ||
                                    (role === "agent" && field.agentApprovalRequired) ? getAttributeId(field._id, "hold", field.status, field.value) : toast.warning("You don't have the permission to change this.")}
                                disabled={field.status === "hold" ? true : false || isStatusLoading}
                            >
                                {isStatusLoading && activeButton === "hold" && field._id === attributeId ? (
                                    <FaSpinner className="animate-spin text-black text-xl inline" />
                                ) : "Hold"}
                            </button>

                            <button
                                type="button"
                                className={`py-0 px-4 rounded-lg ${field.status === "reject" ? "bg-red-600" : "border border-gray-500 text-gray-500"} hover:bg-red-600 hover:text-white`}
                                onClick={() => {

                                    if((role === "admin" && field.adminApprovalRequired) ||
                                    (role === "manager" && field.managerApprovalRequired) ||
                                    (role === "agent" && field.agentApprovalRequired)){
                                        setRejectModalOpen(true);
                                        setSelectedAttributeId(field._id);
                                        setRejectStatus(field.status)
                                        setActiveButton("reject")
                                    }else {
                                        toast.warning("You don't have the permission to change this.")
                                    }

                                   
                                }}
                                disabled={field.status === "reject" ? true : false || isStatusLoading}
                            >

                                {isStatusLoading && activeButton === "reject" && field._id === attributeId ? (
                                    <FaSpinner className="animate-spin text-black text-xl inline" />
                                ) : "Reject "}
                            </button>

                            {field.rejectReason && <button
                                className={`py-0 px-4 rounded-lg ${field.status === "escalate" ? "bg-orange-600" : "bg-gray-500"} hover:bg-orange-600 text-white`}
                                onClick={() => getAttributeId(field._id, "escalate", field.status, field.value)}
                                disabled={field.status === "escalate" ? true : false || isStatusLoading}
                            >
                                {isStatusLoading && activeButton == "escalate" && field._id === attributeId ? (
                                    <FaSpinner className="animate-spin text-white text-xl inline" />
                                ) : "Escalate"}

                            </button>}

                            <NavLink to={"/dashboard/admin/field-history"} onClick={() => dispatch(setAttributeId(item._id))} className="bg-blue-500 text-white py-0 px-4 mb-2 rounded-lg hover:bg-blue-600">
                                Add Note
                            </NavLink>
                        </div>
                    </div>

                })}

                <button disabled={submitLoading} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    {submitLoading && submitLoading == true ? (
                        <FaSpinner className="animate-spin text-white text-xl inline" />
                    ) : "Submit "}
                </button>
            </form>

            {/* Modal for rejection reason */}
            <Dialog open={isRejectModalOpen} handler={() => setRejectModalOpen(false)}>
                <DialogHeader>Reject with Reason</DialogHeader>
                <DialogBody divider>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={4}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Enter rejection reason here..."
                    />
                </DialogBody>
                <DialogFooter>
                    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={handleRejectSubmit}>

                        {isStatusLoading == true && activeButton === "reject" ? (
                            <FaSpinner className="animate-spin text-white text-xl inline" />
                        ) : "Reject "}
                    </button>
                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400" onClick={() => setRejectModalOpen(false)}>
                        Cancel
                    </button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default FormRenderer;
