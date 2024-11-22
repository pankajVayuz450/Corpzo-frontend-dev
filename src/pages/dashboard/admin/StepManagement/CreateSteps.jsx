import React, { useEffect } from 'react'
import {
  Input,
  Spinner,
  Switch,
  Typography
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import { addDepartment, editDepartment, getSingleDepartment } from '@/redux/admin/actions/MasterSettings/Department';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import TitleComponent from '@/components/common/TitleComponent';
import { validationSchema } from './validationSchema';
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import { addSteps, editStep, getAllSteps, getSingleStep, } from '@/redux/admin/actions/Steps';
import HeaderTitle from '@/components/common/HeaderTitle';
import Breadcrumb from '@/widgets/layout/TopNavigation';
const initialValues = {
  serviceId: "",
  details: "",
  active : true, 
}

const CreateSteps = () => {

  const { id,serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector((state) => state.steps.step);
  const isFetching = useSelector((state) => state.steps.isFetching)
  const isAdding = useSelector((state) => state.steps.isAdding);

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
    onSubmit: async (values, action) => {
      setTouched({}, false);
      const data = {
        serviceId: serviceId,
        details: handleExtraSpaces(values.details)
      }
      if (id !== undefined) {

        dispatch(editStep(id, data, serviceId,navigate));
      } else {
        dispatch(addSteps(data,serviceId, navigate));
      }
      setErrors({});
    },
  });
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getAllSteps(undefined, id))
    }
  }, [])
  useEffect(() => {
    console.log(data)
    if (id !== undefined && data) {
      setFieldValue("details", data.details || "")
    } else {
      setFieldValue("details", "")
    }
    setErrors({})


  }, [data, setFieldValue])
  const breadcrumbData = [
    {

      name: 'Step Management',
      url: `dashboard/admin/steps/${serviceId}`,
      children: [
        {
          name: id ? 'Update Step' : 'Create Step',
          url: id
            ? ''
            : '/dashboard/admin/services/create-service',
        },
      ],
    }
  ];
  
  return (
    <>
    
      <TitleComponent title={id ?"CORPZO | Update Step" :  "CORPZO | Create Step"} />
      <HeaderTitle title={id ?" Update Step" :  "Create Step"}/>
      <Breadcrumb items={breadcrumbData}/>
    <div className='relative'>

      {
        id !== undefined && isFetching ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-[50%] flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Step Title
            </Typography>
            <Input
              size="sm"
              placeholder="Add Step"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={values.details}
              onFocus={() => touched.name = true}
              onChange={handleChange}
              onBlur={handleBlur}
              name='details'
              maxLength={30}
            />
            {errors.details && touched.details && <p className='text-sm text-red-500'>{errors.details}</p>}

            <button
              disabled={isAdding || !(dirty && isValid)}
              onClick={handleSubmit}
              className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
            >
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {id ? "Updating Step" : "Adding Step"}
                </div>
                : id ? "Update Step" : "Add Step"}
            </button>
          </form>
        )
      }
    </div>
    </>
  )
}

export default CreateSteps