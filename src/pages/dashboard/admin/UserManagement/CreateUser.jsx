import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUserById, updateUser } from '@/redux/admin/actions/UserManagement';
import TitleComponent from '@/components/common/TitleComponent';
import { validateNumber, handleExtraSpaces } from '@/Helpers/globalfunctions';
import {  Spinner, Typography } from '@material-tailwind/react';
import { fetchAllAssignedToData, fetchAllRoles } from '@/redux/admin/actions/roles';
import { toast } from 'react-toastify';
import { removeFetchingAssignedTo, removeFetchingRolesError } from '@/redux/admin/slices/rolesSlice';
import { TailSpin } from 'react-loader-spinner';
import Select from 'react-select';
import { fetchAllTeams } from '@/redux/admin/actions/teams';
import { removeFetchingTeamsError } from '@/redux/admin/slices/teamsSlice';
const initialValues = {
  name: '',
  email: '',
  gender: '',
  phone: '',
  profilePictureUrl: "",
  active: false,
  role: "",
  assignedTo: "",
  teamId: "",
};

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required').min(2, "Name must be atleast 2 characters long").max(35, 'Name cannot exceed 35 characters').matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: Yup.string().email('Invalid email address').matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz)$', 'Invalid email format').required('Email is required'),
  gender: Yup.string().oneOf(['male', 'female'], 'Gender must be either male or female').required('Gender is required'),
  phone: Yup.string().trim().matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, 'Phone number must be exactly 10 digits long')
    .required('Phone number is required'),
  role: Yup.string().required("Role is required field"),
  assignedTo: Yup.string().required("Assigned to is required field"),
});

const CreateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user, isUserCreating, isUserFetching, editPage } = useSelector((state) => state.userMgmt);
  const { roles, fetchingRolesError, assignedTo, fetchingAssignedToError } = useSelector((state) => state.role);
  const { teams, fetchingTeamsError } = useSelector((state) => state.team);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllRoles({ page: 1, limit: 10 }));
  }, [])

  useEffect(() => {
    dispatch(fetchAllTeams({ page: 1, limit: 10 }));
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id]);


  useEffect(() => {
    if (id && assignedTo && user?.assignedTo) {
      formik.setFieldValue("assignedTo", user?.assignedTo);
    }
    if (fetchingRolesError) {
      toast.error("Error in fetching roles")
      dispatch(removeFetchingRolesError())
    }
    if (fetchingAssignedToError) {
      toast.error("Error in fetching assignies")
      dispatch(removeFetchingAssignedTo())
    }
    if (fetchingTeamsError) {
      toast.error("Error in fetching teams")
      dispatch(removeFetchingTeamsError())
    }
  }, [id, assignedTo, user?.assignedTo, fetchingRolesError, fetchingAssignedToError, fetchingTeamsError])

  const formik = useFormik({
    initialValues: id ? { ...user, role: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1).toLowerCase() } : initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (id) {
        const userData = {
          name: handleExtraSpaces(values.name),
          phone: values.phone,
          email: values.email,
          gender: values.gender,
          active: values.isActive,
          profilePictureUrl: values.profilePictureUrl,
        }
        dispatch(updateUser({ id: values.userId, userData, editPage, navigate }))
      }
      else {
        dispatch(createUser({...values, role: values?.role?.toLowerCase()}))
          .unwrap()
          .then(() => {
            navigate('/dashboard/admin/usermanagement')
          })
          ;
      }
    },
  });

  useEffect(() => {
    if (formik.values.role) {
      let usersRole
      if (formik.values.role == 'User') {
        usersRole = 'agent'
      } else if (formik.values.role == 'Agent') {
        usersRole = 'manager'
      } else if (formik.values.role == 'Manager') {
        usersRole = 'admin'
      } else if (formik.values.role == 'Admin') {
        usersRole = 'super_admin'
      } else {
        usersRole = 'agent'
      }
      dispatch(fetchAllAssignedToData(usersRole));
    }
    formik.setFieldValue("assignedTo", "");
  }, [formik.values.role])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <TitleComponent title={id ? "CORPZO | Update User" : "CORPZO | Create User"} />
      {isUserFetching ? <TailSpin
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
      /> : <form
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
            maxLength={35}
            onFocus={() => formik.touched.name = true}

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
            onFocus={() => formik.touched.email = true}
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
          <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
          <select
            className={`w-full p-2 border ${formik.touched.role && formik.errors.role ? 'border-red-500' : 'border-gray-300'} rounded`}
            id="role"
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          >
            <option value="" label="Select Role" />
            {
              roles?.map((role) => {
                return <option value={role?.role} label={role?.role} />
              })
            }
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <Typography variant="small" htmlFor="assignedTo" color="blue-gray" className="block text-gray-700 mb-2">
            Select Assignee
          </Typography>
          <Select
            name="assignedTo"
            id="assignedTo"
            options={assignedTo}
            className={`w-full border ${formik.touched.assignedTo && formik.errors.assignedTo ? 'border-red-500' : 'border-gray-300'} rounded`} // Change class name to basic-single for single select
            classNamePrefix="select"
            value={assignedTo?.find(option => option?.value === formik.values.assignedTo)}
            onChange={(selectedOption) => {
              const selectedValue = selectedOption ? selectedOption?.value : "";
              console.log("Selected agent value:", selectedValue);
              formik.setFieldValue("assignedTo", selectedValue);
            }}
            isSearchable // This keeps the search functionality enabled
          />


          {formik.touched.assignedTo && formik.errors.assignedTo ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.assignedTo}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="teamId">Team</label>
          <select
            className={`w-full p-2 border ${formik.touched.teamId && formik.errors.teamId ? 'border-red-500' : 'border-gray-300'} rounded`}
            id="teamId"
            name="teamId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.teamId}
          >
            <option value="" label="Select Team" />
            {
              teams?.map((team) => {
                return <option value={team?._id} label={team?.team} />
              })
            }
          </select>
          {formik.touched.teamId && formik.errors.teamId ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.teamId}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
          <input
            size="sm"
            type='tel'
            maxLength={10}
            placeholder={id ? 'Edit Phone Number' : 'Add Phone Number'}
            className={`w-full p-2 border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={validateNumber}
            onFocus={() => formik.touched.phone = true}

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

        <button
          disabled={isUserCreating || !(formik.dirty && formik.isValid)}
          onClick={formik.handleSubmit}
          className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isUserCreating || !(formik.dirty && formik.isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isUserCreating || !(formik.dirty && formik.isValid) ? 'gray-400' : 'blue-500'}`}
        >
          {isUserCreating ?
            <div className='flex justify-center items-center gap-3'>
              <Spinner color='white' className="h-4 w-4" />
              {id ? "Updating User" : "Creating User"}
            </div>
            : id ? "Update User" : "Create User"}
        </button>
      </form>}
    </div>
  );
};

export default CreateUser;