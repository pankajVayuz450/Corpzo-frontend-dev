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
import { validationSchema } from './ValidationSchema';
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import ReactQuill from 'react-quill';
import { validateNumber } from '@/Helpers/globalfunctions';
import { addSubscriptions, getAllSubscriptions, editSubscriptions } from '@/redux/admin/actions/Subscriptions';
const initialValues = {
  title: "",
  description: "",
  amount: 0,
  serviceId: "",
  type: "",
  duration: ""
}
const MAX_EDITOR_LENGTH = 200;

const AddSubscriptions = () => {

  const { id, serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector((state) => state.subscriptions.subscription);
  const isFetching = useSelector((state) => state.subscriptions.isFetching);
  const isAdding = useSelector((state) => state.subscriptions.isAdding);
  // const editPage = useSelector((state)=> state.subscriptions.editPage);
  // const modules = {
  //   maxlength : {maxLength : 10}
  // }
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
    initialValues: {...initialValues, serviceId:serviceId},
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setTouched({}, false);

      if (id !== undefined) {
        const data = {
          title: handleExtraSpaces(values.title),
          description: values.description,
          type: values.type,
          amount: values.amount, 
          duration : values.duration,
          
        }
        dispatch(editSubscriptions(id, data, navigate, serviceId));
      } else {
        
        dispatch(addSubscriptions(values, navigate));
      }
      setErrors({});
    },
  });
  useEffect(() => {
    if (serviceId !== undefined) {
      console.log(id, "from museeffect")
      dispatch(getAllSubscriptions(1, 1, "", serviceId))
    }
  }, [])
  useEffect(() => {
    console.log(data)
    if (id !== undefined && data) {
      setFieldValue("title", data.title || "")
      setFieldValue("description", data.description || "")
      setFieldValue("amount", data.amount || "")
      setFieldValue("type", data.type || "")
      setFieldValue("duration", data.duration || "")
    } else {
      setFieldValue("title", "")
      setFieldValue("description", "")
      setFieldValue("amount", "")
      setFieldValue("type", "")
      setFieldValue("duration", "")
    }
    setErrors({})


  }, [data, setFieldValue])

  
  ReactQuill.Quill.register('modules/maxlength', function (quill, options) {
    quill.on('text-change', function () {
      const textLength = quill.getText().trim().length;
      if (textLength > options.maxLength) {
        quill.deleteText(options.maxLength, textLength - options.maxLength);
      }
    });
  });

  const modules = {
    toolbar: {
      container: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
    },
    maxlength: { maxLength: MAX_EDITOR_LENGTH }, // Use the custom maxlength module
  };

  return (
    <div className='relative'>
      <TitleComponent title={id ? "CORPZO | Edit Subscription" : "CORPZO | Create Subscription"} />
      <h1 className="text-xl md:text-3xl font-semibold mb-4">{id !== undefined ? "Edit Subscription" : "Create Subscription"}</h1>
      {
        id !== undefined && isFetching ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-[50%] flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Subscription Title
            </Typography>
            <Input
              size="sm"
              placeholder="Add Subscriptions"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={values.title}
              onFocus={() => touched.title = true}
              onChange={handleChange}
              onBlur={handleBlur}
              name='title'
              maxLength={100}
            />
            {errors.title && touched.title && <p className='text-sm text-red-500'>{errors.title}</p>}
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Description
            </Typography>
            <ReactQuill
              className='h-50'
              theme="snow"
              placeholder={"Write Description here..."}
              onChange={(value) => setFieldValue("description", value)}
              onBlur={() => setFieldTouched('description', true)}
              name="description"

              value={values.description}
              modules={modules}
              readOnly={false} 
            />
            {errors.description && touched.description && <p className='text-sm text-red-500'>{errors.description}</p>}
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Amount
            </Typography>
            <Input
              size="sm"
              placeholder="Add Amount"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={values.amount}
              onChange={handleChange}
              onFocus={() => touched.amount = true}
              onBlur={handleBlur}
              name='amount'
              onKeyDown={validateNumber}
              maxLength={5}
            />
            {errors.amount && touched.amount && <p className='text-sm text-red-500'>{errors.amount}</p>}
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Type
            </Typography>
            <select
              className='px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500'
              name='type'
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => touched.type = true}
            >
              <option value="" disabled>
                Select a Type
              </option>
              <option value="Basic">
                Basic
              </option>
              <option value="Agency">
                Agency
              </option>
              <option value="Enterprise">
                Enterprise
              </option>
            </select>

            {errors.type && touched.type && <p className='text-sm text-red-500'>{errors.type}</p>}

            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Duration
            </Typography>
            <select
              className='px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500'
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

            <button
              type='submit'
              disabled={isAdding || !(dirty && isValid)}

              className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
            >
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {id ? "Updating Subscription" : "Adding Subscription"}
                </div>
                : id ? "Update Subscription" : "Add Subscription"}
            </button>
          </form>
        )
      }
    </div>
  )
}

export default AddSubscriptions