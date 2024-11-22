import React, { useEffect } from 'react'
import {
    Input,
    Spinner,
    Switch,
    Textarea,
    Typography
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import { addDepartment, editDepartment, getSingleDepartment } from '@/redux/admin/actions/MasterSettings/Department';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import TitleComponent from '@/components/common/TitleComponent';

import { handleExtraSpaces, validateNumber } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
import * as Yup from 'yup';
import { getSingleServiceCharge, updateServiceCharges } from '@/redux/admin/actions/Services';
const initialValues = {
    dscPrice: "",
    runPanTan: "",
    state: "",
    stateFilingFee: ""
}



export const validationSchema = Yup.object().shape({
  dscPrice: Yup.number()
   
    .required('DSC Price is required')
    .max(50000, 'DSC Price cannot exceed 50,000')
    .min(0, 'DSC Price cannot be negative'),
  runPanTan: Yup.number()
    
    .required('RUN + PAN/TAN Price is required')
    .max(50000, 'RUN + PAN/TAN Price cannot exceed 50,000')
    .min(0, 'RUN + PAN/TAN Price cannot be negative'),
  stateFilingFee: Yup.number()
  
    .required('State Filing Fee is required')
    .max(50000, 'State Filing Fee cannot exceed 50,000')
    .min(0, 'State Filing Fee cannot be negative'),
  
});

const UpdateChargesForm = () => {

    const {serviceId, id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { singleServiceLoading, singleServiceCharges,isAdding,editChargesPageNumber } = useSelector((state) => state.service)
   
    

    const {
        values,
        errors,
        handleBlur,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        setTouched,
        isValid,
        setErrors,
        dirty,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        onSubmit: async (values, action) => {

            console.log("Called", values)
            dispatch(updateServiceCharges(id,serviceId, values,1, navigate))
            setErrors({});
        },
    });
    useEffect(() => {
        if (id !== undefined) {
            dispatch(getSingleServiceCharge(id))
        }
    }, [])
    useEffect(() => {
        console.log(singleServiceCharges, "singleServiceCharges")
        if (id !== undefined && singleServiceCharges) {
            setFieldValue("dscPrice", singleServiceCharges.dscPrice || "")
            setFieldValue("runPanTan", singleServiceCharges.runPanTan || "")
            setFieldValue("stateFilingFee", singleServiceCharges.stateFilingFee || "")
            setFieldValue("state", singleServiceCharges.state || "")
        } else {
            setFieldValue("dscPrice", "")
            setFieldValue("runPanTan", "")
            setFieldValue("stateFilingFee", "")
        }
        setErrors({});

    }, [setFieldValue, singleServiceCharges])
    const breadcrumbData = [
        {

            name: 'Service Management',
            children: [
                {
                    name: 'Service Charges',
                    url: `/dashboard/admin/services/view-service-charges/${id}`,
                    children: [
                        {
                            name: id ? 'Update Charges' : 'Create Charges',
                        },
                    ],
                },
            ],
        }
    ];

    return (
        <div className=''>
            <Breadcrumb items={breadcrumbData} />
            <TitleComponent title={id ? "CORPZO | Update Charges" : "CORPZO | Create Charges"} />
            <HeaderTitle title={id ? "Update Charges" : "Create Charges"} />
            {
                id !== undefined && singleServiceLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <TailSpin height={50} width={50} color="blue" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-[50%] flex flex-col gap-2 mt-2">
                        <Typography variant="small" color="blue-gray" className=" font-medium">
                            State
                        </Typography>
                        <Input
                            size="sm"
                            //   placeholder="Enter Department"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={singleServiceCharges.state}


                            disabled={true}
                        />

                        <Typography variant="small" color="blue-gray" className=" font-medium">
                            DSC Price
                        </Typography>
                        <Input
                            size="sm"
                            placeholder="Enter DSC Price"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={values.dscPrice}
                            onFocus={() => touched.dscPrice = true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='dscPrice'
                           
                            onKeyDown={validateNumber}
                        />
                        {errors.dscPrice && touched.dscPrice && <p className='text-sm text-red-500'>{errors.dscPrice}</p>}
                        <Typography variant="small" color="blue-gray" className=" font-medium">
                            RUN + PAN/TAN Price
                        </Typography>
                        <Input
                            size="sm"
                            placeholder="Enter RUN + PAN/TAN Price"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={values.runPanTan}
                            onFocus={() => touched.runPanTan = true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='runPanTan'
                           
                            onKeyDown={validateNumber}
                        />
                        {errors.runPanTan && touched.runPanTan && <p className='text-sm text-red-500'>{errors.runPanTan}</p>}
                        <Typography variant="small" color="blue-gray" className=" font-medium">
                            State Filling Fee
                        </Typography>
                        <Input
                            size="sm"
                            placeholder="Enter State Filling Fee"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={values.stateFilingFee}
                            onFocus={() => touched.stateFilingFee = true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='stateFilingFee'
                    
                            onKeyDown={validateNumber}
                        />
                        {errors.stateFilingFee && touched.stateFilingFee && <p className='text-sm text-red-500'>{errors.stateFilingFee}</p>}

                        <button
                            // disabled={isAdding || !(dirty && isValid)}
                            disabled={isAdding || !isValid}

                            type='submit'
                            className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !isValid ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding ||!isValid ? 'gray-400' : 'blue-500'}`}
                        >
                            {isAdding ?
                                <div className='flex justify-center items-center gap-3'>
                                    <Spinner color='white' className="h-4 w-4" />
                                    {id ? "Updating Charges" : "Adding Charges"}
                                </div>
                                : id ? "Update Charges" : "Add Charges"}
                        </button>
                    </form>
                )
            }
        </div>
    )
}

export default UpdateChargesForm