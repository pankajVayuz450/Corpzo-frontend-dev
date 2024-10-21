import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createFormElement } from '@/redux/admin/actions/MasterSettings/Elements';
import { createValidFormElement } from '@/redux/admin/actions/MasterSettings/Valid Form Elements';
import { useNavigate } from 'react-router-dom';
// import { addElement } from './actions'; // Adjust the import based on your file structure

const validationSchema = Yup.object({
  elementName: Yup.string()
    .required('Element name is required')
    .min(2, 'Element name must be at least 2 characters long')
    .max(20, 'Element name must not exceed 20 characters')
    .matches(/^[a-zA-Z0-9 ]*$/, 'Element name must only contain letters and numbers'),
});

function AddElement() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.validFormElements);
  const {validFormElements,isCreatingValidFormElement} = store;
  const navigate = useNavigate(); 

  console.log("store",store);
  console.log("isCreatingValidFormElement",isCreatingValidFormElement);
  
  

  const formik = useFormik({
    initialValues: {
      elementName: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
        dispatch(createValidFormElement({ element: values.elementName }))
          .unwrap() // This makes the thunk return a Promise you can handle directly
          .then(() => {
            resetForm(); // Reset the form fields
            navigate(-1); // Go back to the previous page if successful
          })
          .catch((error) => {
            console.log('Error submitting the form:', error); // Handle the error case if needed
          });
      },
  });

  const handleSubmit = ()=>{
        dispatch(addElement({ name: values.elementName })); // Dispatch the action to add the element
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Add New Element</h1>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <div>
          <label htmlFor="elementName" className="block text-sm font-medium text-gray-700">
            Element Name
          </label>
          <input
            type="text"
            name="elementName"
            id="elementName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.elementName}
            required
            className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formik.touched.elementName && formik.errors.elementName ? (
            <div className="mt-1 text-red-600 text-sm">{formik.errors.elementName}</div>
          ) : null}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {isCreatingValidFormElement?"Adding...":"Add Element"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddElement;
