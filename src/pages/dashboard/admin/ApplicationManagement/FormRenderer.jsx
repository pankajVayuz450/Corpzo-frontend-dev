import TitleComponent from '@/components/common/TitleComponent';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { NavLink, useParams } from 'react-router-dom';
import { Input, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { setAttributeId, setCurrentStatus } from '@/redux/admin/slices/AppliationManagement/Index';
import { addCaseHistory, manageApplicationEscalateStatus, manageApplicationFormStatus, updateApplicationStatus } from '@/redux/admin/actions/ApplicationManagement';
import { FaSpinner } from 'react-icons/fa';
import HeaderTitle from '@/components/common/HeaderTitle';
import { getCurrentDateTime } from '@/Helpers/globalfunctions';
import FileDownloader from './FileDownloader';
import Breadcrumb from '@/widgets/layout/TopNavigation';

const FormRenderer = ({ formData, caseId, amount, startDate, agentData }) => {
    const { attributeId, isStatusLoading, userId, applicationId, isFetching,submitLoading } = useSelector((state) => state.applications);
    const [formValues, setFormValues] = useState({});
    const [activeButton, setActiveButton] = useState({});
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [selectedAttributeId, setSelectedAttributeId] = useState(null);
    const [todayDate, setTodayDate] = useState('');
    const [todayDateValidation, setTodayDateValidation] = useState('');
    const [rejectStatus, setRejectStatus] = useState('');
    const [agentState, setAgentState] = useState()
    const { id } = useParams();
    const dispatch = useDispatch();

    // Handle change for inputs
    const handleChange = (e) => {
        const { name, value } = e?.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {

       
        const dateTimeString = formValues.completionDate;
        const dateTime = new Date(dateTimeString);  // Convert string to Date object
        const timestamp = dateTime.getTime();
        e.preventDefault();
        dispatch(updateApplicationStatus({

            "applicationId": applicationId,
            "expectedCompletionDate": timestamp,
            "agentId": agentState
        }));

    };

    console.log("check form data in form page",formData?.[0]?.user_application?.[0]?.expectedCompletionDate ||"")

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
            "applicationId": applicationId,
            "action": `Application Status changed  ${rejectStatus} To reject`,
            "performedBy": userId,
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
        const data = {
            "attributeId": attributeId,
            "status": value
        };
        setActiveButton(value);
        dispatch(setAttributeId(attributeId));
        dispatch(setCurrentStatus(value));
        dispatch(manageApplicationFormStatus(data));
        dispatch(addCaseHistory({
            "applicationId": applicationId,
            "action": `${inputValue} field Status changed ${status} to ${value}`,
            "performedBy": userId,
              "reason": rejectReason,
            "statusBefore": status,
            "statusAfter": value
        }));

        if (value==="escalate"){

            const payload = {
                "applicationId":applicationId ,
                "attributeId":attributeId,
                "status":"escalate"

              }
            
            dispatch(manageApplicationEscalateStatus(payload))

        }

    };

    const handleEscalateButton = (attributeId,rejectReason)=>{
                setActiveButton("escalate")
                dispatch(setAttributeId(attributeId))
        const payload = {
            "applicationId":applicationId ,
            // "attributeId":attributeId
          }
        console.log("check handle escalate button data",attributeId,rejectReason)
        dispatch(manageApplicationEscalateStatus(payload))

    }

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const formattedDate = date.toISOString().slice(0, 16); // Gets YYYY-MM-DDTHH:MM format
        return formattedDate;
    };
    

                                        


    const formattedAgentList = agentData?.map(agent => ({
        value: agent._id,
        label: agent.name
    }));

    const breadcrumbData = [
        {
          
            
              name: 'Application',
              url:"/dashboard/admin/application-management",
              children: [
                {
                  name: 'Application Form',
                  url: '/dashboard/admin/add-application'
                 
                  
                },
              ],
        }
      ];

    return (
        <>
            <Breadcrumb items={breadcrumbData}/>
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
                                value={formValues.completionDate ||formatDateForInput(formData?.[0]?.user_application?.[0]?.expectedCompletionDate )|| ''}
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

                {/* Map over form data */}
                {formData?.map((item) => {
                    

                    const { element, attributesData, value, options, form_subinputs, status ,rejectReason,user_application} = item;
                   
                    console.log("check the rejectReason value",user_application)

                    switch (element) {
                        case 'input':
                            return (
                                <div key={item._id} className="flex flex-row gap-4 items-center ">
                                    <div className="flex-1">

                                    {attributesData?.name =="myfile"? (<FileDownloader fileUrl={value}/>):(<>
                                   
                                        <input
                                            type={form_subinputs[0]?.subtypeName || "text"}
                                            name={attributesData.name}
                                            id={attributesData.id}
                                            placeholder={attributesData.placeholder}
                                            value={formValues[attributesData.name] || value}
                                            onChange={handleChange}
                                            disabled={true}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                        />
                                    </>)}
                                        
                                       
                                    </div>

                                    <div className="flex gap-2">
                                        {/* Accept Button */}
                                        <button
                                            className={`py-2 px-4 rounded ${status === "accept" ? "bg-green-600" : "bg-black"} hover:bg-green-600 text-white`}
                                            onClick={() => getAttributeId(item._id, "accept", status, item.value)}
                                            disabled={status === "accept"?true:false || isStatusLoading}
                                        >
                                            {isStatusLoading && activeButton === "accept" && item._id === attributeId ? (
                                                <FaSpinner className="animate-spin text-white text-xl inline " />
                                            ) : "Accept"}
                                        </button>

                                        {/* Hold Button */}
                                        <button
                                            className={`py-2 px-4 rounded ${status === "hold" ? "bg-yellow-600" : "bg-black"} hover:bg-yellow-600 text-white`}
                                            onClick={() => getAttributeId(item._id, "hold", status, item.value)}
                                            disabled={status === "hold"?true:false || isStatusLoading}
                                        >
                                            {isStatusLoading && activeButton === "hold" && item._id === attributeId ? (
                                                <FaSpinner className="animate-spin text-white text-xl inline" />
                                            ) : "Hold"}
                                        </button>

                                        {/* Reject Button */}
                                        <button
                                            className={`py-2 px-4 rounded ${status === "reject" ? "bg-red-600" : "bg-black"} hover:bg-red-600 text-white`}
                                            onClick={() => {
                                                setRejectModalOpen(true);
                                                setSelectedAttributeId(item._id);
                                                setRejectStatus(status)
                                                setActiveButton("reject")
                                            }}
                                            disabled={status === "reject"?true:false || isStatusLoading}
                                        >
                                            
                                            {isStatusLoading && activeButton === "reject" && item._id === attributeId ? (
                                                <FaSpinner className="animate-spin text-white text-xl inline" />
                                            ) : "Reject "}
                                        </button>

                                        {rejectReason &&  <button
                                            className={`py-2 px-4 rounded ${status === "escalate" ? "bg-orange-600" : "bg-black"} hover:bg-orange-600 text-white`}
                                            onClick={() => getAttributeId(item._id, "escalate", status, item.value)}
                                            disabled={status === "escalate"?true:false || isStatusLoading}
                                        >
                                            {isStatusLoading && activeButton == "escalate" && item._id === attributeId ? (
                                                <FaSpinner className="animate-spin text-white text-xl inline" />
                                            ) : "Escalate"}
                                           
                                        </button>}

                                        {/* Note Button */}
                                        <NavLink to={"/dashboard/admin/field-history"} onClick={() => dispatch(setAttributeId(item._id))} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                            Note
                                        </NavLink>
                                    </div>
                                </div>
                            );

                        case 'label':
                            return (
                                <>
                                
                                <div key={item._id} className="flex flex-col gap-2 w-1/4">
                                 {attributesData?.for!= ""?<label htmlFor={attributesData?.id }>{attributesData.for }</label>:<label className="block text-gray-700 font-semibold">{value}</label>}   
                                    
                                </div>
                                </>
                              
                            );

                        case 'select':
                            return (
                                <div key={item._id} className="flex flex-col gap-2 w-1/2">
                                    <label htmlFor={attributesData?.id} className="block text-gray-700 font-semibold mb-2">
                                        {attributesData?.name}
                                    </label>
                                    <select
                                        name={attributesData?.name}
                                        id={attributesData?.id}
                                        value={formValues[attributesData?.name] || `${item?.value}`}
                                        onChange={handleChange}
                                        disabled={true}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            {attributesData.placeholder}
                                        </option>
                                        {options?.map((option, index) => (
                                            <option key={index} value={option?.value}>
                                                {option?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );

                        default:
                            return null;
                    }
                })}

                <button disabled={submitLoading} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                {submitLoading && submitLoading ==true ? (
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
                       
                        { isStatusLoading==true &&  activeButton === "reject"  ? (
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
