import React, { useEffect, useState } from 'react';
import {
  Input,
  Typography,
  Spinner
} from "@material-tailwind/react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '@/redux/admin/actions/MasterSettings/Category';
import { useFormik } from 'formik';
import { addSubCategory, editSubCategory, getAllActiveCategories, getSingleSubCategory } from '@/redux/admin/actions/MasterSettings/subCategory';
import { useNavigate, useParams } from 'react-router-dom';
import { validationSchema } from './validationSchema';
import TitleComponent from '@/components/common/TitleComponent';
import { TailSpin } from 'react-loader-spinner';
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
const initialValues = {
  subSectionTitle: "",
  sectionId: "",
  sectionTitle: "",
  active: true,
  createdBy: "6f8e254d-0d1d-4f36-8d8c-52c61c4aeb4b"
}

const AddSubCategory = () => {
  const data = useSelector((state) => state.category.categoryList);
  const subCategory = useSelector((state) => state.subCategory.subCategory)
  const isFetching = useSelector((state) => state.category.isFetching)
  const isAdding = useSelector((state) => state.subCategory.isAdding)
  const activeCategories = useSelector((state) => state.subCategory.activeCategories)
  const editPage = useSelector((state) => state.subCategory.editPage);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const {
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    touched,
    errors,
    dirty,
    isValid,
    handleBlur,
    setErrors
  } = useFormik({
    initialValues: id ? subCategory : initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const data = {
        subSectionTitle: handleExtraSpaces(values.subSectionTitle),
        sectionId: values.sectionId,
        sectionTitle: handleExtraSpaces(values.sectionTitle),
        createdBy: "6f8e254d-0d1d-4f36-8d8c-52c61c4aeb4b"
      }
      const newData = {
        ...initialValues,
        subSectionTitle: handleExtraSpaces(values.subSectionTitle),
        sectionId: values.sectionId,
        sectionTitle: handleExtraSpaces(values.sectionTitle),
        createdBy: "6f8e254d-0d1d-4f36-8d8c-52c61c4aeb4b",
        active: id ? subCategory?.active : true
      }
      if (id !== undefined) {
        dispatch(editSubCategory(id, newData, navigate, editPage))
      } else {
        dispatch(addSubCategory(newData, navigate))
      }
      setErrors({});
    },
  });

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    console.log(value, typeof (value), "value is available");
    const selectedCategory = data?.find(category => category.categoryId === value);
    console.log(selectedCategory, "selected cat ")
    if (selectedCategory) {
      setFieldValue('sectionId', selectedCategory.categoryId);
      setFieldValue('sectionTitle', selectedCategory.categoryName);
    } else {
      console.error("Selected category not found in data.");
    }
  };


  useEffect(() => {
    if (id !== undefined && subCategory) {
      console.log(subCategory, "subcategory")
      setFieldValue("subSectionTitle", subCategory.subSectionTitle || "")
      setFieldValue("sectionTitle", subCategory.sectionTitle || "")
      // setFieldValue('active', subCategory.active || true)
      setFieldValue('sectionId', subCategory.sectionId || "");
    } else {
      setFieldValue("subSectionTitle", "")
      setFieldValue("sectionTitle", "")
    }

  }, [subCategory, setFieldValue])
  useEffect(() => {
    if (id) {
      dispatch(getSingleSubCategory(id));
    }
  }, [])

  useEffect(() => {
    activeCategories.length ===0 &&  dispatch(getAllActiveCategories(true))
  }, [])

  const breadcrumbData = [
    {
      name: 'Master Settings',
      children: [
        {
          name: 'Sub Category',
          url: '/dashboard/admin/masterSettings/Sub-Category',
          children: [
            {
              name: id ? 'Update Sub Category' : 'Create Sub Category',
              url: id
                ? ''
                : '/dashboard/admin/masterSettings/Sub-Category/add-sub-category',
            },
          ],
        },
      ],
    }
  ];
  return (
    <div>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={id ? "CORPZO | Edit Sub Category" : "CORPZO | Add Sub Category"}></TitleComponent>
      <HeaderTitle title={id ? " Update Sub Category" : "Add Sub Category"} path={"/dashboard/admin/masterSettings/Sub-Category"}/>
      {
        isFetching && id ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-[50%] flex flex-col gap-4 mt-4">
            <Typography variant="small" color="blue-gray" className=" font-medium">
              Select Category
            </Typography>
            <select
              className='px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500'
              name='sectionId'
              value={values.sectionId}
              onChange={handleCategoryChange}
              onBlur={handleBlur}
              onFocus={() => touched.sectionId = true}
            >
              <option value="" disabled>
                Select a Category
              </option>
              {
                !activeCategories && isFetching ? (
                  <h1><TailSpin /></h1>
                ) : (
                  activeCategories
                    .map(option => (
                      <option key={option.categoryId} value={option.categoryId}>
                        {option.categoryName}
                      </option>
                    ))
                )
              }
            </select>

            {errors.sectionTitle && touched.sectionTitle && <p className='text-sm text-red-500'>{errors.sectionTitle}</p>}
            <Typography variant="small" color="blue-gray" className=" font-medium">
              Sub Category Title
            </Typography>
            <Input
              size="sm"
              placeholder="Add Sub Category"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name='subSectionTitle'
              value={values.subSectionTitle}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => touched.subSectionTitle = true}
              maxLength={30}
            />
            {errors.subSectionTitle && touched.subSectionTitle && <p className='text-sm text-red-500'>{errors.subSectionTitle}</p>}

            <button
              disabled={isAdding || !isValid}
              type='submit'
              className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !isValid ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !isValid ? 'gray-400' : 'blue-500'}`}
            >
                    
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {id ? "Updating Sub Category" : "Adding Sub Category"}
                </div>
                : id ? "Update Sub Category" : "Add Sub Category"}
            </button>
          </form>
        )
      }
    </div>
  );
}

export default AddSubCategory;
