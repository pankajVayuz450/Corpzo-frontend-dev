import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { removeAddingRoleError, removeUpdatingRoleError } from '@/redux/admin/slices/rolesSlice';
import { removeAddingTeamError, removeUpdatingTeamError } from '@/redux/admin/slices/teamsSlice';
import { createRole, updateRole } from '@/redux/admin/actions/roles';
import { createTeam, updateTeam } from '@/redux/admin/actions/teams';

function AddEditRolesAndTeams({ initialValues, type, subType, validationSchema }) {

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
        toast.error("Error occur in adding role")
    }
    dispatch(removeAddingRoleError());
  }, [addedRole, addingRoleError])

  useEffect(() => {
    if (updatedRole) {
      toast.success("Updated successfully");
      navigate("/dashboard/admin/roles");
    }
    if (updatingRoleError) {
      toast.error("Error occur in updating role");
    }
    dispatch(removeUpdatingRoleError());
  }, [updatedRole, updatingRoleError])

  useEffect(() => {
    if (addedTeam) {
      toast.success("Added successfully");
      navigate("/dashboard/admin/teams");
    }
    if (addingTeamError) {
        toast.error("Error occur in adding team");
    }
    dispatch(removeAddingTeamError());
  }, [addedTeam, addingTeamError])

  useEffect(() => {
    if (updatedTeam) {
      toast.success("Updated successfully");
      navigate("/dashboard/admin/teams");
    }
    if (updatingTeamError) {
      toast.error("Error occur in updating team");
    }
    dispatch(removeUpdatingTeamError());
  }, [updatedTeam, updatingTeamError])

  // Formik Setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (type === "role") {
        if (subType === "add") {
            dispatch(createRole(values));
          } else if (subType === "edit") {
            dispatch(updateRole(values));
          }
        } else {
          if (subType === "add") {
              dispatch(createTeam(values));
            } else if (subType === "edit") {
              dispatch(updateTeam(values));
            }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 p-4 bg-gray-100 rounded-md shadow-md">
      {/* Element Name Field */}
      <div className="w-full">
        <label htmlFor={type} className="block text-sm font-medium text-gray-700">
          {type}
        </label>
        <input
            id={type}
            name={type}
            value={formik.values[type]}
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
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        disabled={isAddingRole || isAddingTeam || isUpdatingRole || isUpdatingTeam}
      >
        {
          (isAddingRole || isAddingTeam || isUpdatingRole || isUpdatingTeam) ? <div className='flex items-center justify-center'>
            <div className='loader'></div>
          </div> : "Submit"
        }
      </button>
    </form>
  );
}

export default AddEditRolesAndTeams;
