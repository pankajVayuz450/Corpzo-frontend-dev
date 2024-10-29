import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { removeAddingRoleError, removeUpdatingRoleError } from '@/redux/admin/slices/rolesSlice';
import { removeAddingTeamError, removeUpdatingTeamError } from '@/redux/admin/slices/teamsSlice';
import { createRole, updateRole } from '@/redux/admin/actions/roles';
import { createTeam, updateTeam } from '@/redux/admin/actions/teams';
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import { Spinner } from '@material-tailwind/react';

function AddEditRolesAndTeams({ initialValues, type, subType }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addedTeam,
    isAddingTeam,
    addingTeamError,
    updatedTeam,
    isUpdatingTeam,
    updatingTeamError } = useSelector(state => state.team);

  const { addedRole,
    isAddingRole,
    addingRoleError,
    updatedRole,
    isUpdatingRole,
    updatingRoleError } = useSelector(state => state.role);

  useEffect(() => {
    if (addedRole) {
      toast.success("Added successfully");
      navigate("/dashboard/admin/roles");
    }
    if (addingRoleError) {
        toast.error(addingRoleError)
    }
    dispatch(removeAddingRoleError());
  }, [addedRole, addingRoleError])

  useEffect(() => {
    if (updatedRole) {
      toast.success("Updated successfully");
      navigate("/dashboard/admin/roles");
    }
    if (updatingRoleError) {
      toast.error(updatingRoleError);
    }
    dispatch(removeUpdatingRoleError());
  }, [updatedRole, updatingRoleError])

  useEffect(() => {
    if (addedTeam) {
      toast.success("Added successfully");
      navigate("/dashboard/admin/teams");
    }
    if (addingTeamError) {
        toast.error(addingTeamError);
    }
    dispatch(removeAddingTeamError());
  }, [addedTeam, addingTeamError])

  useEffect(() => {
    if (updatedTeam) {
      toast.success("Updated successfully");
      navigate("/dashboard/admin/teams");
    }
    if (updatingTeamError) {
      toast.error(updatingTeamError);
    }
    dispatch(removeUpdatingTeamError());
  }, [updatedTeam, updatingTeamError])

  // Formik Setup
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      [type]: Yup.string()
      .required(`${type} is required.`)
      .matches(/^[A-Za-z\s]+$/, `${type} can only contain letters and spaces`)
      .max(35, `${type} must be at most 35 characters long`),
    }),
    onSubmit: (values) => {
      if (type === "role") {
        if (subType === "add") {
            dispatch(createRole({role: handleExtraSpaces(values.role)}));
          } else if (subType === "edit") {
            dispatch(updateRole({role: handleExtraSpaces(values.role)}));
          }
        } else {
          if (subType === "add") {
              dispatch(createTeam({team: handleExtraSpaces(values.team)}));
            } else if (subType === "edit") {
              dispatch(updateTeam({team: handleExtraSpaces(values.team)}));
            }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 p-4 bg-gray-100 rounded-md shadow-md">
      {/* Element Name Field */}
      <div className="w-full">
        <label htmlFor={type} className="block font-medium text-gray-700">
          {type === "role" ? "Role" : "Team"}
        </label>
        <input
            id={type}
            name={type}
            value={formik.values[type]}
            maxLength={35}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        {formik.touched[type] && formik.errors[type] ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors[type]}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAddingRole || isAddingTeam || isUpdatingRole || isUpdatingTeam || !(formik.dirty && formik.isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAddingRole || isAddingTeam || isUpdatingRole || isUpdatingTeam || !(formik.dirty && formik.isValid) ? 'gray-400' : 'blue-500'}`}
        disabled={isAddingRole || isAddingTeam || isUpdatingRole || isUpdatingTeam || !(formik.dirty && formik.isValid)}
      >
        {
          type === "role" ? <>
            {(isAddingRole || isAddingTeam || isUpdatingRole || isUpdatingTeam) ?
            <div className='flex justify-center items-center gap-3'>
              <Spinner color='white' className="h-4 w-4" />
              {subType === "edit Role" ? "Updating" : "Adding Role"}
            </div>
            : subType === "edit Role" ? "Update" : "Add Role"}
          </> : <>
          {(isAddingRole || isAddingTeam || isUpdatingRole || isUpdatingTeam) ?
            <div className='flex justify-center items-center gap-3'>
              <Spinner color='white' className="h-4 w-4" />
              {subType === "edit Team" ? "Updating" : "Adding Team"}
            </div>
            : subType === "edit Team" ? "Update" : "Add Team"}
          </>
        }
      </button>
    </form>
  );
}

export default AddEditRolesAndTeams;
