import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import ReusableForm from '@/components/admin/ReusableForm';
import { addNoteAndField } from '@/redux/admin/actions/ApplicationManagement';
import { useDispatch } from 'react-redux';

const AddNote = () => {
  const dispatch = useDispatch();

  
  const formik = useFormik({
    initialValues: {
      note: '',
    },
    validationSchema: Yup.object({
      note: Yup.string()
        .required('Note is required') // Add validation rules
        .min(10, 'Note must be at least 10 characters'),
    }),
    onSubmit: (values) => {
      // alert(`Add button clicked! Note: ${values.note}`);

      dispatch(addNoteAndField({
        "applicationId": "a20814d6-a4d6-42db-853d-afca0a3b13f4",
        // "cloneFormFieldId":"66ea796bb807a921aa3b8c84",
        "noteContent": values.note
      }));

      
      // Here you can handle the submission logic
    },
  });



  return (
    <ReusableForm
      headingText="Team Note"
      nameText="Name: Lucky Singh"
      dateText="Date: October 16, 2024"
      labelText="Add Note"
      placeholderText="Enter your description here..."
      buttonText="Add"
      values={formik.values} // Pass Formik values
      handleChange={formik.handleChange} // Pass Formik handleChange
      handleSubmit={formik.handleSubmit} // Pass Formik handleSubmit
      errors={formik.errors} // Pass Formik errors
      touched={formik.touched} // Pass Formik touched state
    />
  );
};

export default AddNote;
