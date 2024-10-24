import roleAPIs from '@/constants/APIList/roleAPIs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    async ({ roleId, formData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${roleAPIs.updateRoleById}/${roleId}`, formData, {
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