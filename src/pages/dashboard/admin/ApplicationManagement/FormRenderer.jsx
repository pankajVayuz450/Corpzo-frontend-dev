import TitleComponent from '@/components/common/TitleComponent';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { NavLink, useParams } from 'react-router-dom';
import { Input, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { setAttributeId, setCurrentStatus } from '@/redux/admin/slices/AppliationManagement/Index';
import { addCaseHistory, manageApplicationFormStatus, updateApplicationStatus } from '@/redux/admin/actions/ApplicationManagement';
import { FaSpinner } from 'react-icons/fa';
import HeaderTitle from '@/components/common/HeaderTitle';

const FormRenderer = ({ formData, caseId, amount, startDate, agentData }) => {
    const { attributeId, isStatusLoading, userId, applicationId, isFetching } = useSelector((state) => state.applications);
    const [formValues, setFormValues] = useState({});
    const [activeButton, setActiveButton] = useState({});
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [selectedAttributeId, setSelectedAttributeId] = useState(null);
    const [todayDate, setTodayDate] = useState('');
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
        console.log('Form Submitted:', {

            "applicationId": applicationId,
            "expectedCompletionDate": timestamp,
            "agentId": agentState
        });

        dispatch(updateApplicationStatus({

            "applicationId": applicationId,
            "expectedCompletionDate": formValues.completionDate,
            "agentId": agentState
        }));

    };


    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        setTodayDate(formattedDate);
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
            "action": `Application Status changed  ${rejectStatus} To rejected`,
            "performedBy": userId,
            "reason": rejectReason,
            "statusBefore": rejectStatus,
            "statusAfter": "rejected"
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
            //   "reason": "document ",
            "statusBefore": status,
            "statusAfter": value
        }));

    };


    const formattedAgentList = agentData?.map(agent => ({
        value: agent._id,
        label: agent.name
    }));

    return (
        <>
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
                                    console.log("Selected agent value:", selectedValue);
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
                                value={formValues.completionDate || ''}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                min={todayDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Map over form data */}
                {formData?.map((item) => {

                    const { element, attributesData, value, options, form_subinputs, status } = item;
                    console.log("check item data ", item)

                    switch (element) {
                        case 'input':
                            return (
                                <div key={item._id} className="flex flex-row gap-4 items-center ">
                                    <div className="flex-1">
                                        <label htmlFor={attributesData.id} className="block text-gray-700 font-semibold mb-2">
                                            {attributesData.placeholder}
                                        </label>
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
                                    </div>

                                    <div className="flex gap-2">
                                        {/* Accept Button */}
                                        <button
                                            className={`py-2 px-4 rounded ${status === "accept" ? "bg-green-600" : "bg-black"} hover:bg-green-600 text-white`}
                                            onClick={() => getAttributeId(item._id, "accept", status, item.value)}
                                        >
                                            {isStatusLoading && activeButton === "accept" && item._id === attributeId ? (
                                                <FaSpinner className="animate-spin text-white text-xl inline " />
                                            ) : "Accept"}
                                        </button>

                                        {/* Hold Button */}
                                        <button
                                            className={`py-2 px-4 rounded ${status === "hold" ? "bg-yellow-600" : "bg-black"} hover:bg-yellow-600 text-white`}
                                            onClick={() => getAttributeId(item._id, "hold", status, item.value)}
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
                                            }}
                                        >
                                            Reject with Reason
                                        </button>

                                        {/* Note Button */}
                                        <NavLink to={"/dashboard/admin/field-history"} onClick={() => dispatch(setAttributeId(item._id))} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                            Note
                                        </NavLink>
                                    </div>
                                </div>
                            );

                        case 'label':
                            return (
                                <div key={item._id} className="flex flex-col gap-2 w-1/4">
                                    <label className="block text-gray-700 font-semibold">{value}</label>
                                </div>
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

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Submit
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
                        Reject
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
