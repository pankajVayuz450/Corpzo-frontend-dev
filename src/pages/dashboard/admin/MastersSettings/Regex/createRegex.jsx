import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createRegex, fetchRegexById, updateRegex } from '@/redux/admin/actions/MasterSettings/Regex/index';
import axios from 'axios';
import regExAPIs from '@/constants/APIList/regExAPIs';

const CreateRegex = ({isEdit}) => {
  const  {id}  = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  error} = useSelector((state) => state.validations);
  
  const [regex,setRegex] = useState({})
  console.log("regex",regex);


  useEffect(() => {
    if (isEdit) {
        console.log("id",id)
      // dispatch(fetchRegexById({id}));
     const fetchRegexById =async()=>{
      try {
        const response = await axios.get(`${regExAPIs.getRegExById}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setRegex(response?.data?.data)
        
      } catch (error) {
        console.log(error);
      }
     }
     fetchRegexById();
    }
  }, [id, dispatch]);

  const formik = useFormik({
    initialValues: {
      regexName: id && regex ? regex.regexName : '',
      regex: id && regex ? regex.regex : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      regexName: Yup.string().required('Required'),
      regex: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        console.log("updating... id:",{ id, ...values });
        
          dispatch(updateRegex({ id,...values})).then((res)=>{
            if((!res.error)){
              navigate(-1);
            }
          }).catch((err)=>{
            console.log(err);
            
          })
      } else {
          console.log("submitting values:", values);
          dispatch(createRegex(values))
              .then((response) => {
                // console.log("res",);
                
              })
              .catch((err) => {
                  console.log("Error:", err.message);
              });
      }
    }
  
  });
  
  
  // if(isEdit) return <h1>edit page</h1>

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">{id ? 'Edit Regex' : 'Create Regex'}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="regexName" className="block text-gray-700">Regex Name</label>
          <input
            type="text"
            id="regexName"
            name="regexName"
            {...formik.getFieldProps('regexName')}
            className={`mt-1 p-2 border rounded-md w-full ${formik.touched.regexName && formik.errors.regexName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formik.touched.regexName && formik.errors.regexName ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.regexName}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="regex" className="block text-gray-700">Regex</label>
          <input
            type="text"
            id="regex"
            name="regex"
            {...formik.getFieldProps('regex')}
            className={`mt-1 p-2 border rounded-md w-full ${formik.touched.regex && formik.errors.regex ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formik.touched.regex && formik.errors.regex ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.regex}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          {id ? 'Update Regex' : 'Create Regex'}
        </button>
      </form>
    </div>
  );
};

export default CreateRegex;
