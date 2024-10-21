import validFormElements from '@/constants/APIList/validFormElements';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.VITE_BASE_URL;
export const fetchValidFormElements = createAsyncThunk(
  'data/fetchValidFormElements',
  async (params, { rejectWithValue }) => {
    console.log("Thunk: params",params);
    
    try {
      const response = await axios.get(validFormElements.getAllValidFormElements, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params:params
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateValidFormElement = createAsyncThunk(
    'data/updateValidFormElement',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.put(url, data, {
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
  
  export const deleteValidFormElement = createAsyncThunk(
    'delete/validFormElement', async ({id}, {rejectWithValue}) => {
      console.log("delete/validFormElement");
      
      try {
        const response = await axios.delete(`${validFormElements.deleteValidFormElementById}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data,
        });      
    }
    catch(err){
      rejectWithValue(err.response.data)
    }
    }
  );
  
  export const createValidFormElement = createAsyncThunk(
    'create/validFormElement',async({element},{rejectWithValue})=>{
      console.log("create/validFormElementelement",element);
      
      try {
        const response = await axios.post(validFormElements.createValidFormElement, { element: element }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
  
        return response.data.data; // This will be the fulfilled action payload
      } catch (err) {
        return rejectWithValue(err.response.data); // Return the rejected value
      }
    }
  )