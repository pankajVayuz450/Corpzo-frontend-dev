import roleAPIs from '@/constants/APIList/roleAPIs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateStatusLoading, updateStatusState } from '../slices/rolesSlice';

export const fetchAllRoles = createAsyncThunk(
    'fetchAllRoles',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${roleAPIs.getAllRoles}?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data?.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const fetchRoleById = createAsyncThunk(
    'fetchRoleById',
    async (roleId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${roleAPIs.getRoleById}/${roleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const createRole = createAsyncThunk(
    'createRole',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(roleAPIs.createRole, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateRole = createAsyncThunk(
    'updateRole',
    async ({ roleId, role }, { rejectWithValue }) => {
      console.log(role, 'from action')
      try {
        const response = await axios.put(`${roleAPIs.updateRoleById}/${roleId}`, {role}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateStatus = ({_id, active})=>{
    return async (dispatch) => {
      try {
          dispatch(updateStatusLoading(true))
          const response = await axios.put(`${roleAPIs.updateRoleById}/${_id}`, {active}, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`
              }
          });
          if (response.status == 200) {
             
              dispatch(updateStatusState({_id, active}))
              // dispatch(updateStatusLoading(false))
             toast.success("Status updated from toggle")
          }
      } catch (error) {
          console.log(error, "error")
          // toast.error(error.response.data.message)
          dispatch(updateStatusLoading(false))
  
      }
  }
  }

  export const deleteRole = createAsyncThunk(
    'deleteRole',
    async (roleId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${roleAPIs.deleteRoleById}/${roleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchAllAssignedToData = createAsyncThunk(
    'fetchAllAssignedToData',
    async (role, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${roleAPIs.fetchAssignedToData}?role=${role}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );