import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
// import { createForm, updateForm } from '@/redux/admin/actions/form';
import { setIsFormCreated,createForm,updateForm } from '@/redux/admin/slices/FormManagement/formSlice';
import { clearFields } from '@/redux/admin/slices/fields';
import Breadcrumb from '@/widgets/layout/TopNavigation';


const FormCreationPage = () => {
  const [formDetails, setFormDetails] = useState({
    id: '',
    title: '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const initialForm = location.state?.initialForm;
  const isUpdate = !!initialForm;
  const dispatch = useDispatch();
  const formSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    description: Yup.string().required('Description is required'),
    url: Yup.string(),
  });
  const { id } = useParams();
  const { isFormCreating, isFormCreated ,forms} = useSelector((state) => state.forms);
  console.log("store:  isFormCreating, isFormCreated: ", isFormCreating, isFormCreated );
  console.log("forms::",forms);
  

  const handleCreateFields = () => {
    dispatch(setIsFormCreated(false))
    console.log("formDetails:",formDetails);
    
    navigate(`/dashboard/admin/formbuilder/create-form/${formDetails?.id}`, { state: { formDetails } });
    // dispatch(clearFields())
  }

  const breadcrumbData = [
    {
      name: 'Form Management',
      url: '/dashboard/admin/form',
      children: [
        {
          name: id ? 'Update Form' : 'Create Form',
          url: id
            ? ''
            : '/dashboard/admin/form/create-form',
        },
      ],
    }
  ];


  return (
    <div className="max-w-4xl mx-auto my-10 p-5 shadow-lg rounded-lg bg-white">
              <Breadcrumb items={breadcrumbData} />
      <Formik
        initialValues={initialForm || { title: '', description: '', url: '' }}
        validationSchema={formSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (isUpdate) {
            // dispatch(updateForm(values))
            //   .unwrap()
            //   .then(() => {

            //   })

            console.log("values:",values);
            
          }
          else {
            dispatch(createForm(values))
              .unwrap()
              .then((response) => {
                setFormDetails({
                  id: response.data._id, title: response.data.title
                })
                // navigate(-1);
                navigate('/dashboard/admin/form')
              })

            console.log("values:",values);
            
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Create New Form</h2>
            <div>
              <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
              <Field type="text" name="title" id="title" required className="mt-1 block w-full border border-gray-300 p-3 shadow-sm rounded-md focus:ring-blue-500 focus:border-blue-500" />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
              <Field as="textarea" name="description" id="description" required className="mt-1 block w-full border border-gray-300 p-3 shadow-sm rounded-md focus:ring-blue-500 focus:border-blue-500" />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>
            <div>
              <label htmlFor="url" className="block text-lg font-medium text-gray-700">URL</label>
              <Field type="text" name="url" id="url" required className="mt-1 block w-full border border-gray-300 p-3 shadow-sm rounded-md focus:ring-blue-500 focus:border-blue-500" />
              <ErrorMessage name="url" component="div" className="text-red-500" />
            </div>
            {isFormCreating ? (
              <TailSpin
                color="#000"
                height={80}
                width={80}
                timeout={3000}
              />
            ) : (
              !isFormCreated && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {isUpdate ? 'Update Form' : 'Create Form'}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => navigate('/dashboard/admin/form')}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            {isFormCreated &&
              <button onClick={() => handleCreateFields()} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Create Fields
              </button>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreationPage;