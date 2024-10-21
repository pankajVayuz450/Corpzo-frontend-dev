import React, { useEffect } from 'react'
import { Input, Spinner, Typography } from '@material-tailwind/react'
import Select from 'react-select';
import { Checkbox } from "@material-tailwind/react";
import { Radio } from "@material-tailwind/react"
import TitleComponent from '@/components/common/TitleComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { addOffer, getActiveServices, getSingleOffer, editOffer } from '@/redux/admin/actions/Offer';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { setDateMin } from '@/Helpers/globalfunctions';
import { validationSchema } from './ValidationSchema';
import { TailSpin } from 'react-loader-spinner';
import Breadcrumb from '@/widgets/layout/TopNavigation';

const initialValues = {
  offerTitle: "",
  offerDetail: "",
  discountPercent: 0,
  validity: "",
  applicableUserType: "",
  serviceId: [],
  active: false
}
const CreateOffer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { serviceList, offer, isAdding, editPage, isFetching } = useSelector((state) => state.offer)
  const formattedServiceList = serviceList?.map(service => ({
    value: service._id,
    label: service.name
  }));

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
    setFieldTouched
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setTouched({}, false);
      
      if(id ){
        dispatch(editOffer(offer.offerId, values,editPage, navigate));
      }else{
        dispatch(addOffer(values, navigate));
      }
      setErrors({});
    },
  });

  const date = setDateMin();
  useEffect(() => {
    dispatch(getActiveServices())
  }, [])

  const sanitizeSAerviceArray = () => {
    if (!Array.isArray(offer?.offerservices)) {
      return [];
    }
    
    return offer.offerservices.map((service) => ({
      value: service.serviceId,
      label: service.service?.[0]?.name || 'Unknown Service' // Fallback in case service[0] is missing
    }));
  }

  useEffect(() => {

    if (id !== undefined && offer) {
      const sanitizedArray = sanitizeSAerviceArray()

      const formattedDate = offer.validity ? new Date(offer.validity).toISOString().split('T')[0] : '';

      setFieldValue("offerTitle", offer.offerTitle);
      setFieldValue("serviceId", sanitizedArray.map(service => service.value));
      setFieldValue("offerDetail", offer.offerDetail)
      setFieldValue("discountPercent", offer.discountPercent)
      setFieldValue("validity", formattedDate)
      setFieldValue("applicableUserType",  offer.applicableUserType)
    } else {
      setFieldValue("offerTitle", "")
      setFieldValue("serviceId", []);
      setFieldValue("offerDetail","")
      setFieldValue("discountPercent", "")
      setFieldValue("validity","")
      setFieldValue("applicableUserType", "")
    }
    setErrors({})


  }, [offer, setFieldValue])
  useEffect(() => {
    if (id) {
      dispatch(getSingleOffer(id))
    }
  }, [])
  const breadcrumbData = [
    {

      name: 'Offer Management',
      url: '/dashboard/admin/offer',
      children: [
        {
          name: id ? 'Update Offer' : 'Create Offer',
          url: id
            ? ''
            : '/dashboard/admin/add-offer',
        },
      ],
    }
  ];
  return (
    <div className='w-1/2'>
       <Breadcrumb items={breadcrumbData}/>
      <TitleComponent title={id ? `CORPZO | Update Offer` : `CORPZO | Create Offer`}></TitleComponent>
      <h1 className="text-xl md:text-3xl font-semibold mb-4">{id ? "Update Offer" : "Create Offer"}</h1>
      {
        id && isFetching ? 
        (<div className="flex justify-center items-center min-h-screen">
          <TailSpin height={50} width={50} color="blue" />
        </div>) : (
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <div>

          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Offer Title
          </Typography>
          <Input
            size="sm"
            placeholder="Enter Offer title"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name='offerTitle'
            value={values.offerTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={50}
          />
          {errors.offerTitle && touched.offerTitle && <p className='text-sm text-red-500'>{errors.offerTitle}</p>}
        </div>
        <div>

          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Offer Detail
          </Typography>
          <Input
            size="sm"
            placeholder="Enter Offer Detail"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name='offerDetail'
            value={values.offerDetail}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.offerDetail && touched.offerDetail && <p className='text-sm text-red-500'>{errors.offerDetail}</p>}
        </div>
        <div>

          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Discount %
          </Typography>
          <Input
            size="sm"
            placeholder="Enmter Offer Discount"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            type='number'
            name='discountPercent'
            value={values.discountPercent}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.discountPercent && touched.discountPercent && <p className='text-sm text-red-500'>{errors.discountPercent}</p>}

        </div>
        <div>

          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Validity
          </Typography>
          <Input
            type='date'
            size="sm"
            placeholder="Enter Offer Validity"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            min={date}
            name='validity'
            value={values.validity}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.validity && touched.validity && <p className='text-sm text-red-500'>{errors.validity}</p>}
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Service
          </Typography>
          <Select
            isMulti
            name="serviceId"
            options={formattedServiceList}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formattedServiceList.filter(option => values.serviceId.includes(option.value))}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
              setFieldValue("serviceId", selectedValues);
            }}
            onBlur={() => setFieldTouched('serviceId', true)}
          />
          {errors.serviceId && touched.serviceId && <p className='text-sm text-red-500'>{errors.serviceId}</p>}
        </div>
        <div className="flex gap-10">
          <Radio
            name="applicableUserType"
            label="All"
            value="All"
            checked={values.applicableUserType === "All"}
            onChange={handleChange}
          />
          <Radio
            name="applicableUserType"
            label="Corpzo"
            value="Corpzo"
            checked={values.applicableUserType === "Corpzo"}
            onChange={handleChange}
          />
          <Radio
            name="applicableUserType"
            label="Corpzo X"
            value="Corpzo X"
            checked={values.applicableUserType === "Corpzo X"}
            onChange={handleChange}
          />
        </div>
        {errors.applicableUserType && touched.applicableUserType && <p className='text-sm text-red-500'>{errors.applicableUserType}</p>}
        <button
          type='submit'
          disabled={isAdding || !(dirty && isValid)}
          className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
        >
          {isAdding ?
            <div className='flex justify-center items-center gap-3'>
              <Spinner color='white' className="h-4 w-4" />
              {id ? "Updating Offer" : "Adding Offer"}
            </div>
            : id ? "Update Offer" : "Add Offer"}
        </button>
      </form>
        )
      }
      

    </div>
  )
}

export default CreateOffer