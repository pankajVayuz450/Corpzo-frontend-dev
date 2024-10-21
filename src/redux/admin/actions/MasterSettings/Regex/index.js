import regExAPIs from '@/constants/APIList/regExAPIs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.VITE_BASE_URL;

export const fetchAllRegex = createAsyncThunk(
  'data/fetchAllRegex',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching regex...");
      const response = await axios.get(regExAPIs.getAllRegEx, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(response);
      return response.data?.data?.response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : 'Something went wrong');
    }
  }
);


export const createRegex = createAsyncThunk(
  'data/createRegex',
  async (data, { rejectWithValue }) => {
    try {
      console.log("create regex thunk: response.data?", data);
      const response = await axios.post(regExAPIs.createRegEx, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Show success toast notification
      toast.success("A RegEx created successfully");
      
      // Return the response data
      return { data: response.data?.data };

    } catch (error) {
      console.log("error", error.message);
      
      // Show error toast notification
      toast.error(error.message);

      // Properly return the error using rejectWithValue so it is caught in the rejected state
      return rejectWithValue(error.response?.data || error.message);
      }
    }
  );


    export const updateRegex = createAsyncThunk(
      'data/updateRegex',
      async ( data , { rejectWithValue }) => {
        // console.log("updateRegex thunk",data);
        
        try {
          const response = await axios.put(regExAPIs.updateRegExById, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          toast.success("RegEx updated successfully")
          return { data: response.data.data };
        } catch (error) {
          toast.error(error.message)
          return rejectWithValue(error.response.data);
        }
      }
    );


    export const deleteRegex = createAsyncThunk(
      'data/deleteRegex',
      async (id, { rejectWithValue }) => {
        try {
          const response = await axios.delete(`${regExAPIs.deleteRegExById}?id=${id}`, {
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

    export const fetchRegexById = createAsyncThunk(
      'data/fetchRegexById',
      async ({ id }, { rejectWithValue }) => {
        console.log("fetchRegexById",id);
        
        try {
          const response = await axios.get(`${regExAPIs.getRegExById}?id=${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          console.log("fetchregExById",response.data.data);
          
          return  response.data.data
        } catch (error) {
          console.log(error);
          
          return rejectWithValue(error.response.data);
        }
      }
    );


