import React, { useEffect } from 'react'
import { Input, Typography } from '@material-tailwind/react'
import { Select as MaterialSelect, Option } from "@material-tailwind/react";
import TitleComponent from '@/components/common/TitleComponent';
import { NavLink, useParams } from 'react-router-dom';
import FormRenderer from './FormRenderer';
import { formData } from './dummyData';
import { useDispatch } from 'react-redux';
import { getApplicationForm } from '@/redux/admin/actions/ApplicationManagement';
export const colourOptions = [
    { value: 'ocean', label: 'Investors', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'SMEs', color: '#0052CC', isDisabled: false },
];

const active = true;
const CreateApplication = () => {
    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
      
    dispatch(getApplicationForm("6710a83f8251f00eaa31c4a9","66da879e8ea314c944ea2db4","6703c28b803ef514e97a19ee"))
    
    }, [])
    

    return (
        <div className='w-100'>
            <TitleComponent title={id ? `CORPZO | Edit Application` : `CORPZO | Add Application `}></TitleComponent>

            <h1 className="text-xl md:text-3xl font-semibold mb-4">{id ? "Edit Application" : "Add Application"}</h1>
            <div className='w-100 flex flex-row justify-between items-center mb-4'>
                <div className='w-1/4'>
                    <MaterialSelect label="Select Agent" className=''>
                        <Option>Agent 1</Option>
                        <Option>Agent 2</Option>
                        <Option>Agent 3</Option>
                    </MaterialSelect>
                </div>

                <div className='w-1/2 flex gap-4 justify-center items-center'>
                    <NavLink to={"/dashboard/admin/team-note/create-note"} className="bg-blue-500 text-center text-white w-full mt-4 font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Team Note
                    </NavLink>
                    <NavLink to={"/dashboard/admin/team-history"} className="bg-blue-500 text-white w-full mt-4 font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Case History
                    </NavLink>
                </div>
            </div>
            <form action="" className='flex flex-col gap-2 w-1/2'>
                <div  className='flex gap-2 items-center justify-evenly'>
                    <div> 
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Case Id
                        </Typography>
                        <div className='flex gap-2 items-center '>

                            <Input
                                size="sm"
                                type='text'
                                placeholder="Enter Offer title"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                    </div>
                    <div> 
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Start Date
                        </Typography>
                        <div className='flex gap-2 items-center '>

                            <Input
                                size="sm"
                                type='date'
                                placeholder="Enter Offer title"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                    </div>
                    <div> 
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Amount
                        </Typography>
                        <div className='flex gap-2 items-center '>

                            <Input
                                size="sm"
                                type='text'
                                placeholder="Enter Offer title"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                    </div>
                    <div> 
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Expected date of completion
                        </Typography>
                        <div className='flex gap-2 items-center '>

                            <Input
                                size="sm"
                                type='date'
                                placeholder="Enter Offer title"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>

                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Business name
                    </Typography>
                    <div className='flex gap-2 items-center '>

                        <Input
                            size="sm"
                            type='text'
                            placeholder="Enter Offer title"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {active ? "Accepted" : 'Accepted'}
                        </span>
                    </div>
                </div>
                <div>

                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Legal Business Name
                    </Typography>
                    <div className='flex gap-2 items-center '>

                        <Input
                            size="sm"
                            type='text'
                            placeholder="Enter Offer title"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {active ? "Accepted" : 'Accepted'}
                        </span>
                    </div>
                </div>
                <div>

                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Business Type/Structre
                    </Typography>
                    <div className='flex gap-2 items-center '>

                        <Input
                            size="sm"
                            type='text'
                            placeholder="Enter Offer title"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {'Accepted'}
                        </span>
                    </div>
                </div>
                <div>

                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Business industry
                    </Typography>
                    <div className='flex gap-2 items-center '>

                        <Input
                            size="sm"
                            type='text'
                            placeholder="Enter Offer title"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {active ? "Accepted" : 'Accepted'}
                        </span>
                    </div>
                </div>
                <div>

                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Business Description
                    </Typography>
                    <div className='flex gap-2 items-center '>

                        <Input
                            size="sm"
                            type='text'
                            placeholder="Enter Offer title"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {active ? "Accepted" : 'Accepted'}
                        </span>
                    </div>
                </div>
                <div>

                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Business Registration Number
                    </Typography>
                    <div className='flex gap-2 items-center '>

                        <Input
                            size="sm"
                            type='text'
                            placeholder="Enter Offer title"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {active ? "Accepted" : 'Accepted'}
                        </span>
                    </div>
                </div>
                <div>

                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Date of business formation
                    </Typography>
                    <div className='flex gap-2 items-center '>

                        <Input
                            size="sm"
                            type='text'
                            placeholder="Enter Offer title"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {active ? "Accepted" : 'Accepted'}
                        </span>
                    </div>
                </div>
                <button type='submit' className="bg-blue-500 text-white w-full mt-4 font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{id ? "Edit" : "Add"}</button>
            </form>

            <FormRenderer formData={formData} />

        </div>
    )
}

export default CreateApplication