import formAttributesNew from '@/constants/APIList/formAttributesNew';
import listAll from '@/constants/APIList/listAll';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL= process.env.VITE_BASE_URL;

export const fetchAllAttributes = createAsyncThunk(
  'data/fetchAllAttributesData',
  async (elementId, { rejectWithValue }) => {
    try {
      const response = await axios.get(formAttributesNew.getAllFormAttributes, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params:{elementId:elementId}
      });
      return { attributes: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const createAttribute = createAsyncThunk(
    'data/createAttributeData',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.post(formAttributesNew.createFormAttribute, data, {
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

  export const updateAttribute = createAsyncThunk(
    'data/updateAttributeData',
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


  export const deleteAttribute = createAsyncThunk(
    'data/deleteAttributeData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(url, {
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


