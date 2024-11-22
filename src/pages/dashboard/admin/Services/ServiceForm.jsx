import React, { useEffect, useState } from 'react'
import {
  Input,
  Spinner,
  Typography,
  Button,
  Textarea,
} from '@material-tailwind/react'
import Select from 'react-select';
import Papa from 'papaparse';  // Im
import { Checkbox } from "@material-tailwind/react";
import TitleComponent from '@/components/common/TitleComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { validationSchema } from './ValidationSchema';
import { addsService, editService, getAllActiveCategories, getAllActiveSubCategories, getAllForms, getAllServices, uploadCsv, uploadVideo } from '@/redux/admin/actions/Services';
import { TailSpin } from 'react-loader-spinner';
import { validateNumber, handleExtraSpaces } from '@/Helpers/globalfunctions';
import { updateVideoUrl } from '@/redux/admin/slices/Service';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import StepperWithContent from './StepForm';
import HeaderTitle from '@/components/common/HeaderTitle';
import ReusableModal from '@/components/common/ReusableModal';

const initialValues = {
  name: "",
  details: "",
  subCategoryId: "",
  categoryId: "",
  isOneTime: false,
  cost: 0,
  formId: "",
  duration: 0,
  deliverableVideoUrl: "",
  stepsVideoUrl: "",
  documentVideoUrl: "",
  about: "",
  active: true
}
const ServiceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [csvError, setCsvError] = useState(false)
  const [csvFile, setCsvFile] = useState(null)
  const [csv, setCsv] = useState(null)
  const { service, deliverableVideoUrl, uploadVideoLoading, stepsVideoUrl, documentVideoUrl, isAdding, editPage, activeCategories, isFetching, activeSubCategories, forms, buttonContent, updateHeader } = useSelector((state) => state.service)
  const [isOneTime, setIsOneTime] = useState(false);
  const openModal = () => {

    setIsModalOpen(true); // Open the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setCsvError("")
  };
  const handleClose = () => {
    setOpen((prevState) => !prevState)
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file is a CSV
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        const fileUrl = URL.createObjectURL(file);
        setCsv(file)
        setCsvFile(fileUrl); // Set the file URL or handle the CSV data accordingly
        setCsvError(""); // Clear any previous error message
      } else {
        setCsv(null)
        setCsvFile(null); // Clear the previous file URL if invalid
        setCsvError("Only .csv files are allowed."); // Set the error message
  
        // Clear the file input field by resetting the value
        event.target.value = "";  // This clears the file input
      }
    }
 // Call any parent handler or other logic
  };
  


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
      const data = {
        name: handleExtraSpaces(values.name),
        details: handleExtraSpaces(values.details),
        subCategoryId: values.subCategoryId,
        categoryId: values.categoryId,
        isOneTime: isOneTime,
        cost: values.cost || 0,
        formId: values.formId,
        duration: values.duration,
        deliverableVideoUrl: deliverableVideoUrl,
        stepsVideoUrl: stepsVideoUrl,
        documentVideoUrl: documentVideoUrl,
        about: handleExtraSpaces(values.about),
      }

      if (id !== undefined) {
        dispatch(editService({ ...data, serviceId: id, deliverableVideoUrl: deliverableVideoUrl || (service?.deliverableVideoUrl || ""), stepsVideoUrl: stepsVideoUrl || (service?.stepsVideoUrl || ""), documentVideoUrl: documentVideoUrl || (service?.documentVideoUrl || ""), }, navigate, editPage))
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

  const handleConfirm = () => {
    if (csv) {
      // Use PapaParse to parse the CSV file
      console.log(csv, 'csv file')
      Papa.parse(csv, {
        complete: (result) => {
          console.log('Parsed CSV Data:', result.data); 
          dispatch(uploadCsv({data : result.data, serviceId : "672b660ed23f4271d17f1182"}))// Log the parsed CSV data
        },
        header: true, // Assume the CSV has headers
      }); 
    } else {
      console.log('No valid CSV file selected');
    }
    setIsModalOpen(false) // Close the modal after confirming
  };

  useEffect(() => {
    activeCategories.length === 0 && dispatch(getAllActiveCategories(true))
    forms.length === 0 && dispatch(getAllForms())
  }, [])
  const formattedFormsList = forms?.map(form => ({
    value: form._id,
    label: form.title
  }));
  // const formattedFormsList = []
  useEffect(() => {
    if (id !== undefined && service) {
      setFieldValue("name", service.name || "");
      setFieldValue("details", service.details || "");
      setFieldValue("isOneTime", service.isOneTime || false);
      setFieldValue("cost", service.cost || "");
      setFieldValue("formId", service.formId || "");
      setFieldValue("duration", service.duration || "");

      dispatch(updateVideoUrl({
        fieldName: "deliverableVideoUrl",
        url: service.deliverableVideoUrl
      }))
      dispatch(updateVideoUrl({
        fieldName: "documentVideoUrl",
        url: service.documentVideoUrl
      }))
      dispatch(updateVideoUrl({
        fieldName: "stepsVideoUrl",
        url: service.stepsVideoUrl
      }))
      setFieldValue("deliverableVideoUrl", service.deliverableVideoUrl || "");
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
      setFieldValue("deliverableVideoUrl", "");
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
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

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

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsOneTime(isChecked);
    if (isChecked) {
      setFieldValue('cost', null);
    }
  };
  const handleServiceDetailChange = (e) => {
    const { value } = e.target;
    // Check for at least one alphabet character
    const containsAlphabet = /[a-zA-Z]/.test(value);

    // Only set the value if there’s at least one alphabet character
    if (containsAlphabet || value === "") {
      setFieldValue("details", value);
    }
  };
  const handleServiceAboutChange = (e) => {
    const { value } = e.target;
    // Check for at least one alphabet character
    const containsAlphabet = /[a-zA-Z]/.test(value);

    // Only set the value if there’s at least one alphabet character
    if (containsAlphabet || value === "") {
      setFieldValue("about", value);
    }
  };
  const handleUpload = (file, type) => {
    const formData = new FormData();
    formData.append('files', file); // Pass file to FormData
    console.log(type, "video modal.fieldname")
    dispatch(uploadVideo(formData, type));

  };

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
  useEffect(() => {
    setErrors({})
    setTouched({}, false);
  }, [])

  return (
    <div className=''>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={id ? `CORPZO | Update Service` : `CORPZO | Create Service`}></TitleComponent>
      <HeaderTitle title={id ? "Update service" : "Create Service"} />
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
                    onChange={handleServiceDetailChange}
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
                    onChange={handleServiceAboutChange}
                    onBlur={handleBlur}
                    maxLength={200}
                  />
                  {errors.about && touched.about && <p className='text-sm text-red-500'>{errors.about}</p>}
                </div>

              </div>
            </div>
            <div className='flex flex-row w-full gap-2'>
              <Button onClick={handleClose}>Upload Service Videos</Button>
              {/* <Button onClick={openModal}>Upload CSV</Button> */}
              {/* {(!deliverableVideoUrl && !stepsVideoUrl && !documentVideoUrl) && <p className='text-red-500'>Please upload service videos</p>} */}
            </div>
            <button
              type='submit'
              disabled={isAdding || !(dirty && isValid)}
              className={`w-full mt-2 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
            >
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {id ? "Updating Service" : "Creating Service"}
                </div>
                : id ? "Update Service" : "Create Service"}
            </button>
          </form>
        )
      }

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Choose a CSV file."
        confirmText="upload File"
        cancelText="Close"
        isConfirmVisible={true}
        onConfirm={handleConfirm}
      >
        <input
          type="file"
          id="csvFileInput"
          onChange={handleFileChange}
         
        />
        {csvError && <p style={{ color: 'red' }}>{csvError}</p>}  {/* Display error message */}
      </ReusableModal>

      <StepperWithContent open={open} handleOpen={handleClose} handleConfirm={handleUpload} />

    </div>
  )
}

export default ServiceForm