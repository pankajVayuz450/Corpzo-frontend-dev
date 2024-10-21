import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createSubAdmin, fetchSubAdminById, updateSubAdmin } from '@/redux/admin/actions/subAdmin';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { handleExtraSpaces, validateNumber } from '@/Helpers/globalfunctions';

const SubadminForm = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subAdmin, isSubAdminFetching, isSubAdminCreating } = useSelector((state) => state.subAdmins);

  useEffect(() => {
    if (id) {
      console.log(id,
        "from form "
      )
      dispatch(fetchSubAdminById(id));
    }
  }, [id, dispatch]);

  const initialValues = {
    name: '',
    email: '',
    contact: '',
    type: '',
    access: [],
    active: false
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Name should not contain numbers or special characters')
      .max(30, "Name cannot exceed 30 characters")
      .required('Name is required'), 
    email: Yup.string()
      .email('Invalid email address')
      .matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz)$', 'Invalid email format')
      .required('Email is required'),  
    contact: Yup.string()
      .matches(/^\d{10}$/, 'Contact number must contain exactly 10 digits')
      .required('Contact number is required'),  
    type: Yup.string()
      .required('Type is required'),  
    access: Yup.array()
      .min(1, 'At least one access must be selected')
      .required('Access is required'),  
  });



  const handleSubmit = (values, { setSubmitting }) => {
    if (id) {
      console.log(values, ":edit l amndar ka data")
      const snaitizedData = {
        name: values.name,
        email: values.email,
        contact: values.contact,
        type: values.type,
        access: values.access,
        active: values.active
      }
      console.log()
      dispatch(updateSubAdmin({id, snaitizedData }))
        .unwrap()
        .then(() => {
          navigate('/dashboard/admin/submadminmanagemnt');
        })
    } else {
      const data = {
        ...values,
        name: handleExtraSpaces(values.name)
      }
      dispatch(createSubAdmin(values))
        .unwrap()
        .then(() => {
          navigate('/dashboard/admin/submadminmanagemnt');
        })
    }
    setSubmitting(false);
  };

  if (isSubAdminFetching) {
    return <>
 <div className="flex justify-center items-center min-h-screen">
      <TailSpin
      color="#000"
      height={80}
      width={80}
    />;
      </div>
    </>
  }


  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{id ? 'Update Sub-Admin' : 'Create Sub-Admin'}</h2>
      <Formik
        initialValues={id ? subAdmin : initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                maxLength={30}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                maxLength={50}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
              <Field
                type="tel"
                id="contact"
                name="contact"
                onKeyDown={validateNumber}
                maxLength={10}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="contact" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Line Manager</label>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <Field as="select" id="type" name="type" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option value="" label="Select type" />
                  <option value="Agent" label="Agent" />
                  <option value="Line Manager" label="Line Manager" />
                </Field>
              </div>
              <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Access</label>
              <div className="mt-2 space-y-2">
                <div className="flex items-start">
                  <Field
                    type="checkbox"
                    name="access"
                    value="Form Management"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Form Management</label>
                </div>
                <div className="flex items-start">
                  <Field
                    type="checkbox"
                    name="access"
                    value="Business Setup"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Business Setup</label>
                </div>
                <div className="flex items-start">
                  <Field
                    type="checkbox"
                    name="access"
                    value="Waste Management"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Waste Management</label>
                </div>
              </div>
              <ErrorMessage name="access" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubAdminCreating ? <TailSpin
                  color="#fff"
                  height={20}
                  width={20}
                /> : id ? 'Update' : 'Create'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubadminForm;
