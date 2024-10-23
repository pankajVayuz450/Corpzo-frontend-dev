import subInputFields from '@/constants/APIList/subInputFIelds';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchAllSubInputs = createAsyncThunk(
    'data/fetchAllSubInputs',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${subInputFields.getFormSubInputs}`, {
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

export const fetchSubInput = createAsyncThunk(
    'data/fetchSubInput',
    async (inputId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${subInputFields.getFormSubInputs}?inputId=${inputId}`, {
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

  export const createSubInput = createAsyncThunk(
    'data/createSubInput',
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.post(subInputFields.createFormSubInput, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return { data: response.data.data };
      } catch (error) {
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
      }
    }
  );
  
    export const updateSubInput = createAsyncThunk(
      'data/updateSubInput',
      async (data, { rejectWithValue }) => {
        try {
          const response = await axios.put(subInputFields.updateFormSubInput, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
         
          return { data: response.data.data };
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }
    );
  
    export const deleteSubInput = createAsyncThunk(
      'data/deleteSubInput',
      async (body, { rejectWithValue }) => {
        console.log(body, "aaa");
        try {
          const response = await axios.delete(subInputFields.deleteFormSubInput, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            data: body,
          });
          return response.data.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }
    );