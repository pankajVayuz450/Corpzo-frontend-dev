import formAPIs from '@/constants/APIList/formAPIs';
import formFields2API from '@/constants/APIList/formFields2API';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for easier maintenance and potential reusability
const BASE_URL = process.env.VITE_BASE_URL;

export const fetchAllForms = createAsyncThunk(
    'forms/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(formAPIs.getAllForms, {
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
  
  export const createForm = createAsyncThunk(
    'forms/create',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(formAPIs.createForm, formData, {
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

  export const createField=createAsyncThunk('fields/create',async (fieldData,{rejectWithValue})=>{
    try{
      const response = await axios.post(formFields2API.createFormField2,fieldData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data);
    }
  }
  );
  
  export const updateForm = createAsyncThunk(
    'forms/update',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${formAPIs.updateFormById}`, formData, {
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
  
  export const deleteForm = createAsyncThunk(
    'forms/delete',
    async (formId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${formAPIs.deleteFormById}?formId=${formId}`, {
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