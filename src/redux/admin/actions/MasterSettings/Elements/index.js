import formInputFields from '@/constants/APIList/formInputFields';
import listAll from '@/constants/APIList/listAll';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.VITE_BASE_URL;

export const fetchAllElements = createAsyncThunk(
    'data/fetchAllElements',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(formInputFields.getAllInputs, {
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

  export const createFormElement = createAsyncThunk(
    'data/createData',
    async ({ data }, { rejectWithValue }) => {
      try {
        const response = await axios.post(formInputFields.createFormInput, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        toast.success(`New element created`)
        return { data: response.data.data };
      } catch (error) {
        console.log("error",error);
        
        toast.success(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
      }
    }
  );
  
    export const updateFormElement = createAsyncThunk(
      'data/updateData',
      async ({  data }, { rejectWithValue }) => {
        try {
          const response = await axios.put(formInputFields.createFormInput, data, {
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
  
    export const deleteFormElement = createAsyncThunk(
      'data/deleteData',
      async ({  data }, { rejectWithValue }) => {
        try {
          const response = await axios.delete(formInputFields.createFormInput, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            data,
          });
          return response.data.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }
    );