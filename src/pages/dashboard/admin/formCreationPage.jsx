import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { setIsFormCreated, createForm, updateForm } from '@/redux/admin/slices/FormManagement/formSlice';
import { clearFields } from '@/redux/admin/slices/fields';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import TitleComponent from '@/components/common/TitleComponent';
import { Button } from '@material-tailwind/react';

const FormCreationPage = () => {
  const [formDetails, setFormDetails] = useState({
    id: '',
    title: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const initialForm = location.state?.initialForm;
  const isUpdate = !!initialForm;
  const dispatch = useDispatch();

  const { id } = useParams();
  const { isFormCreating, isFormCreated } = useSelector((state) => state.forms);

  // Define Yup schema
  const formSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .matches(/^[a-zA-Z0-9\s]+$/, 'No special characters allowed')
      .min(1, 'Title must not be empty')
      .max(50, 'Title is too long')
      .required('Title is required'),
    
    description: Yup.string()
      .trim()
      .matches(/^[a-zA-Z0-9\s]+$/, 'No special characters allowed')
      .min(1, 'Description must not be empty')
      .max(200, 'Description is too long')
      .required('Description is required')
  });

  // Initialize formik with initial values and validation schema
  const formik = useFormik({
    initialValues: initialForm || { title: '', description: '' },
    validationSchema: formSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (isUpdate) {
        console.log("values:", values);
        // Dispatch update form action here
      } else {
        dispatch(createForm(values))
          .unwrap()
          .then((response) => {
            setFormDetails({
              id: response.data._id, title: response.data.title
            });
            navigate('/dashboard/admin/form');
          });
      }
    }
  });  

  const handleCreateFields = () => {
    dispatch(setIsFormCreated(false));
    navigate(`/dashboard/admin/formbuilder/create-form/${formDetails?.id}`, { state: { formDetails } });
  };

  const breadcrumbData = [
    {
      name: 'Form Management',
      url: '/dashboard/admin/form',
      children: [
        {
          name: id ? 'Update Form' : 'Create Form',
          url: id ? '' : '/dashboard/admin/form/create-form',
        },
      ],
    }
  ];

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 shadow-lg rounded-lg bg-white">
      <TitleComponent title={"CORPZO | Create Form"}></TitleComponent>
      <Breadcrumb items={breadcrumbData} />
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Create New Form</h2>
        
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full border border-gray-300 p-3 shadow-sm rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={50}
          />
          {formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            required
            className="mt-1 block w-full border border-gray-300 p-3 shadow-sm rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={200}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>

        {isFormCreating ? (
          <TailSpin color="#000" height={80} width={80} timeout={3000} />
        ) : (
          !isFormCreated && (
            <Button
              type="submit"
              disabled={formik.isSubmitting || formik.errors.title || formik.errors.description}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isUpdate ? 'Update Form' : 'Create Form'}
            </Button>
          )
        )}

        <Button
          type="button"
          onClick={() => navigate('/dashboard/admin/form')}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Cancel
        </Button>

        {isFormCreated && (
          <button onClick={() => handleCreateFields()} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create Fields
          </button>
        )}
      </form>
    </div>
  );
};

export default FormCreationPage;
