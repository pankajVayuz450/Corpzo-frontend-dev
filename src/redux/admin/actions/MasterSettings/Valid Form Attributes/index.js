import validFormAttributes from '@/constants/APIList/validFormAttributes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.VITE_BASE_URL;

export const fetchValidFormAttributes = createAsyncThunk(
  'data/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      console.log("params",params);
      
      const response = await axios.get(validFormAttributes.getValidFormAttributes, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params:params
      });
      // console.log("data/fetchData",response);
      
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createValidFormElementAttributes = createAsyncThunk(
    'create/validFormElementAttributes',async(data,{rejectWithValue})=>{
  try{
    const response = await axios.post(validFormAttributes.createValidFormAttribute,data,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('authToken')}` 
      }
    })
    toast.success("A Valid atrribute created")
    return response.data
  }
  catch(err){
    return rejectWithValue(err.response.data)
  }
    
      } 
  )
  
  export const updateValidFormElementAttributes = createAsyncThunk(
    'update/validFormElementAttributes',async({url,data},{rejectWithValue})=>{
  try{
    const response = await axios.put(url,data,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('authToken')}` 
      }
    })
    return response.data.data
  }
  catch(err){
    rejectWithValue(err.response.data)
  }
    }
  )
  
  export const deleteValidFormElementTypes = createAsyncThunk( 
    'delete/validFormElementTypes',async({url,data},{rejectWithValue})=>{
  try{
    console.log(localStorage.getItem('authToken'))
    const response = await axios.delete(url,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('authToken')}` 
      },
      data :data
    })
    return response.data.data
  }
  catch(err){
    rejectWithValue(err.response.data)
  }
    }
  )
  
  export const deleteValidFormElementAttributes= createAsyncThunk(
    'delete/validFormElementAttributes',async({url,data},{rejectWithValue})=>{
  try{
    const response = await axios.delete(url,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('authToken')}` 
      },
      data :data
    })
    return response.data.data
  
  }
  catch(err){
    rejectWithValue(err.response.data)
  }
    }
  )
  
    
