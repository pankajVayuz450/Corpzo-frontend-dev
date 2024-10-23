import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import ReusableForm from '@/components/admin/ReusableForm';
import { addCaseHistory, addNoteAndField } from '@/redux/admin/actions/ApplicationManagement';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataByApplicationId } from './helper';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
import TitleComponent from '@/components/common/TitleComponent';
import { useNavigate } from 'react-router-dom';


const AddNote = () => {
  const { applicationsList,userId, totalCount, isFetching, applicationId } = useSelector((state) => state.applications)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userData = getUserDataByApplicationId(applicationsList, applicationId);
  console.log(userData);


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
      const noteData={
        "applicationId": applicationId,
        // "cloneFormFieldId":"66ea796bb807a921aa3b8c84",
        "noteContent": values.note
      }

      dispatch(addNoteAndField(noteData,navigate));


      dispatch(addCaseHistory({
        "applicationId": applicationId,
        "action": ` Team note added. `,
        "performedBy": userId,
        //   "reason": "document ",
        // "statusBefore": status,
        // "statusAfter": value
    }));


      // Here you can handle the submission logic
    },
  });
  const breadcrumbData = [
    {
      
        
          name: 'Application',
          children: [
            {
              name: 'Application Form',
              url: '/dashboard/admin/add-application',
              children: [
                {
                  name:  'Team Note',
                  url:'/dashboard/admin/team-history',
                  children:[
                   {
                    name:"Add",
                     url:"/dashboard/admin/team-note/create-note"
                   }

                  ]
                },
              ],
            },
          ],
    }
  ];



  return (

    <>
      <Breadcrumb items={breadcrumbData}/>
      <TitleComponent title={"CORPZO |Team Note"} />
      <HeaderTitle title="Add Team Note" />
      <ReusableForm
      headingText="Team Note"
      nameText={`Name: ${userData?.name}`}
      dateText={`Date: ${formatReadableDate(Date())}`}
      labelText="Add Note"
      placeholderText="Enter your description here..."
      buttonText={"Add"}
      loading={isFetching}
      values={formik.values} // Pass Formik values
      handleChange={formik.handleChange} // Pass Formik handleChange
      handleSubmit={formik.handleSubmit} // Pass Formik handleSubmit
      errors={formik.errors} // Pass Formik errors
      touched={formik.touched} // Pass Formik touched state
    />
    </>
   
  );
};

export default AddNote;
