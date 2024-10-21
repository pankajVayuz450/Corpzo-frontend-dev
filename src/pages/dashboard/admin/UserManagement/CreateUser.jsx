import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUserById, updateUser } from '@/redux/admin/actions/UserManagement';
import { TailSpin } from 'react-loader-spinner';
import { Input, Switch } from '@material-tailwind/react';
import TitleComponent from '@/components/common/TitleComponent';

const initialValues = {
  name: '',
  email: '',
  gender: '',
  phone: '',
  profilePictureUrl: "",
  active : false,
};

const validKeyForPayment = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];


export const validateNumber  =(e)=>{
  if (!validKeyForPayment.includes(e.key)) {
    e.preventDefault();
  }
}
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  gender: Yup.string().oneOf(['male', 'female'], 'Gender must be either male or female').required('Gender is required'),
  phone:  Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits long')
  .required('Phone number is required'),
  profilePictureUrl: Yup.string().nullable(),
});

const CreateUser = () => {
    const dispatch = useDispatch();
  const { id } = useParams();
  const { user,isUserCreating,isUserFetching, editPage } = useSelector((state) => state.userMgmt);
  const navigate = useNavigate();

useEffect(() => {
    if (id) {
        dispatch(getUserById(id));
    }
}, [id]);


  const formik = useFormik({
    initialValues: id ? user : initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (id) {
        const userData = {
          name : values.name, 
          phone : values.phone, 
          email : values.email, 
          gender : values.gender, 
          active : values.isActive, 
          profilePictureUrl:values.profilePictureUrl,
        }
        dispatch(updateUser({id :values.userId, userData, editPage, navigate}))
      }
        else {
           dispatch(createUser(values))
           .unwrap()
           .then(()=>{
                navigate('/dashboard/admin/usermanagement')
           })
           ;
        }
    },
  });
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <TitleComponent title={id ? "CORPZO | Update User" : "CORPZO | Create User"}/>
     {isUserFetching?<TailSpin 
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
     />: <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">{id ? 'Edit User' : 'Create User'}</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            className={`w-full p-2 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            className={`w-full p-2 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="gender">Gender</label>
          <select
            className={`w-full p-2 border ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border-gray-300'} rounded`}
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
          >
            <option value="" label="Select gender" />
            <option value="male" label="Male" />
            <option value="female" label="Female" />
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
          <input
                size="sm"
                type='tel'
                maxLength={10}
                placeholder={id ? 'Edit Phone Number' : 'Add Phone Number'}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyDown={validateNumber}  
              />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="profilePictureUrl">Profile Picture URL</label>
          <input
            className={`w-full p-2 border ${formik.touched.profilePictureUrl && formik.errors.profilePictureUrl ? 'border-red-500' : 'border-gray-300'} rounded`}
            id="profilePictureUrl"
            name="profilePictureUrl"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.profilePictureUrl}
          />
          {formik.touched.profilePictureUrl && formik.errors.profilePictureUrl ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.profilePictureUrl}</div>
          ) : null}
        </div>

        {isUserCreating?<TailSpin
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
        />:<button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {id ? 'Update User' : 'Create User'}
        </button>}
      </form>}
    </div>
  );
};

export default CreateUser;