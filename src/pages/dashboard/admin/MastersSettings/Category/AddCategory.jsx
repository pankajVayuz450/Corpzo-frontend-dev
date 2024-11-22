import React, { useEffect } from 'react'
import {
  Input,
  Switch,
  Typography
} from "@material-tailwind/react";

const initialValues = {
  categoryName: "",
  createdBy: "6f8e254d-0d1d-4f36-8d8c-52c61c4aeb4b",
  active: true
}
import { useFormik } from "formik";
import { addCatgeory, getSingleCategory, editCategory } from '@/redux/admin/actions/MasterSettings/Category';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { validationSchema } from './ValidationSchema';
import { useNavigate } from 'react-router-dom';
import TitleComponent from '@/components/common/TitleComponent';
import { TailSpin } from 'react-loader-spinner';
import { Spinner } from "@material-tailwind/react";
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
const AddCategory = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useSelector((state) => state.category.category);
  const isAdding = useSelector((state) => state.category.isAdding);
  const isFetching = useSelector((state) => state.category.isFetching)
  const editPage = useSelector((state) => state.category.editPage);

  const navigate = useNavigate()
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
    setFieldTouched,
    setFieldError,
    dirty,
  } = useFormik({
    initialValues: data ? data : initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    isInitialValid: id ? true : false,
    onSubmit: async (values, action) => {

      const categoryData = {
        categoryName: handleExtraSpaces(values.categoryName),
        createdBy: "6f8e254d-0d1d-4f36-8d8c-52c61c4aeb4b",
        active: id ? data?.active : true
      }
      const newCatgeoryData = {
        ...initialValues, categoryName: handleExtraSpaces(values.categoryName),
        createdBy: "6f8e254d-0d1d-4f36-8d8c-52c61c4aeb4b",
      }
      console.log(categoryData, "category data after removing spaces");
      if (id !== undefined) {
        dispatch(editCategory(id, categoryData, navigate, editPage));
      } else {
        dispatch(addCatgeory(categoryData, navigate));
        setFieldError({
          categoryName: false
        })
      }
      setErrors({});
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleCategory(id));
    }
  }, [])
  useEffect(() => {
    if (id !== undefined && data) {

      setFieldValue("categoryName", data.categoryName || "")
      // setFieldValue("active", data.active || true)

      setTouched({
        categoryName: true,
      });
      setFieldTouched("categoryName", false);

    } else {
      setFieldValue("categoryName", "")
    }

  }, [data, setFieldValue])

  const breadcrumbData = [
    {


      name: 'Master Settings',
      children: [
        {
          name: 'Category',
          url: '/dashboard/admin/masterSettings/Category',
          children: [
            {
              name: id ? 'Update category' : 'Create category',
              url: id
                ? ''
                : '/dashboard/admin/masterSettings/Category/add-category',
            },
          ],
        },
      ],
    }
  ];
  return (
    <div>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={id ? "CORPZO | Edit Category" : "CORPZO | Add Category"} />
      <HeaderTitle title={id ? "Update Category" : "Create Category"} path={"/dashboard/admin/masterSettings/Category"}/>
      {
        id && isFetching ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-[50%] flex flex-col gap-4 mt-4">
            <Typography variant="small" color="blue-gray" className="mb-3 font-medium">
              Category
            </Typography>
            <Input
              size="sm"
              placeholder={id ? "Edit Category" : "Add Category"}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name='categoryName'
              value={values.categoryName}
              onFocus={() => touched.categoryName = true}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={30}
              // autoFocus={true}
            />
            {errors.categoryName && touched.categoryName && <p className='text-sm text-red-500'>{errors.categoryName}</p>}
            {/* <button  disabled={!(dirty && isValid)} onClick={handleSubmit} className="bg-blue-500 text-white w-full mt-4 font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{isAdding ? <div className='flex justify-center items-center gap-3'><Spinner color='white' className="h-4 w-4"/>{id ? "Editing" : "Adding"}</div> : id ? "Edit" : "Add"}</button> */}
            <button
              type='submit'
              // disabled={isAdding || !(dirty && isValid)}
              // className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
              disabled={isAdding || !isValid }
              className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !isValid 
                  ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white'
                  : 'bg-blue-500 hover:bg-blue-700 text-white'
                }`}
            >
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {id ? "Updating Category" : "Adding Category"}
                </div>
                : id ? "Update Category" : "Add Category"}
            </button>

          </form>
        )
      }
    </div>
  )
}

export default AddCategory