import React, { useEffect, useState } from 'react'
import {
  Input,
  Spinner,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Textarea,
} from '@material-tailwind/react'
import Select from 'react-select';
import { Checkbox } from "@material-tailwind/react";
import { Radio } from "@material-tailwind/react"
import TitleComponent from '@/components/common/TitleComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { setDateMin } from '@/Helpers/globalfunctions';
import { validationSchema } from './ValidationSchema';
import { addsService, editService, getAllActiveCategories, getAllActiveSubCategories, getAllForms, getAllServices, uploadVideo } from '@/redux/admin/actions/Services';
import { TailSpin } from 'react-loader-spinner';
import { validateNumber, handleExtraSpaces } from '@/Helpers/globalfunctions';
import { updateVideoUrl } from '@/redux/admin/slices/Service';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import { VideoModal } from '@/components/common/VideoModal';
import StepperWithContent from './StepForm';
import HeaderTitle from '@/components/common/HeaderTitle';

const initialValues = {
  name: "",
  details: "",
  subCategoryId: "",
  categoryId: "",
  isOneTime: false,
  cost: 0,
  formId: "",
  duration: 0,
  delivrableVideoUrl: "",
  stepsVideoUrl: "",
  documentVideoUrl: "",
  about: "",
}
const ServiceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [deliverableVideoPreview, setDeliverableVideoPreview] = useState(null);
  const [stepsVideoPreview, setStepsVideoPreview] = useState(null);
  const [documentVideoPreview, setDocumentVideoPreview] = useState(null);
  const [errorState, setErrorState] = useState(false)
  const [errorMessage, setErrorMessaage] = useState("")
  const [fileToUpload, setFileToUpload] = useState(null)
  const { service, delivrableVideoUrl, uploadVideoLoading, stepsVideoUrl, documentVideoUrl, isAdding, editPage, activeCategories, isFetching, activeSubCategories, forms, buttonContent, updateHeader } = useSelector((state) => state.service)
  const [isOneTime, setIsOneTime] = useState(false);
  const [videoModal, setVideoModal] = useState({ open: false, type: '', fieldName: '' });
  const [modalType, setModalType] = useState(null);
  const [clickedButtons, setClickedButtons] = useState({
    deliverable: false,
    step: false,
    document: false,
  });
  const handleClose = () => {
    setOpen((prevState) => !prevState)
  }
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
    setFieldTouched,
    setFieldError
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setTouched({}, false);
      // if (isOneTime) {
      //   setFieldValue('cost', 0);
      // }
      const data = {
        name: handleExtraSpaces(values.name),
        details: handleExtraSpaces(values.details),
        subCategoryId: values.subCategoryId,
        categoryId: values.categoryId,
        isOneTime: isOneTime,
        cost: values.cost || 0,
        formId: values.formId,
        duration: values.duration,
        delivrableVideoUrl: delivrableVideoUrl,
        stepsVideoUrl: stepsVideoUrl,
        documentVideoUrl: documentVideoUrl,
        about: handleExtraSpaces(values.about),
      }
      console.log(data, "form data ")
      if (id !== undefined) {
        dispatch(editService({ ...data, serviceId: id, delivrableVideoUrl: delivrableVideoUrl || (service?.delivrableVideoUrl || ""), stepsVideoUrl: stepsVideoUrl || (service?.stepsVideoUrl || ""), documentVideoUrl: documentVideoUrl || (service?.documentVideoUrl || ""), }, navigate, editPage))
      } else {
        dispatch(addsService(data, navigate));
      }
      setErrors({});
    },
  });
  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };
  const handleButtonClick = (type) => {
    setClickedButtons((prev) => ({
      ...prev,
      [type]: true,
    }));
    handleOpen(type); // Using your existing handleOpen function
  };

  const formattedFormsList = forms?.map(form => ({
    value: form._id,
    label: form.title
  }));
  useEffect(() => {
    dispatch(getAllActiveCategories(true))
    dispatch(getAllForms())
  }, [])

  useEffect(() => {
    if (id !== undefined && service) {
      setFieldValue("name", service.name || "");
      setFieldValue("details", service.details || "");
      setFieldValue("isOneTime", service.isOneTime || false);
      setFieldValue("cost", service.cost || "");
      setFieldValue("formId", service.formId || "");
      setFieldValue("duration", service.duration || "");

      dispatch(updateVideoUrl({
        fieldName: "delivrableVideoUrl",
        url: service.delivrableVideoUrl
      }))
      dispatch(updateVideoUrl({
        fieldName: "documentVideoUrl",
        url: service.documentVideoUrl
      }))
      dispatch(updateVideoUrl({
        fieldName: "stepsVideoUrl",
        url: service.stepsVideoUrl
      }))
      setFieldValue("delivrableVideoUrl", service.delivrableVideoUrl || "");
      setFieldValue("documentVideoUrl", service.documentVideoUrl || "");
      setFieldValue("stepsVideoUrl", service.stepsVideoUrl || "");

      if (service.category && service.category.length > 0) {
        console.log(service.category, "service.category")
        setFieldValue("categoryId", service.category[0]._id || "");
        dispatch(getAllActiveSubCategories(service.category[0].categoryId));
      }

      if (service.sub_category && service.sub_category.length > 0) {
        console.log(service.sub_category, "service.sub_category")
        setFieldValue("subCategoryId", service.sub_category[0]._id || "");
      }

      setFieldValue("about", service.about || "");
      setFieldValue("isOneTime", service.isOneTime);
      setIsOneTime(service.isOneTime)

      setErrors({});
    } else {
      setFieldValue("name", "");
      setFieldValue("details", "");
      setFieldValue("isOneTime", false);
      setFieldValue("cost", "");
      setFieldValue("formId", "");
      setFieldValue("duration", "");
      setFieldValue("delivrableVideoUrl", "");
      setFieldValue("documentVideoUrl", "");
      setFieldValue("stepsVideoUrl", "");
      dispatch(updateVideoUrl({
        fieldName: "deliverable",
        url: ""
      }))
      dispatch(updateVideoUrl({
        fieldName: "document",
        url: ""
      }))
      dispatch(updateVideoUrl({
        fieldName: "step",
        url: ""
      }))
      setFieldValue("about", "");
      setFieldValue("categoryId", "");
      setFieldValue("subCategoryId", "");
      setFieldValue("about", "");
      setFieldValue("isOneTime", false);
    }

    setErrors({}); // Clear errors when updating form fields
  }, [id, service, setFieldValue, dispatch]);


  useEffect(() => {
    if (id) {
      dispatch(getAllServices(1, 1, "", id))
      console.log(service, "service data")
    }

  }, [id])

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    console.log(value, "category value")
    setFieldValue('categoryId', value);
    console.log(activeCategories, "active categoryy")
    const selectedCategory = activeCategories.find(category => category._id === value);
    console.log(selectedCategory, "sekected catuerjbfi")
    dispatch(getAllActiveSubCategories(selectedCategory.categoryId))
  };

  useEffect(() => {
    if (!uploadVideoLoading) {
      if (modalType === 'delivrable' && delivrableVideoUrl) {
        console.log(modalType, "Deliverable video URL after upload");
        setFieldValue('delivrableVideoUrl', delivrableVideoUrl, true);
      } else if (modalType === 'steps' && stepsVideoUrl) {
        console.log(stepsVideoUrl, "Steps video URL after upload");
        setFieldValue('stepsVideoUrl', stepsVideoUrl, true);
      } else if (modalType === 'document' && documentVideoUrl) {
        console.log(documentVideoUrl, "Document video URL after upload");
        setFieldValue('documentVideoUrl', documentVideoUrl, true);
      }
    }
  }, [uploadVideoLoading, delivrableVideoUrl, stepsVideoUrl, documentVideoUrl]);
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsOneTime(isChecked);
    if (isChecked) {
      setFieldValue('cost', null);
    }
  };

  const handleUpload = (file, type) => {
    const formData = new FormData();
    formData.append('files', file); // Pass file to FormData
    console.log(type, "video modal.fieldname")
    dispatch(uploadVideo(formData, type));
    
  };
  // useEffect(() => {
  //   if (!uploadVideoLoading) {
  //     setModalType(modalType);
  //     setOpen(false); // Close modal when loading is false
  //   }
  // }, [uploadVideoLoading]);
  const handleSelectChange = (selectedOption) => {
    setFieldValue('formId', selectedOption ? selectedOption.value : '');
  };
  const breadcrumbData = [
    {

      name: 'Service Management',
      url: '/dashboard/admin/service',
      children: [
        {
          name: id ? 'Update Service' : 'Create Service',
          url: id
            ? ''
            : '/dashboard/admin/services/create-service',
        },
      ],
    }
  ];
  useEffect(()=>{
    setErrors({})
    setTouched({}, false);
  }, [])

  return (
    <div className=''>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={id ? `CORPZO | Update Service` : `CORPZO | Create Service`}></TitleComponent>
      <HeaderTitle title={id ? "Update service" : "Create Service"}/>
      {
        id !== undefined && isFetching ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className=''>
            <div className='flex flex-row gap-2'>
              <div className="flex flex-col w-1/2 gap-4 mb-1">
                <div className='flex-grow'>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Service Title
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Enter Service title"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={50}
                  />
                  {errors.name && touched.name && <p className='text-sm text-red-500'>{errors.name}</p>}
                </div>

                <div className='flex-grow'>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Select Sub Category
                  </Typography>
                  <select
                    className='w-full px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500'
                    name='subCategoryId'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => touched.sectionId = true}
                    value={values.subCategoryId}
                  >
                    <option value="" disabled>
                      Select Sub Category
                    </option>
                    {
                      !activeCategories && isFetching ? (
                        <h1><TailSpin /></h1>
                      ) : (
                        activeSubCategories
                          .map(option => (
                            <option key={option._id} value={option._id}>
                              {option.subSectionTitle}
                            </option>
                          ))
                      )
                    }
                  </select>
                  {errors.subCategoryId && touched.subCategoryId && <p className='text-sm text-red-500'>{errors.subCategoryId}</p>}
                </div>
                <div className="flex gap-4 ">
                  <div className='flex-grow flex flex-col' >
                    <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                      Form
                    </Typography>
                    <Select
                      name='formId'
                      options={formattedFormsList}
                      value={formattedFormsList.find(option => option.value === values.formId) || null}
                      onChange={handleSelectChange}
                      isClearable
                      placeholder="Select Form"
                      classNamePrefix="react-select"
                      onBlur={handleBlur}
                    />
                    {errors.formId && touched.formId && <p className='text-sm text-red-500'>{errors.formId}</p>}
                  </div>

                </div>
                <div className='flex-grow'>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Service Detail
                  </Typography>
                  <Textarea
                    size="sm"
                    placeholder="Enter Service Detail"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name='details'
                    value={values.details}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   const value = e.target.value.trim();
                    //   if (/^[a-zA-Z0-9]*$/.test(value)) {
                    //     setFieldValue('details', value);
                    //     setFieldError('details', "invalid input")
                    //   }
                    // }}
                    onBlur={handleBlur}
                    type='text'
                    maxLength={100}
                  />
                  {errors.details && touched.details && <p className='text-sm text-red-500'>{errors.details}</p>}
                </div>


              </div>
              <div className="flex flex-col w-1/2 gap-4 mb-1">
                <div className='flex-grow'>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Select Category
                  </Typography>
                  <select
                    className='w-full px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500'
                    name='categoryId'
                    onChange={(e) => handleCategoryChange(e)}
                    onBlur={handleBlur}
                    onFocus={() => touched.categoryId = true}
                    value={values.categoryId}
                  >
                    <option value="" disabled>
                      Select a Category
                    </option>
                    {
                      !activeCategories && isFetching ? (
                        <h1><TailSpin /></h1>
                      ) : (
                        activeCategories?.map(option => (
                          <option key={option._id} value={option._id}>
                            {option.categoryName}
                          </option>
                        ))
                      )
                    }
                  </select>
                  {errors.categoryId && touched.categoryId && <p className='text-sm text-red-500'>{errors.categoryId}</p>}
                </div>

                <div className='flex-grow'>

                  <Typography variant="small" color="blue-gray" className="mb-1 mt-2 font-medium">
                    Duration
                  </Typography>
                  <select
                    className='px-3 w-full py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500'
                    name='duration'
                    value={values.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => touched.type = true}
                  >
                    <option value="" disabled>
                      Select Duration
                    </option>
                    <option value="1">
                      Monthly
                    </option>
                    <option value="3">
                      Quarterly
                    </option>
                    <option value="6">
                      Half-Yearly
                    </option>
                    <option value="12">
                      Yearly
                    </option>
                    <option value="24">
                      Two Years
                    </option>
                    <option value="60">
                      Five Years
                    </option>
                  </select>
                  {errors.duration && touched.duration && <p className='text-sm text-red-500'>{errors.duration}</p>}
                </div>
                {/* <div className='flex flex-row items-baseline'>
                      <div className=''>

                        <Typography variant="small" color="blue-gray" className=" font-medium">
                          Is One Time
                        </Typography>
                        <Checkbox
                          checked={isOneTime}
                          onChange={handleCheckboxChange}
                          className=""
                        />
                        {errors.documentVideoUrl && touched.documentVideoUrl && (
                          <p className='text-sm text-red-500 ml-2'>
                            {errors.documentVideoUrl}
                          </p>
                        )}
                      </div>
                      {isOneTime && (
                        <div className='flex items flex-grow'>
                          <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                            Cost
                          </Typography>
                          <Input
                            size="sm"
                            placeholder="Enter Cost"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full ml-2"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            onKeyDown={(e) => validateNumber(e)}
                            maxLength={5}
                            name='cost'
                            value={values.cost}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.cost && touched.cost && (
                            <p className='text-sm text-red-500 ml-2'>
                              {errors.cost}
                            </p>
                          )}
                        </div>
                      )}

                    </div> */}
                <div className='flex flex-row items-baseline'>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      Is One Time
                    </Typography>
                    <Checkbox
                      checked={isOneTime}
                      onChange={handleCheckboxChange}
                    />
                    {errors.documentVideoUrl && touched.documentVideoUrl && (
                      <p className='text-sm text-red-500 ml-2'>
                        {errors.documentVideoUrl}
                      </p>
                    )}
                  </div>

                  {isOneTime && (
                    <div className='flex flex-col flex-grow ml-4'>
                      <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                        Cost
                      </Typography>
                      <Input
                        size="sm"
                        placeholder="Enter Cost"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onKeyDown={(e) => validateNumber(e)}
                        maxLength={5}
                        name='cost'
                        value={values.cost}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.cost && touched.cost && (
                        <p className='text-sm text-red-500 ml-2'>
                          {errors.cost}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    About
                  </Typography>
                  <Textarea
                    size="sm"
                    placeholder="Enter About service"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name='about'
                    value={values.about}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={200}
                  />
                  {errors.about && touched.about && <p className='text-sm text-red-500'>{errors.about}</p>}
                </div>

              </div>
            </div>
            <div className='flex flex-col justify-between w-56 gap-2'>
              <Button onClick={handleClose}>Upload Service Videos</Button>
              {/* {(!delivrableVideoUrl && !stepsVideoUrl && !documentVideoUrl) && <p className='text-red-500'>Please upload service videos</p>} */}
            </div>
            <button
              type='submit'
              disabled={isAdding || !(dirty && isValid) || (!delivrableVideoUrl && !stepsVideoUrl && !documentVideoUrl)}
              className={`w-full mt-2 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) || (!delivrableVideoUrl && !stepsVideoUrl && !documentVideoUrl) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) || (!delivrableVideoUrl && !stepsVideoUrl && !documentVideoUrl) ? 'gray-400' : 'blue-500'}`}
            >
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {id ? "Updating Service" : "Adding Service"}
                </div>
                : id ? "Update Service" : "Add Service"}
            </button>
          </form>
        )
      }

      <StepperWithContent open={open} handleOpen={handleClose} handleConfirm={handleUpload}/>

    </div>
  )
}

export default ServiceForm