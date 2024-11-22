import React, { useEffect } from 'react'
import Select from 'react-select'
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { validationSchema } from './ValidationSchema';
import { useNavigate } from 'react-router-dom';
import TitleComponent from '@/components/common/TitleComponent';
import { TailSpin } from 'react-loader-spinner';
import { Spinner } from "@material-tailwind/react";
import { formatDate, handleExtraSpaces, setDateMin, validateNumber } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
import { createQuotation, getAllBusiness, getAllUsers, getSingleQuotation, updateQuotation } from '@/redux/admin/actions/Quotation';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import { getActiveServices } from '@/redux/admin/actions/Document';

import DatePicker from 'react-datepicker';
import { serviceProgress } from '@/redux/admin/slices/UserManagement';
const initialValues = {
  quotationTitle: "",        // Empty string for text fields
  description: "",           // Empty string for description
  userId: "",                // Empty string for user ID
  businessId: "",            // Empty string for business ID
  amount: null,  
  benefits: "",              // Empty string for benefits
  quotationDate: "" // Current timestamp as a default for date
};


const QuotationForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { quotationId } = useParams();
  const { userList, businessList, buisnessLoading, userLoading, isAdding, isFetching, quotation, editPage } = useSelector((state) => state.quotation)
  const { serviceList } = useSelector((state) => state.offer)

  const formattedUserList = userList?.map(form => ({
    value: form._id,
    label: form.name
  }));
  const formattedBusinessList = businessList?.map(form => ({
    value: form._id,
    label: form.businessName
  }));
  const formattedServiceList = serviceList?.map(form => ({
    value: form._id,
    label: form.name
  }));
  console.log(serviceList, 'service list')
  useEffect(() => {
    if (quotationId) dispatch(getSingleQuotation(quotationId))

  }, [quotationId])

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
    setFieldError,
    setFieldTouched,
    dirty,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async (values, action) => {

      console.log(values)
      const formattedValues = {
        ...values,
        quotationDate: new Date(values.quotationDate).getTime(),
      };
      if (quotationId) {
        dispatch(updateQuotation({ ...formattedValues, quotationId: quotationId }, editPage, navigate))
      } else {
        dispatch(createQuotation(formattedValues, navigate))
      }

    },
  });


  useEffect(() => {
    userList.length === 0 && dispatch(getAllUsers())
    // temporary user for listing 
    // const userId = localStorage.getItem("userId") || "66da879e8ea314c944ea2db4"
    businessList.length === 0 && dispatch(getAllBusiness())
    serviceList.length === 0 && dispatch(getActiveServices())
  }, [])
  const MAX_EDITOR_LENGTH = 1000;
  ReactQuill.Quill.register('modules/maxlength', function (quill, options) {
    quill.on('text-change', function () {
      const textLength = quill.getText().trim().length;
      if (textLength > options.maxLength) {
        quill.deleteText(options.maxLength, textLength - options.maxLength);
      }
    });
  });

  useEffect(() => {
    if (quotation && quotationId) {
      setFieldValue('quotationTitle', quotation.quotationTitle);
      setFieldValue('description', quotation.description);
      setFieldValue('userId', quotation.userId);
      setFieldValue('businessId', quotation.businessId);
      setFieldValue('serviceId', quotation.serviceId);
      setFieldValue('amount', quotation.amount);
      console.log(quotation?.quotationDate, "datedatedtae");

      setFieldValue('benefits', quotation.benefits);
    }
  }, [quotation, quotationId, setFieldValue]);

  useEffect(() => {
    if (quotation?.quotationDate) {
      const timestamp = Number(quotation.quotationDate); // Convert string to number
      if (!isNaN(timestamp)) { // Ensure it’s a valid number
        const date = new Date(timestamp); // Convert milliseconds to Date
        setFieldValue('quotationDate', date); // Set as Date object for DatePicker
      } else {
        console.error("Invalid date format for quotationDate");
      }
    }
  }, [quotation?.quotationDate, setFieldValue]);

  const date = setDateMin();
  const modules = {
    toolbar: {
      container: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
    },
    maxlength: { maxLength: MAX_EDITOR_LENGTH }, // Use the custom maxlength module
  };
  const handleUserChange = (selectedOption) => {
    setFieldValue('userId', selectedOption ? selectedOption.value : '');
    dispatch(getAllBusiness(selectedOption.value))
  };
  const handleBusinessChange = (selectedOption) => {
    setFieldValue('businessId', selectedOption ? selectedOption.value : '');
  };
  const handleServiceChange = (selectedOption) => {
    setFieldValue('serviceId', selectedOption ? selectedOption.value : '');
  };
  const breadcrumbData = [
    {

      name: 'Quotation',
      url: '/dashboard/admin/quotation',
      children: [
        {
          name: quotationId ? 'Update Quotation' : 'Create Quotation',
          url: quotationId
            ? ''
            : '/dashboard/admin/create-quotation',
        },
      ],
    }
  ];

  const handleAmountChange = (e) => {
    const { value } = e.target;
  
    // Allow empty value or any value greater than 0
    if (value === "" || Number(value) > 0 || /^[0-9]*$/.test(value)) {
      setFieldValue("amount", value);
    }
  };
  
  return (
    <div>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={quotationId ? "CORPZO | Update Quotation" : "CORPZO | Add Quotation"} />
      <HeaderTitle title={quotationId ? "Update Quotation" : "Create Quotation"} />
      {
        quotationId && isFetching ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-lg w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">Quotation Title</label>
                <input
                  className={`w-full p-2 border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="quotationTitle"
                  name="quotationTitle"
                  type="text"
                  placeholder={isFetching ? 'Update quotation title' : 'Add quotation title'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quotationTitle}
                  maxLength={35}
                />
                {touched.quotationTitle && errors.quotationTitle && <div className="text-red-500 text-sm mt-1">{errors.quotationTitle}</div>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="phone">Amount</label>
                <input
                  type="text"
                  maxLength={5}
                  placeholder={quotationId ? 'Update Amount' : 'Add Amount'}
                  className={`w-full p-2 border ${touched.amount && errors.amount ? 'border-red-500' : 'border-gray-300'} rounded`}
                  name="amount"
                  value={values.amount}
                  onChange={handleAmountChange}
                  onBlur={handleBlur}
                  onFocus={() => touched.amount = true}
                  onKeyDown={validateNumber}
                />
                {touched.amount && errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="gender">Select User</label>
                <Select
                  name='userId'
                  options={formattedUserList}
                  value={formattedUserList.find(option => option.value === values.userId) || null}
                  onChange={handleUserChange}
                  isLoading={userLoading}
                  isClearable
                  placeholder="Select User"
                  classNamePrefix="react-select"
                  onBlur={handleBlur}
                  // isDisabled={true}
                />
                {touched.userId && errors.userId && <div className="text-red-500 text-sm mt-1">{errors.userId}</div>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="gender">Select Business</label>
                <Select
                  name='businessId'
                  options={formattedBusinessList}
                  value={formattedBusinessList.find(option => option.value === values.businessId) || null}
                  onChange={handleBusinessChange}
                  isClearable

                  isLoading={buisnessLoading}
                  placeholder="Select Business"
                  classNamePrefix="react-select"
                  onBlur={handleBlur}
                />
                {touched.businessId && errors.businessId && <div className="text-red-500 text-sm mt-1">{errors.businessId}</div>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="gender">Select Service</label>
                <Select
                  name='serviceId'
                  options={formattedServiceList}
                  value={formattedServiceList.find(option => option.value === values.serviceId) || null}
                  onChange={handleServiceChange}
                  isClearable
                  isLoading={buisnessLoading}
                  placeholder="Select Service"
                  classNamePrefix="react-select"
                  onBlur={handleBlur}
                  isDisabled={true}
                />
                {touched.serviceId && errors.serviceId && <div className="text-red-500 text-sm mt-1">{errors.serviceId}</div>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">Quotation Date</label>
                <DatePicker
                  selected={values.quotationDate}
                  onChange={(date) => setFieldValue("quotationDate", date)}
                  onBlur={() => setFieldTouched("quotationDate", true)}
                  minDate={date}
                  dateFormat="yyyy-MM-dd"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholderText="Select Offer Validity"
                  readOnly={true}
                  disabled={true}
                />
                {touched.quotationDate && errors.quotationDate && <div className="text-red-500 text-sm mt-1">{errors.quotationDate}</div>}
              </div>
              <div>

              </div>


            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="gender">Enter Description</label>
                <ReactQuill
                  className='h-50'
                  theme="snow"
                  placeholder={"Enter Description..."}
                  onChange={(value) => setFieldValue("description", value)}
                  onBlur={() => setFieldTouched('description', true)}
                  name="description"

                  value={values.description}
                  modules={modules}
                  readOnly={false}
                />
                {touched.description && errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="gender">Enter Benefits</label>
                <ReactQuill
                  className='h-50'
                  theme="snow"
                  placeholder={"Enter Benefits..."}
                  onChange={(value) => setFieldValue("benefits", value)}
                  onBlur={() => setFieldTouched('benefits', true)}
                  name="benefits"

                  value={values.benefits}
                  modules={modules}
                  readOnly={false}
                />
                {touched.benefits && errors.benefits && <div className="text-red-500 text-sm mt-1">{errors.benefits}</div>}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type='submit'
              disabled={isAdding || ( !(dirty && isValid))}
              className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || (!(dirty && isValid)) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || ( !(dirty && isValid)) ? 'gray-400' : 'blue-500'}`}
            >
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  { "Updating Quotation"}
                </div> :
                 "Update Quotation"
              }
            </button>
          </form>
        )
      }
    </div>
  )
}

export default QuotationForm