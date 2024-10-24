import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import listAll from '@/constants/APIList/listAll';
import { useDispatch, useSelector } from 'react-redux';
import { createFormElement } from '@/redux/admin/actions/MasterSettings/Elements';
import { useNavigate } from 'react-router-dom';

function AddFormElement() {
  const [parentElements, setParentElements] = useState([]);
  const [hasParentElement, setHasParentElement] = useState(false);
  const {isCreatingElement } = useSelector((state) => state.elements);

  const dispatch = useDispatch();
  const navigate = useNavigate();



  // Simulate API call to fetch parentElementId options
  useEffect(() => {
    const fetchParentElements = async () => {
      try {
        let response = await axios.get(listAll.getAllFieldTypes, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        response = response?.data?.data;
        response = response?.map((res) => {
          return { _id: res._id, typeName: res.typeName };
        });
        setParentElements(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParentElements();
  }, []);

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      elementName: '',
      hasChildElements: false,
      isSelfClosed: true,
      parentElementId: '',
    },
    validationSchema: Yup.object({
      elementName: Yup.string().required('Element name is required'),
    }),
    onSubmit: (values) => {
      const formData = {
        fieldType: values.elementName,
        hasChildElements: values.hasChildElements,
        isSelfClosed: values.isSelfClosed,
        parentElementId: hasParentElement ? values.parentElementId : "",
      };
      console.log('Form Data:', formData);
      dispatch(createFormElement(formData))
      .unwrap() // This makes the thunk return a Promise you can handle directly
      .then(() => {
          navigate(-1); // Go back to the previous page if successful
      })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 p-4 bg-gray-100 rounded-md shadow-md">
      {/* Element Name Field */}
      <div className="w-full">
        <label htmlFor="elementName" className="block text-sm font-medium text-gray-700">
          Element Name
        </label>
        <input
          id="elementName"
          type="text"
          value={formik.values.elementName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formik.touched.elementName && formik.errors.elementName ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.elementName}</div>
        ) : null}
      </div>

      {/* Has Parent Element Checkbox */}
      <div className="flex items-center">
        <input
          id="hasParentElement"
          type="checkbox"
          checked={hasParentElement}
          onChange={(e) => setHasParentElement(e.target.checked)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="hasParentElement" className="ml-2 block text-sm text-gray-900">
          Has Parent Element
        </label>
      </div>

      {/* Conditionally render Parent Element dropdown */}
      {hasParentElement && (
        <div className="w-full">
          <label htmlFor="parentElementId" className="block text-sm font-medium text-gray-700">
            Parent Element
          </label>
          <select
            id="parentElementId"
            value={formik.values.parentElementId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select a parent element
            </option>
            {parentElements.map((parent) => (
              <option key={parent._id} value={parent._id}>
                {parent.typeName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Has Child Elements Checkbox */}
      <div className="flex items-center">
        <input
          id="hasChildElements"
          type="checkbox"
          checked={formik.values.hasChildElements}
          onChange={formik.handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="hasChildElements" className="ml-2 block text-sm text-gray-900">
          Has Child Elements
        </label>
      </div>

      {/* Is Self Closed Checkbox */}
      <div className="flex items-center">
        <input
          id="isSelfClosed"
          type="checkbox"
          checked={formik.values.isSelfClosed}
          onChange={formik.handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="isSelfClosed" className="ml-2 block text-sm text-gray-900">
          Is Self Closed
        </label>
      </div>

      <button
        type="submit"
        disabled={isCreatingElement}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {isCreatingElement?"Creating...":"Create"}
      </button>
    </form>
  );
}

export default AddFormElement;
