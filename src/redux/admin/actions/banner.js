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
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/banner?page=${page}&limit=${limit}`, {
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

export const getSingleBanner = createAsyncThunk(
    'getSingleBanner',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/banner/${id}`, {
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

export const updateBanner = createAsyncThunk(
    'updateBanner',
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${BASE_URL}/admin/banner/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );