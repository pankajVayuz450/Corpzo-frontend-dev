  import React, { useEffect, useState } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  import { useDispatch, useSelector } from 'react-redux';
  import { createUser, getUserById, getUserId, updateUser } from '@/redux/admin/actions/UserManagement';
  import TitleComponent from '@/components/common/TitleComponent';
  import { validateNumber, handleExtraSpaces } from '@/Helpers/globalfunctions';
  import { Spinner, Typography } from '@material-tailwind/react';
  import { fetchAllAssignedToData, fetchAllRoles } from '@/redux/admin/actions/roles';
  import { toast } from 'react-toastify';
  import { removeFetchingAssignedTo, removeFetchingRolesError } from '@/redux/admin/slices/rolesSlice';
  import { TailSpin } from 'react-loader-spinner';
  import Select from 'react-select';
  import { fetchAllTeams } from '@/redux/admin/actions/teams';
  import { removeFetchingTeamsError } from '@/redux/admin/slices/teamsSlice';
  import HeaderTitle from '@/components/common/HeaderTitle';
  import { getAllActiveCategories } from '@/redux/admin/actions/MasterSettings/subCategory';
import Breadcrumb from '@/widgets/layout/TopNavigation';
  const initialValues = {
    name: '',
    email: '',
    gender: '',
    phone: '',
    active: false,
    role: "",
    assignedTo: "",
    teamId: [],
    isTemporaryUser: false,
    category: []
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required').min(2, "Name must be atleast 2 characters long").max(35, 'Name cannot exceed 35 characters').matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: Yup.string().email('Invalid email address').matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz)$', 'Invalid email format').required('Email is required'),
    gender: Yup.string().oneOf(['male', 'female', 'other'], 'Gender must be either male or female').required('Gender is required'),
    phone: Yup.string()
      .trim()
      .matches(
        /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
        'Enter a valid 10-digit number starting with 7, 8, or 9'
      ).required('Phone number is required'),
    role: Yup.string().required("Role is required field"),
    assignedTo: Yup.string().required("Assigned to is required field"),
  });

  const CreateUser = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, userId, isUserCreating, isUserFetching, editPage } = useSelector((state) => state.userMgmt);
    const { roles, fetchingRolesError, assignedTo, fetchingAssignedToError, isFetchingAssignedTo } = useSelector((state) => state.role);
    const { teams, fetchingTeamsError } = useSelector((state) => state.team);
    const activeCategories = useSelector((state) => state.subCategory.activeCategories)

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
      !userId && dispatch(getUserId())
    }, [])

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
        let formattedRole = "";
        console.log(values.role, "here is role")
        if (values.role === "SuperAdmin" || values.role === "Super Admin") {
          formattedRole = "super_admin";
        } else if (values.role === "Admin") {
          formattedRole = "admin";
        } else if (values.role === "Manager" || values.role === "Account Manager") {
          formattedRole = "manager";
        } else if (values.role === "Agent") {
          formattedRole = "agent";
        } else {
          formattedRole = "user";
        }
        
        const userData = {
          name: handleExtraSpaces(values.name),
          phone: values.phone,
          email: values.email,
          gender: values.gender,
          active: values.isActive,
          profilePictureUrl: values.profilePictureUrl,
          role: formattedRole,
          ...(formattedRole === "Manager" && { managerCategory: values.category }), // Add managerCategory if role is manager
          assignedTo: values.assignedTo,
          teamId: values.teamId,
          isTemporaryUser: values.isTemporaryUser,
          
        }
        console.log(userData, "creat  e User")
        if (id) {

          dispatch(updateUser({ id: values.userId, userData, editPage, navigate }))
        }
        else {
          console.log(values, "create use")
          console.log(formattedRole, "formattedRole before dispatch");
          dispatch(createUser({
            name: handleExtraSpaces(values.name),
            phone: values.phone,
            email: values.email,
            gender: values.gender,
            active: values.isActive,
            profilePictureUrl: values.profilePictureUrl,
            role: formattedRole,
            ...(formattedRole.toLocaleLowerCase() === "manager" && { managerCategory: values.category }), // Add managerCategory if role is manager
            assignedTo: values.assignedTo,
            teamId: values.teamId,
            isTemporaryUser: values.isTemporaryUser,  
          } ))
            .unwrap()
            .then(() => {
              navigate('/dashboard/admin/usermanagement')
            })
            ;
        }
      },
    });
    console.log(roles)
    useEffect(() => {
      if (formik.values.role) {
        let usersRole
        if (formik.values.role === 'User') {
          usersRole = 'agent';
        } else if (formik.values.role === 'Agent') {
          usersRole = 'manager';
        } else if (formik.values.role === 'Manager' || formik.values.role === 'Account Manager') {
          usersRole = 'admin';
        } else if (formik.values.role === 'Admin') {
          usersRole = 'super_admin';
        } else {
          usersRole = 'agent';
        }
        
        dispatch(fetchAllAssignedToData(usersRole));
      }
      formik.setFieldValue("assignedTo", "");
    }, [formik.values.role])

    useEffect(()=>{
      if(id && user){
        console.log(user, "from useEffect")
        formik.setFieldValue("role",user.role === "super_admin" ? "super_admin" : "" )
        formik.setFieldValue("teamId", user.team)
      }
    }, [])
    useEffect(() => {
      console.log(formik.values.role)
      if (formik.values.role === 'Manager' || 'manager' || 'Account Manager') {
        activeCategories.length === 0 && dispatch(getAllActiveCategories(true)); // Adjust to your fetch categories action
      }
    }, [formik.values.role, dispatch]);

    const formattedTeams = teams?.map(form => ({
      value: form._id,
      label: form.team
    }));

    const breadcrumbData = [
      {
  
        name: 'User Management',
        url: `dashboard/admin/steps/`,
        children: [
          {
            name: id ? 'Update User' : 'Create User',
          },
        ],
      }
    ];
    return (
      <>
        <TitleComponent title={id ? "CORPZO | Update User" : "CORPZO | Create User"} />
        <HeaderTitle title={id ? "Update User" : "Create User"} />
        <Breadcrumb items={breadcrumbData}/>
        <div className="  w-full">

          {isUserFetching ? <div className='flex items-center justify-center h-screen'>
            <TailSpin
            color="blue"
            height={80}
            width={80}
            timeout={3000}
          />
          </div> : (
            <form onSubmit={formik.handleSubmit} className="p-4 rounded-lg shadow-lg w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* User ID and Name */}
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="userId">User ID</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    id="userId"
                    name="userId"
                    type="text"
                    value={userId || ""}
                    disabled
                  />
                </div>
                <div>
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
                  />
                  {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>}
                </div>

                {/* Email and Phone */}
                <div>
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
                  {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder={id ? 'Edit Phone Number' : 'Add Phone Number'}
                    className={`w-full p-2 border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={validateNumber}
                  />
                  {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>}
                </div>

                {/* Gender and Role */}
                <div>
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
                    <option value="other" label="Other" />
                  </select>
                  {formik.touched.gender && formik.errors.gender && <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>}
                </div>
                {/* <div>
                  <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
                  <select
                    className={`w-full p-2 border ${formik.touched.role && formik.errors.role ? 'border-red-500' : 'border-gray-300'} rounded`}
                    id="role"
                    name="role"
                    onChange={()=>console.log(formik.values.role)}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                  >
                    <option value="" label="Select Role" />
                    {
                      roles?.map((role) => (
                        <option value={role?.role} label={role?.role} />
                      ))
                    }
                  </select>
                  {formik.touched.role && formik.errors.role && <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>}
                </div> */}
                <div>
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
                      roles?.map((role) => (
                        <option key={role?.role} value={role?.role} label={role?.role} />
                      ))
                    }
                  </select>
                  {formik.touched.role && formik.errors.role && <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>}
                </div>

                {formik.values.role === ('Manager') && (
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
                    <Select
                      id="category"
                      name="category"
                      isMulti
                      options={activeCategories?.map((cat) => ({ value: cat._id, label: cat.categoryName }))}
                      // onChange={(option) => formik.setFieldValue("category", option.value)}
                      onChange={(options) =>
                        formik.setFieldValue(
                          "category",
                          options ? options.map((option) => option.value) : [] // set array of values
                        )
                      }
                    />
                  </div>
                )}
                {/* AssignedTo and Team */}
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="teamId">  Select Assignee</label>

                  <Select
                    name="assignedTo"
                    id="assignedTo"
                    options={assignedTo}
                    className={`w-full border ${formik.touched.assignedTo && formik.errors.assignedTo ? 'border-red-500' : 'border-gray-300'} rounded`}
                    classNamePrefix="select"
                    value={assignedTo?.find(option => option?.value === formik.values.assignedTo)}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption ? selectedOption?.value : "";
                      formik.setFieldValue("assignedTo", selectedValue);
                    }}
                    isSearchable
                    isLoading={isFetchingAssignedTo}
                    loadingMessage={() => (
                      <div className="flex justify-center items-center py-2">
                        <TailSpin className="h-5 w-5 text-blue-500" />
                      </div>
                    )}
                  />
                  {formik.touched.assignedTo && formik.errors.assignedTo ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.assignedTo}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="teamId">Team</label>
                  <Select
                    className={`w-full border ${formik.touched.teamId && formik.errors.teamId ? 'border-red-500' : 'border-gray-300'} rounded`}
                    id="teamId"
                    name="teamId"
                    onChange={(selectedOptions) => {
                      const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
                      formik.setFieldValue("teamId", selectedIds); // Send the array of team IDs
                    }}
                    onBlur={formik.handleBlur}
                    isMulti
                    options={formattedTeams}
                    // value={formattedTeams?.filter(option => formik.values.teamId.includes(option.value)) || []} // Update to match selected IDs
                    value={formattedTeams?.filter(option => (formik.values.teamId || []).includes(option.value)) || []}
                  />
                  {formik.touched.teamId && formik.errors.teamId && <div className="text-red-500 text-sm mt-1">{formik.errors.teamId}</div>}
                </div>


                {/* Temporary User Checkbox */}
                {(id ? user?.isTemporaryUser : true) && <div className="flex items-center mt-4 col-span-2">
                  <input  
                    type="checkbox"
                    id="isTemporaryUser"
                    name="isTemporaryUser"
                    onChange={() => formik.setFieldValue('isTemporaryUser', !formik.values.isTemporaryUser)}
                    onBlur={formik.handleBlur}
                    checked={formik.values.isTemporaryUser}
                    className="mr-2"
                  />
                  <label htmlFor="isTemporaryUser" className="text-gray-700">Set as temporary user.</label>
                </div>}
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isUserCreating || !(formik.dirty && formik.isValid)}
                className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isUserCreating || !(formik.dirty && formik.isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isUserCreating || !(formik.dirty && formik.isValid) ? 'gray-400' : 'blue-500'}`}
              >
                {isUserCreating ?
                  <div className='flex justify-center items-center gap-3'>
                    <Spinner color='white' className="h-4 w-4" />
                    {id ? "Updating User" : "Adding User"}
                  </div> :
                  id ? "Update User" : "Add User"
                }
              </button>
            </form>
          )
          }
        </div>
      </>
    );
  };

  export default CreateUser;