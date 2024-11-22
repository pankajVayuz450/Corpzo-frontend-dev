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
import { validationSchema } from './ValidationSchema';
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
const initialValues = {
  name: "",
  description: "",
  active:true
}

const AddDepartment = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector((state) => state.department.department);
  const isFetching = useSelector((state) => state.department.isFetching)
  const isAdding = useSelector((state) => state.department.isAdding);
  const editPage = useSelector((state)=> state.department.editPage);

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
    initialValues: data ? data : initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      
      const departmentData = {
        name : handleExtraSpaces(values.name), 
        description : values.description, 
        active : id ? data?.active : true
      }
      setTouched({}, false);
      if (id !== undefined) {
        
        dispatch(editDepartment(id, departmentData, navigate, editPage));
      } else {
        dispatch(addDepartment(departmentData, navigate));
      }
      setErrors({});
    },
  });
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleDepartment(id))
    }
  }, [])
  useEffect(() => {
    console.log(data)
    if (id !== undefined && data) {
      setFieldValue("name", data.name || "")
      setFieldValue("description", data.description || "")
      // setFieldValue('active', data.active || true)
      setTouched({
        name: false,
        description: false, // Reset the description field from being marked as touched
      });
    } else {
      setFieldValue("name", "")
      setFieldValue("description", "")
    }
    setErrors({});


  }, [data, setFieldValue])
  const breadcrumbData = [
    {
      
        
          name: 'Master Settings',
          children: [
            {
              name: 'Department',
              url: '/dashboard/admin/masterSettings/Department',
              children: [
                {
                  name: id ? 'Update Department' : 'Create Department',
                  url: id
                    ? ''
                    : '/dashboard/admin/masterSettings/Department/add-department',
                },
              ],
            },
          ],
    }
  ];

  return (
    <div className=''>
      <Breadcrumb items={breadcrumbData}/>
      <TitleComponent title={id ? "CORPZO | Update Department" : "CORPZO | Create Department"} />
      <HeaderTitle title={id ? "Update Department" : "Create Department"} path={"/dashboard/admin/masterSettings/Department"}/>
      {
        id !== undefined && isFetching ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-[50%] flex flex-col gap-4 mt-4">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Department
            </Typography>
            <Input
              size="sm"
              placeholder="Enter Department"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={values.name}
              onFocus={() => touched.name = true}
              onChange={handleChange}
              onBlur={handleBlur}
              name='name'
              maxLength={100}
            />
            {errors.name && touched.name && <p className='text-sm text-red-500'>{errors.name}</p>}
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Description
            </Typography>
            <Textarea
              size="sm"
              placeholder="Enter Description"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={values.description}
              onChange={handleChange}
              onFocus={() => touched.description = true}
              onBlur={handleBlur}
              name='description'

            />
            {errors.description && touched.description && <p className='text-sm text-red-500'>{errors.description}</p>}

            <button
              // disabled={isAdding || !(dirty && isValid)}
              disabled={isAdding || !isValid}

             type='submit'
              className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !isValid ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !isValid  ? 'gray-400' : 'blue-500'}`}
            >
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {id ? "Updating Department" : "Adding Department"}
                </div>
                : id ? "Update Department" : "Add Department"}
            </button>
          </form>
        )
      }
    </div>
  )
}

export default AddDepartment