import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.BACKEND_BASE_URL;

export const addBanner = createAsyncThunk(
    'addBanner',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${BASE_URL}/admin/banner`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data", // Optional, ensures correct handling
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const getBanners = createAsyncThunk(
    'getBanners',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/banner`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          },
        });
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );